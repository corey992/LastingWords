import Stripe from 'stripe'

let _stripe: Stripe | null = null

export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    if (!_stripe) {
      _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2026-06-24.dahlia',
      })
    }
    return (_stripe as unknown as Record<string | symbol, unknown>)[prop]
  },
})
