# 🚀 Quick Stripe Integration Reference

## 1️⃣ Install Stripe (2 minutes)
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

## 2️⃣ Setup Stripe Provider (5 minutes)

### Create `src/stripe-config.ts`:
```typescript
export const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_KEY_HERE';
```

### Update `src/main.tsx`:
```typescript
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { STRIPE_PUBLISHABLE_KEY } from './stripe-config';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
);
```

## 3️⃣ Update PaymentForm Component (10 minutes)

### Add imports at top of `src/components/PaymentForm.tsx`:
```typescript
import { useStripe, useElements } from '@stripe/react-stripe-js';
```

### Inside component, add hooks:
```typescript
const stripe = useStripe();
const elements = useElements();
```

### Replace `handleSubmit` function with:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!stripe) {
    alert('Stripe is not loaded yet');
    return;
  }

  try {
    // Create payment method with bank account
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'us_bank_account',
      us_bank_account: {
        account_holder_type: 'individual',
        routing_number: formData.routingNumber,
        account_number: formData.accountNumber,
      },
      billing_details: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: 'customer@example.com', // Add email field
        address: {
          line1: formData.addressLine1,
          line2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          postal_code: formData.zipCode,
          country: 'US',
        },
      },
    });

    if (error) {
      alert('Error: ' + error.message);
      return;
    }

    // Send to your server
    const response = await fetch('/api/create-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        formData: formData,
      }),
    });

    const result = await response.json();
    alert(result.success ? 'Success!' : 'Failed: ' + result.error);
    
  } catch (error) {
    console.error('Payment error:', error);
    alert('Payment failed');
  }
};
```

## 4️⃣ Create Backend (Node.js Example - 15 minutes)

```javascript
const express = require('express');
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY');
const app = express();

app.use(express.json());

app.post('/api/create-payment', async (req, res) => {
  try {
    const { paymentMethodId, formData } = req.body;

    // Create customer
    const customer = await stripe.customers.create({
      payment_method: paymentMethodId,
      name: `${formData.firstName} ${formData.lastName}`,
    });

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // $10.00 in cents
      currency: 'usd',
      customer: customer.id,
      payment_method: paymentMethodId,
      confirm: true,
    });

    res.json({ success: true, paymentIntent });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.listen(3000);
```

## 5️⃣ Test with Stripe Test Data

### Test Routing Number:
```
110000000
```

### Test Account Number:
```
000123456789
```

---

## 🔗 Quick Links

- **Get Stripe Keys**: https://dashboard.stripe.com/test/apikeys
- **ACH Payments Docs**: https://stripe.com/docs/payments/ach-debit
- **Test Numbers**: https://stripe.com/docs/testing

---

## 🆘 Common Issues

### Issue: "Stripe is not defined"
**Fix**: Check that Elements wrapper is in main.tsx

### Issue: "Invalid routing number"
**Fix**: Use test routing number `110000000` in test mode

### Issue: "CORS error"
**Fix**: Add CORS middleware to backend:
```javascript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
```

---

## ✅ Integration Checklist

- [ ] Install Stripe packages
- [ ] Add publishable key
- [ ] Wrap app with Elements
- [ ] Add Stripe hooks to form
- [ ] Update handleSubmit
- [ ] Create backend endpoint
- [ ] Test with test data
- [ ] Handle errors properly
- [ ] Add loading states
- [ ] Test with real account

---

**Total Time**: ~30 minutes for basic integration

**See `STRIPE_INTEGRATION_GUIDE.md` for complete details!**
