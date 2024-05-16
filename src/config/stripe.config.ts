import Stripe from 'stripe';
import { EnvConfig } from '@/config';

export const stripe = new Stripe(EnvConfig.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
  typescript: true,
});
