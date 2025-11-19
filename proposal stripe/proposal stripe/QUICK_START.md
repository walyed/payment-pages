# 🚀 Quick Start Guide

## Ready to Test? Follow These Steps:

### 1. Open Terminal in Project Folder

```powershell
cd "d:\paymment pages\proposal stripe\proposal stripe"
```

### 2. Install Dependencies (First Time Only)

```powershell
npm install
```

### 3. Start the Server

```powershell
npm start
```

You should see:
```
✅ Server starting...
Доступні пропозиції:
- Іван: http://localhost:4242/p/ivan-001
- Оля: http://localhost:4242/p/olya-002
- Петро: http://localhost:4242/p/petro-003
✅ Server running on http://localhost:4242
```

### 4. Open in Browser

Visit any of these URLs:
- http://localhost:4242/p/ivan-001
- http://localhost:4242/p/olya-002
- http://localhost:4242/p/petro-003

### 5. Fill the Form

Use test data:
- **Name**: Test User
- **Email**: test@example.com
- **Routing Number**: `110000000` (Stripe test)
- **Account Number**: `000123456789` (Stripe test)
- **All other fields**: Any data you want

### 6. Click "Continue to Payment"

- Form creates Stripe Customer
- Redirects to Stripe Checkout
- Use test card: `4242 4242 4242 4242`
- Any future expiry, any CVV

### 7. Check Stripe Dashboard

View customer at: https://dashboard.stripe.com/test/customers

You'll see:
- Customer name, email, address
- Bank authorization data in metadata
- Payment history

## 🎉 That's It!

Your payment proposal system is now running with:
✅ Custom bank authorization form
✅ Multiple proposal pages
✅ Secure Stripe integration
✅ Subscription support

## 📝 Next Steps

1. **Add More Proposals**: Edit `proposals.js`
2. **Customize Form**: Edit `payment-form.html`
3. **Deploy**: Use Heroku, Railway, or any Node.js host
4. **Go Live**: Switch to live Stripe keys in `.env`
