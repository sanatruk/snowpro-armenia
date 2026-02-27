import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-02-25.clover",
      typescript: true,
    });
  }
  return _stripe;
}

// Platform fee: 10% of total
export function calculatePlatformFee(totalAmount: number): number {
  return Math.round(totalAmount * 0.1);
}

// Deposit: 20% of total
export function calculateDeposit(totalAmount: number): number {
  return Math.round(totalAmount * 0.2);
}
