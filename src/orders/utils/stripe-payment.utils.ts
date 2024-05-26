import Stripe from 'stripe';
import { stripe } from '@/config';

interface CreatePaymentIntents {
  amount: number;
  confirmationTokenId: string;
}

interface Refound {
  amount: number;
  paymentIntentId: string;
}

/* 
The amount must be multiplied by * 100 because stripe handles USD cents.
For example for 10 dollars:  $10 = 10 * 100 = 1000
*/
const centsDollars = 100;

export class StripePayment {
  static async createPaymentIntents({
    amount,
    confirmationTokenId,
  }: CreatePaymentIntents): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return stripe.paymentIntents.create({
      confirm: true,
      amount: amount * centsDollars,
      currency: 'usd',
      description: 'Compra de productos del E-commerce',
      automatic_payment_methods: { enabled: true },
      use_stripe_sdk: true,
      confirmation_token: confirmationTokenId,
    });
  }

  static async refund({ paymentIntentId, amount }: Refound) {
    return await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount * centsDollars,
    });
  }
}
