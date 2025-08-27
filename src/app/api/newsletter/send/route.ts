import { NextRequest, NextResponse } from 'next/server';
import { collection, query, where, getDocs, getDoc, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Newsletter send API called');
    
    // Check if Firebase is available
    if (!db) {
      console.error('❌ Firebase database not available');
      return NextResponse.json(
        { error: 'Database not configured properly' },
        { status: 500 }
      );
    }

    const { subject, content, type = 'newsletter', subscriberIds } = await request.json();
    console.log('📧 Newsletter details:', { subject, type, subscriberIds });

    if (!subject || !content) {
      return NextResponse.json(
        { error: 'Subject and content are required' },
        { status: 400 }
      );
    }

    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ Resend API key not found');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Fetch subscribers based on selection
    let subscribers: any[] = [];
    
    if (subscriberIds && subscriberIds.length > 0) {
      // Fetch specific subscribers by IDs
      const subscriberPromises = subscriberIds.map(async (id: string) => {
        const docRef = doc(db, 'newsletter_subscribers', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().isActive) {
          return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
      });
      
      const subscriberResults = await Promise.all(subscriberPromises);
      subscribers = subscriberResults.filter(sub => sub !== null);
    } else {
      // Fetch all active subscribers (fallback)
      const subscribersQuery = query(
        collection(db, 'newsletter_subscribers'),
        where('isActive', '==', true)
      );
      const subscribersSnapshot = await getDocs(subscribersQuery);
      subscribers = subscribersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    }

    console.log(`📧 Found ${subscribers.length} subscribers to send to`);

    if (subscribers.length === 0) {
      return NextResponse.json(
        { error: 'No subscribers found' },
        { status: 400 }
      );
    }

    let sentCount = 0;
    let failedCount = 0;

    // Send emails to each subscriber
    for (const subscriber of subscribers) {
      try {
        // Personalize content
        const personalizedContent = content
          .replace(/\{\{SUBSCRIBER_NAME\}\}/g, subscriber.email.split('@')[0])
          .replace(/\{\{DISCOUNT_CODE\}\}/g, subscriber.discountCode || 'N/A');

        // Send email to subscriber
        await resend.emails.send({
          from: 'Honeyfy <noreply@yourdomain.com>', // Update with your domain
          to: [subscriber.email],
          subject: subject,
          html: personalizedContent,
        });

        console.log(`✅ Email sent to ${subscriber.email}`);
        sentCount++;

        // Update lastEmailSent timestamp
        await updateDoc(doc(db, 'newsletter_subscribers', subscriber.id), {
          lastEmailSent: serverTimestamp()
        });

      } catch (emailError) {
        console.error(`❌ Failed to send email to ${subscriber.email}:`, emailError);
        failedCount++;
      }
    }

    // Record campaign in database
    const campaignData = {
      type,
      subject,
      sentAt: serverTimestamp(),
      totalSubscribers: subscribers.length,
      sentCount,
      failedCount
    };

    const campaignRef = await addDoc(collection(db, 'newsletter_campaigns'), campaignData);
    console.log('✅ Campaign recorded with ID:', campaignRef.id);

    return NextResponse.json({
      success: true,
      message: 'Newsletter sent successfully',
      stats: {
        total: subscribers.length,
        sent: sentCount,
        failed: failedCount
      },
      campaignId: campaignRef.id
    });

  } catch (error) {
    console.error('❌ Newsletter send error:', error);
    return NextResponse.json(
      { error: `Failed to send newsletter: ${error.message}` },
      { status: 500 }
    );
  }
}
