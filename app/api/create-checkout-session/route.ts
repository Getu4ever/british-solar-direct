import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { productBySlug, calcVat } from '../../lib/products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

type CartPayloadItem = {
  slug: string;
  quantity?: number;
};

export async function POST(request: Request) {
  try {
    const { cart } = (await request.json()) as { cart: CartPayloadItem[] };

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    let subtotalPence = 0;

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cart.map((item) => {
      const product = productBySlug[item.slug];
      if (!product) {
        throw new Error(`Unknown product: ${item.slug}`);
      }

      const quantity = Math.max(1, Math.min(999, Math.floor(item.quantity ?? 1)));
      subtotalPence += product.priceInPence * quantity;

      return {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: product.name,
            images: product.image ? [`${SITE_URL}${product.image}`] : [],
          },
          unit_amount: product.priceInPence,
        },
        quantity,
      };
    });

    const vatPence = calcVat(subtotalPence);

    if (vatPence > 0) {
      lineItems.push({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'VAT (20%)',
          },
          unit_amount: vatPence,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['GB'],
      },
      billing_address_collection: 'required',
      success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/cart`,
      metadata: {
        order_type: 'b2b_wholesale',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
