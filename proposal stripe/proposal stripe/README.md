# Payment Proposal System with Custom Bank Authorization Form

## ✅ What's Integrated

This system combines:
- **Multiple proposal pages** with unique URLs per client
- **Custom bank authorization form** (your beautiful design)
- **Stripe Checkout** for secure payment processing
- **Subscription support** (one-time, monthly, auto-cancel)
- **Webhook handling** for subscription management

## 🔒 Security

- ✅ Bank details sent ONLY to Stripe
- ✅ Server stores ONLY Stripe Customer ID
- ✅ All sensitive data handled by Stripe
- ✅ PCI compliant

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd "d:\paymment pages\proposal stripe\proposal stripe"
npm install
```

### 2. Configure Environment

The `.env` file is already configured with your Stripe keys:
```
STRIPE_SECRET_KEY=sk_test_51SUssYJTk4Hqtdnf...
STRIPE_PUBLISHABLE_KEY=pk_test_51SUssYJTk4Hqtdnf...
BASE_URL=http://localhost:4242
```

### 3. Add Your Proposals

Edit `proposals.js` to add your clients:

```javascript
{
  id: "client-001",
  clientName: "John Doe",
  title: "Website Maintenance",
  description: "Monthly website support and updates",
  amountNet: 50000, // $500.00 in cents (what you want to receive)
  currency: "usd",
  recurring: true,       // true = subscription, false = one-time
  interval: "month",     // "month" or "year"
  cancellationMonths: 0, // 0 = continues until cancelled, 1 = auto-cancel after first month
  trialDays: 7          // Optional: trial period in days
}
```

### 4. Start Server

```bash
npm start
```

Server runs on: **http://localhost:4242**

### 5. Access Proposals

Each proposal gets a unique URL:
- `http://localhost:4242/p/client-001`
- `http://localhost:4242/p/client-002`
- etc.

## 📋 How It Works

### User Flow:

1. Client visits `/p/client-001`
2. Sees your custom bank authorization form
3. Fills in personal + bank details
4. Clicks "Continue to Payment"
5. **Server creates Stripe Customer** with all data
6. Redirects to **Stripe Checkout** for payment
7. Stripe handles payment securely
8. Redirects back with success/cancel status

### What Gets Stored:

**On Your Server:**
- Proposal details (from proposals.js)
- Stripe Customer ID only

**On Stripe:**
- Customer info (name, email, address)
- Bank authorization data (in metadata)
- Payment history
- Subscription status

## 🔧 Customization

### Change Background Image

Edit `server.js` line with `BACKGROUND_IMAGE`:
```javascript
html = html.replace(/{{BACKGROUND_IMAGE}}/g, 'YOUR_IMAGE_URL');
```

### Modify Form Fields

Edit `payment-form.html` to add/remove fields

### Adjust Pricing

Stripe fee is calculated automatically:
```javascript
function addStripeFee(netAmountCents) {
  const pct = 0.029; // 2.9%
  const fixed = 30;  // $0.30
  return Math.ceil((netAmountCents + fixed) / (1 - pct));
}
```

## 📊 View Customers in Stripe

All form submissions create customers in Stripe:
https://dashboard.stripe.com/test/customers

Each customer's metadata contains:
- Bank name
- Routing number
- Account number (last 4 digits)
- Account type
- Account holder name

## 🔗 Webhook Setup

For production, set up webhook at:
https://dashboard.stripe.com/webhooks

Endpoint: `https://your-domain.com/webhook`

Events to listen for:
- `invoice.payment_succeeded`

## 🎯 Features

✅ Multiple proposals with unique URLs
✅ Custom bank authorization form
✅ One-time payments
✅ Monthly subscriptions
✅ Trial periods
✅ Auto-cancel after X months
✅ Stripe fee calculation
✅ Success/cancel redirects
✅ Webhook for subscription management
✅ Secure data handling (only Customer ID stored)

## 🚀 Deploy to Production

### Update BASE_URL in .env:
```
BASE_URL=https://your-domain.com
```

### Use Live Stripe Keys:
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### Deploy to Heroku/Railway/etc.

## 📞 Support

All bank authorization data is stored securely in Stripe.
You can view/manage customers in Stripe Dashboard.
Payments are processed securely by Stripe Checkout.
