const Stripe = require('stripe');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe secret key not configured');
    }

    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const { formData, amount } = req.body;

    // Validate required fields
    if (!formData || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Step 1: Create a Stripe Customer
    const customer = await stripe.customers.create({
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email || undefined,
      address: {
        line1: formData.addressLine1,
        line2: formData.addressLine2 || undefined,
        city: formData.city,
        state: formData.state,
        postal_code: formData.zipCode,
        country: 'US',
      },
      metadata: {
        companyName: formData.companyName,
        bankName: formData.bankName,
        accountType: formData.accountType,
      },
    });

    // Store bank info in customer metadata (for your records only)
    await stripe.customers.update(customer.id, {
      metadata: {
        ...customer.metadata,
        accountHolder: `${formData.accountFirstName} ${formData.accountLastName}`,
        routingNumber: formData.routingNumber,
        accountNumberLast4: formData.accountNumber.slice(-4),
        signatureDate: formData.signatureDate,
        requestedAmount: amount.toString(),
      },
    });

    // Return success with customer ID
    // You can manually process the payment in Stripe Dashboard
    return res.status(200).json({
      success: true,
      customerId: customer.id,
      message: `Customer created successfully. Bank account info saved (last 4 digits: ${formData.accountNumber.slice(-4)}). You can process the payment manually in Stripe Dashboard.`,
    });

  } catch (error) {
    console.error('Stripe Error:', error);
    return res.status(500).json({
      error: error.message || 'Payment processing failed',
      type: error.type,
    });
  }
}
