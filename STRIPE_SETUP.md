# Stripe Payment Integration Setup

## Step 1: Get Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Create a new account or sign in
3. Copy your API keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)

## Step 2: Create Environment File

Create a `.env.local` file in your project root with:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

## Step 3: Test the Integration

1. Start your development server: `npm run dev`
2. Add items to cart
3. Go to checkout
4. Use Stripe test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **Any future date** for expiry
   - **Any 3-digit CVC**

## Step 4: Production Setup

When ready for production:

1. Switch to live keys in Stripe Dashboard
2. Update environment variables with live keys
3. Set up webhooks for order processing
4. Configure email notifications

## Security Notes

- ✅ Never commit `.env.local` to version control
- ✅ Keep secret keys private (server-side only)
- ✅ Use test keys for development
- ✅ Enable webhook signatures in production

## Test Card Numbers

| Card Number | Description |
|-------------|-------------|
| 4242 4242 4242 4242 | Visa (success) |
| 4000 0000 0000 0002 | Visa (declined) |
| 4000 0025 0000 3155 | Visa (requires authentication) |
| 5555 5555 5555 4444 | Mastercard (success) |
| 2223 0031 2200 3222 | Mastercard (success) |

## Support

For Stripe support: https://support.stripe.com/
For Honeyfy integration help: support@honeyfy.com
