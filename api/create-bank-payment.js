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
    // Validate Stripe key
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not set');
      return res.status(500).json({ 
        success: false,
        error: 'Stripe not configured on server' 
      });
    }

    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const { formData } = req.body;

    // Validate required fields
    if (!formData) {
      return res.status(400).json({ 
        success: false,
        error: 'Form data is missing' 
      });
    }

    console.log('Creating customer for:', formData.email);

    // Step 1: Create a Stripe Customer
    const customer = await stripe.customers.create({
      name: `${formData.firstName || ''} ${formData.lastName || ''}`.trim(),
      email: formData.email || undefined,
      address: {
        line1: formData.addressLine1 || '',
        line2: formData.addressLine2 || undefined,
        city: formData.city || '',
        state: formData.state || '',
        postal_code: formData.zipCode || '',
        country: 'US',
      },
      metadata: {
        companyName: formData.companyName || '',
        bankName: formData.bankName || '',
        accountType: formData.accountType || '',
        accountHolder: `${formData.accountFirstName || ''} ${formData.accountLastName || ''}`.trim(),
        routingNumber: formData.routingNumber || '',
        accountNumberLast4: formData.accountNumber ? formData.accountNumber.slice(-4) : '',
        signatureDate: formData.signatureDate || '',
      },
    });

    console.log('Customer created:', customer.id);

    // Return success
    return res.status(200).json({
      success: true,
      customerId: customer.id,
      message: `Customer created successfully. Bank account info saved (last 4 digits: ${formData.accountNumber ? formData.accountNumber.slice(-4) : 'N/A'}). You can process the payment manually in Stripe Dashboard.`,
    });

  } catch (error) {
    console.error('Stripe Error:', error.message, error.type);
    return res.status(500).json({
      success: false,
      error: error.message || 'Payment processing failed',
      type: error.type || 'unknown_error',
    });
  }
};
