# Payment Page with Stripe Integration Guide

This is a React + Vite payment authorization form with three background variants, ready for Stripe integration.

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Visit `http://localhost:5173` to see the payment form.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
paymment-pages/
├── public/
│   ├── 6f3a8889-5145-4463-be39-561234b4be77.jpg  (Background 1)
│   ├── 789748b4-d8ee-4dba-90d2-1439665bee7c.jpg  (Background 2)
│   └── wmremove-transformed (2).jpeg             (Background 3)
├── src/
│   ├── components/
│   │   ├── PaymentForm.tsx      (Main form component)
│   │   └── PaymentForm.css      (Form styling)
│   ├── App.tsx                  (Default - Variant 1)
│   ├── AppVariant1.tsx          (Background variant 1)
│   ├── AppVariant2.tsx          (Background variant 2)
│   ├── AppVariant3.tsx          (Background variant 3)
│   └── main.tsx
└── package.json
```

---

## 🎨 Using Different Background Variants

The project includes **3 different background variants**. To switch between them:

### Method 1: Change the variant prop in App.tsx
```tsx
// In src/App.tsx
<PaymentForm variant={1} />  // Background 1
<PaymentForm variant={2} />  // Background 2
<PaymentForm variant={3} />  // Background 3
```

### Method 2: Import different App variants
```tsx
// In src/main.tsx, replace:
import App from './App.tsx'

// With one of these:
import App from './AppVariant1.tsx'  // Background 1
import App from './AppVariant2.tsx'  // Background 2
import App from './AppVariant3.tsx'  // Background 3
```

---

## 💳 Stripe Integration Guide

### Step 1: Install Stripe Dependencies
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### Step 2: Set Up Stripe Provider

Create a new file `src/stripe-config.ts`:
```typescript
export const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_PUBLISHABLE_KEY_HERE';
```

Update `src/main.tsx`:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import App from './App.tsx';
import { STRIPE_PUBLISHABLE_KEY } from './stripe-config';
import './index.css';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
);
```

### Step 3: Integrate Stripe Elements in PaymentForm

In `src/components/PaymentForm.tsx`, add these imports at the top:
```tsx
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
```

Inside the `PaymentForm` component, add:
```tsx
const stripe = useStripe();
const elements = useElements();
```

### Step 4: Update Form Submission Handler

Replace the `handleSubmit` function with:
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!stripe || !elements) {
    return;
  }

  try {
    // Create payment method with bank account details
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'us_bank_account',
      us_bank_account: {
        account_holder_type: 'individual',
        routing_number: formData.routingNumber,
        account_number: formData.accountNumber,
      },
      billing_details: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: 'customer@example.com', // Add email field to form
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
      console.error('Error:', error);
      alert('Payment failed: ' + error.message);
      return;
    }

    // Send payment method to your server
    const response = await fetch('YOUR_SERVER_ENDPOINT/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        formData: formData,
      }),
    });

    const result = await response.json();
    
    if (result.success) {
      alert('Payment information submitted successfully!');
    } else {
      alert('Payment failed: ' + result.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during payment processing');
  }
};
```

### Step 5: Create Backend Endpoint

You'll need a server endpoint to handle the payment. Example using Node.js/Express:

```javascript
// server.js
const express = require('express');
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY');
const app = express();

app.use(express.json());

app.post('/create-payment', async (req, res) => {
  try {
    const { paymentMethodId, formData } = req.body;

    // Create a customer
    const customer = await stripe.customers.create({
      payment_method: paymentMethodId,
      name: `${formData.firstName} ${formData.lastName}`,
      email: 'customer@example.com',
    });

    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });

    // Create payment intent or setup intent based on your needs
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // Amount in cents
      currency: 'usd',
      customer: customer.id,
      payment_method: paymentMethodId,
      confirm: true,
    });

    res.json({ success: true, paymentIntent });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## 🔐 Stripe ACH/Bank Account Payment Tips

### Important Notes:
1. **Verification Required**: Bank account payments require micro-deposit verification or instant verification
2. **Test Mode**: Use test routing number `110000000` and any valid account number in test mode
3. **Production**: In production, you'll need to verify bank accounts before charging

### Stripe Test Bank Account Numbers:
- **Routing Number**: `110000000` (Test routing number)
- **Account Number**: Any 9-17 digit number (e.g., `000123456789`)

### Alternative: Add Card Payment Option

If you want to add credit card payment as well, add this to the form:

```tsx
import { CardElement } from '@stripe/react-stripe-js';

// Inside the form, add:
<div className="form-section">
  <label className="field-label">
    Card Information <span className="required">*</span>
  </label>
  <CardElement 
    options={{
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }}
  />
</div>
```

---

## 📝 Form Fields

The form includes:
- **Name**: First and Last name
- **Company Name**
- **Billing Address**: Address lines, City, State, Zip, Country
- **Bank Name**
- **Name on Account**: First and Last name
- **Account Number**
- **Routing Number**
- **Account Type**: Checking or Savings
- **Authorization Checkbox**: With Yes/No radio buttons
- **Signature**: Text-based signature field
- **Date of Signature**: Auto-filled with current date

---

## 🎯 Integration Points in Code

Look for these comments in `PaymentForm.tsx`:

1. **`TODO: STRIPE INTEGRATION POINT #1`** - Form submission handler
2. **`TODO: STRIPE INTEGRATION POINT #2`** - Add Stripe Elements (CardElement, etc.)

---

## 🛠️ Customization

### Change Colors
Edit `src/components/PaymentForm.css`:
- Submit button color: `.submit-button { background: #6b8e23; }`
- Primary accent: `border-color: #4a90e2;`

### Add More Fields
Add to `formData` state in `PaymentForm.tsx`:
```tsx
const [formData, setFormData] = useState({
  // ... existing fields
  email: '',
  phone: '',
});
```

### Change Background Images
Replace images in the `public/` folder or update the `backgroundImages` object in `PaymentForm.tsx`.

---

## 🔗 Useful Stripe Resources

- **Stripe Documentation**: https://stripe.com/docs
- **ACH Payments**: https://stripe.com/docs/payments/ach-debit
- **React Stripe.js**: https://stripe.com/docs/stripe-js/react
- **Testing**: https://stripe.com/docs/testing

---

## 📦 Build and Deploy

### Build
```bash
npm run build
```
This creates a `dist/` folder with optimized production files.

### Deploy
Deploy the `dist/` folder to any static hosting service:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop `dist/` folder
- **GitHub Pages**: Push `dist/` to `gh-pages` branch

---

## 🆘 Need Help?

If you need assistance with Stripe integration, check:
1. Form data structure in `PaymentForm.tsx`
2. TODO comments marking integration points
3. Console logs for debugging
4. Stripe Dashboard for payment status

---

## ✅ Checklist for Going Live

- [ ] Replace test Stripe keys with live keys
- [ ] Set up bank account verification
- [ ] Add proper error handling
- [ ] Implement email notifications
- [ ] Add loading states during submission
- [ ] Test with real bank account (small amount)
- [ ] Ensure HTTPS on production domain
- [ ] Review Stripe compliance requirements
- [ ] Add terms and conditions
- [ ] Implement proper form validation

---

**Created**: November 17, 2025
**Framework**: React 19 + Vite 7 + TypeScript
**Payment**: Stripe-ready (Bank Account / ACH)
