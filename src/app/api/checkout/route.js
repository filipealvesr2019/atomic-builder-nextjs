import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { items } = body;

    console.log('[Mock Checkout] Received items:', items.length);

    // In a real app, we would:
    // 1. Initialize Stripe with secret key
    // 2. Create a Checkout Session
    // 3. Return the session.url

    // Since this is a mock:
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Return a success URL pointing to our success page
    return NextResponse.json({ 
      url: '/checkout-success?session_id=mock_session_12345' 
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
