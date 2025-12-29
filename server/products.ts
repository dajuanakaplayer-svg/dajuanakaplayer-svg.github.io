/**
 * Elite SMP Server Access Products
 * 
 * Define Stripe products and prices here for centralized management.
 * Create these products in your Stripe Dashboard first, then add the IDs here.
 */

export const PRODUCTS = {
  SERVER_ACCESS: {
    name: "Elite SMP Server Access",
    description: "One-time payment for permanent whitelist access to the Elite SMP server",
    // You'll need to create this product in Stripe Dashboard and add the price ID here
    // For now, we'll use a placeholder that you'll replace with your actual Stripe Price ID
    priceId: process.env.STRIPE_PRICE_ID_SERVER_ACCESS || "price_placeholder",
    amount: 1500, // $15.00 in cents
    currency: "usd",
  },
} as const;

export const getServerAccessPrice = () => {
  return PRODUCTS.SERVER_ACCESS.priceId;
};
