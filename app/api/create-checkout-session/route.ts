import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { cart } = await request.json();

    const lineItems = cart.map((item: any) => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name,
          // Prepend the base URL so Stripe receives a full, valid URL
          images: item.image ? [`${process.env.NEXT_PUBLIC_SITE_URL}${item.image}`] : [],
        },
        unit_amount: item.price,
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      // Professional address collection:
      shipping_address_collection: {
        allowed_countries: ['GB'], // Restricts address to UK only
      },
      billing_address_collection: 'required',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      metadata: {
        order_type: 'b2b_wholesale',
      },
    });

    return NextResponse.json({ 
      url: session.url 
    });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}