import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { sendOrderEmails } from '../../lib/email-service';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  console.log("🚀 Webhook received!");

  const body = await request.text();
  const signature = (await headers()).get('stripe-signature');

  if (!signature) {
    console.error("❌ Missing stripe-signature");
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log(`✅ Session completed for: ${session.customer_details?.email}`);

    try {
      // Expanded line items to include product details for images
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product']
      });
      
      await sendOrderEmails({
        email: session.customer_details?.email || '',
        name: session.customer_details?.name || 'Valued Customer',
        items: lineItems.data,
        total: session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00'
      });

      console.log(`🎉 Order confirmation email successfully processed for: ${session.customer_details?.email}`);
    } catch (error) {
      console.error('❌ Error processing order fulfillment:', error);
      return NextResponse.json({ error: 'Fulfillment failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}