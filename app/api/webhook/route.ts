import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { sendOrderEmails } from '../../lib/email-service';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const sig = (await headers()).get('stripe-signature');   // ← Fixed: added await

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      // 1. Fetch line items
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      
      // 2. Prepare data
      const customerEmail = session.customer_details?.email || '';
      const customerName = session.customer_details?.name || 'Valued Customer';
      const orderTotal = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00';

      // 3. Trigger email service
      await sendOrderEmails({
        email: customerEmail,
        name: customerName,
        items: lineItems.data,
        total: orderTotal,      
        orderId: session.id
      });

      console.log(`Order confirmation emails sent for: ${customerEmail}`);

    } catch (error) {
      console.error('Error processing order fulfillment:', error);
      // Return 500 to trigger a webhook retry from Stripe
      return NextResponse.json({ error: 'Fulfillment failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}