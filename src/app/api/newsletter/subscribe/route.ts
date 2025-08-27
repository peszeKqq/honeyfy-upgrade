import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Generate a unique discount code
function generateDiscountCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'HONEY';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Newsletter subscribe API called');
    
    // Check if Firebase is available
    if (!db) {
      console.error('❌ Firebase database not available');
      return NextResponse.json(
        { error: 'Database not configured properly' },
        { status: 500 }
      );
    }
    
    const { email } = await request.json();
    console.log('📧 Received email:', email);

    if (!email || !email.includes('@')) {
      console.log('❌ Invalid email format');
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    try {
      const existingQuery = query(
        collection(db, 'newsletter_subscribers'),
        where('email', '==', email.toLowerCase())
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (!existingSnapshot.empty) {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 400 }
        );
      }
    } catch (queryError) {
      console.error('❌ Error checking existing email:', queryError);
      // Continue anyway - don't fail the subscription
    }

    // Generate discount code
    const discountCode = generateDiscountCode();

    // Save subscriber to Firestore
    const subscriberData = {
      email: email.toLowerCase(),
      discountCode,
      discountUsed: false,
      subscribedAt: serverTimestamp(),
      lastEmailSent: null,
      isActive: true,
      source: 'website'
    };

    const docRef = await addDoc(collection(db, 'newsletter_subscribers'), subscriberData);
    console.log('✅ Subscriber saved to database with ID:', docRef.id);

    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ Resend API key not found');
      console.log('📝 Continuing without email sending...');
    } else {
      console.log('✅ Resend API key found, attempting to send email...');
      
      // Send welcome email with Resend (using test domain)
      const welcomeEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Welcome to Honeyfy!</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fefefe;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #f59e0b; margin: 0;">🍯 Welcome to Honeyfy!</h1>
                </div>
                
                <p>Hello ${email.split('@')[0]},</p>
                
                <p>Thank you for subscribing to our newsletter! We're excited to share the sweet world of honey with you.</p>
                
                <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 10px; padding: 20px; margin: 20px 0; text-align: center;">
                    <h2 style="color: #92400e; margin: 0 0 10px 0;">🎁 Your Exclusive Discount</h2>
                    <p style="font-size: 24px; font-weight: bold; color: #92400e; margin: 0;">
                        Use code: <code style="background: white; padding: 5px 10px; border-radius: 5px; font-size: 20px;">${discountCode}</code>
                    </p>
                    <p style="margin: 10px 0 0 0; color: #92400e;">Get 10% OFF your first order!</p>
                </div>
                
                <p>What you can expect from us:</p>
                <ul>
                    <li>🍯 Latest honey products and updates</li>
                    <li>📰 Health benefits and recipes</li>
                    <li>🎁 Exclusive discounts and offers</li>
                    <li>🐝 Beekeeping tips and stories</li>
                </ul>
                
                <p>Stay tuned for our next newsletter!</p>
                
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                    <p style="color: #666; font-size: 12px;">
                        You can unsubscribe at any time by clicking the link below.<br>
                        <a href="#" style="color: #f59e0b;">Unsubscribe</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
      `;

      try {
        await resend.emails.send({
          from: 'Honeyfy <honeyfy.online@gmail.com>',
          to: [email],
          subject: 'Welcome to Honeyfy! 🍯 Your 10% Discount Inside',
          html: welcomeEmailHtml,
        });
        console.log('✅ Welcome email sent successfully');
      } catch (emailError) {
        console.error('❌ Failed to send welcome email:', emailError);
        console.log('📝 Continuing without email sending...');
        // Don't fail the subscription if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      discountCode
    });

  } catch (error) {
    console.error('❌ Newsletter subscription error:', error);
    console.error('❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      name: error instanceof Error ? error.name : 'Unknown error type'
    });
    return NextResponse.json(
      { error: `Failed to subscribe to newsletter: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
