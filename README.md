# Payment Authorization Form - React + Vite

A professional payment authorization form built with React, TypeScript, and Vite. Features three background variants and is ready for Stripe integration.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:5173` to view the application.

## ✨ Features

- ✅ Professional payment authorization form design
- ✅ Three beautiful background variants
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ TypeScript for type safety
- ✅ Stripe-ready structure with integration placeholders
- ✅ Form validation
- ✅ Modern UI with blur effects

## 📋 Form Fields

- Personal Information (Name, Company)
- Billing Address (Street, City, State, Zip, Country)
- Bank Account Details (Bank Name, Account Holder, Account Number, Routing Number)
- Account Type (Checking/Savings)
- Authorization & Signature
- Date

## 🎨 Background Variants

The project includes 3 different background images:

### Switch Variants:
Edit `src/App.tsx` and change the `variant` prop:

```tsx
<PaymentForm variant={1} />  // Background 1
<PaymentForm variant={2} />  // Background 2
<PaymentForm variant={3} />  // Background 3
```

Or import different App files in `src/main.tsx`:
```tsx
import App from './AppVariant1.tsx'  // Background 1
import App from './AppVariant2.tsx'  // Background 2
import App from './AppVariant3.tsx'  // Background 3
```

## 💳 Stripe Integration

**See `STRIPE_INTEGRATION_GUIDE.md` for complete step-by-step Stripe integration instructions.**

Key integration points are marked in the code with:
- `TODO: STRIPE INTEGRATION POINT #1` - Form submission
- `TODO: STRIPE INTEGRATION POINT #2` - Stripe Elements

### Quick Integration Steps:
1. Install Stripe: `npm install @stripe/stripe-js @stripe/react-stripe-js`
2. Add your Stripe publishable key
3. Wrap app with `<Elements>` provider
4. Update the `handleSubmit` function
5. Create backend endpoint for payment processing

## 📁 Project Structure

```
paymment-pages/
├── public/                    # Background images
├── src/
│   ├── components/
│   │   ├── PaymentForm.tsx   # Main form component
│   │   └── PaymentForm.css   # Form styling
│   ├── App.tsx               # Default app (Variant 1)
│   ├── AppVariant1.tsx       # Variant 1
│   ├── AppVariant2.tsx       # Variant 2
│   └── AppVariant3.tsx       # Variant 3
├── STRIPE_INTEGRATION_GUIDE.md  # Detailed Stripe guide
└── package.json
```

## 🛠️ Technology Stack

- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Vite 7** - Build Tool & Dev Server
- **CSS3** - Styling with modern features

## 📱 Responsive Design

The form is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Customization

### Change Colors:
Edit `src/components/PaymentForm.css`:
- Submit button: `.submit-button`
- Input focus color: `.form-input:focus`

### Add Fields:
Update `formData` state in `src/components/PaymentForm.tsx`

### Change Backgrounds:
Replace images in `public/` folder

## 🚀 Deployment

### Build
```bash
npm run build
```

### Deploy to:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag `dist/` folder
- **GitHub Pages**: Push to `gh-pages` branch

## 📖 Documentation

- **Main README**: This file
- **Stripe Integration**: See `STRIPE_INTEGRATION_GUIDE.md`
- **Code Comments**: Check component files for inline documentation

## 🆘 Support

For Stripe integration help, refer to:
1. `STRIPE_INTEGRATION_GUIDE.md` - Complete integration guide
2. [Stripe Documentation](https://stripe.com/docs)
3. Code comments with TODO markers

## ✅ Production Checklist

- [ ] Replace test Stripe keys with live keys
- [ ] Set up bank verification
- [ ] Add error handling
- [ ] Test with real accounts
- [ ] Enable HTTPS
- [ ] Add email notifications
- [ ] Review security best practices

---

**Built with ❤️ using React + Vite + TypeScript**

**Created**: November 17, 2025
