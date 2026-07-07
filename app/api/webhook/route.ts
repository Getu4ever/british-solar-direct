import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { sendOrderEmails } from '../../lib/email-service';
import { prisma } from '../../lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  const alreadyProcessed = await prisma.processedWebhook.findUnique({
    where: { eventId: event.id },
  });

  if (alreadyProcessed) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ received: true, skipped: 'unpaid' });
    }

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      });

      await sendOrderEmails({
        email: session.customer_details?.email ?? '',
        name: session.customer_details?.name ?? 'Valued Customer',
        items: lineItems.data,
        totalPence: session.amount_total ?? 0,
      });

      await prisma.processedWebhook.create({ data: { eventId: event.id } });
    } catch (error) {
      console.error('Error processing order fulfillment:', error);
      return NextResponse.json({ error: 'Fulfillment failed' }, { status: 500 });
    }
  } else {
    await prisma.processedWebhook.create({ data: { eventId: event.id } });
  }

  return NextResponse.json({ received: true });
}
