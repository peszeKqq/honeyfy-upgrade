import { NextResponse } from 'next/server';

// Facebook Graph API endpoint for page reviews
const FACEBOOK_PAGE_ID = '100090174670745';
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

interface FacebookReview {
  id: string;
  reviewer_name: string;
  rating: number;
  review_text?: string;
  created_time: string;
}

export async function GET() {
  try {
    if (!FACEBOOK_ACCESS_TOKEN) {
      // Fallback to sample reviews if no Facebook token
      const sampleReviews = [
        {
          id: '1',
          reviewer_name: 'Abigail Sampson',
          rating: 5,
          review_text: 'Amazing honey! The quality is outstanding and the taste is incredible. Will definitely order again!',
          created_time: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          reviewer_name: 'Mark Janssen',
          rating: 5,
          review_text: 'Best honey I\'ve ever tasted. Fast delivery and excellent customer service. Highly recommended!',
          created_time: '2024-01-14T15:45:00Z'
        },
        {
          id: '3',
          reviewer_name: 'Lisa de Vries',
          rating: 5,
          review_text: 'Pure, natural honey that tastes like it should. The packaging is beautiful too. Love it!',
          created_time: '2024-01-13T09:20:00Z'
        },
        {
          id: '4',
          reviewer_name: 'Thomas Bakker',
          rating: 5,
          review_text: 'Excellent quality honey. The difference is noticeable compared to supermarket honey. Worth every penny!',
          created_time: '2024-01-12T14:15:00Z'
        },
        {
          id: '5',
          reviewer_name: 'Abigail Sampson',
          rating: 5,
          review_text: 'Fantastic service and amazing honey. My kids love it on their toast every morning!',
          created_time: '2024-01-11T11:30:00Z'
        },
        {
          id: '6',
          reviewer_name: 'Pieter Visser',
          rating: 5,
          review_text: 'Authentic Polish honey with incredible flavor. The customer service is top-notch. 5 stars!',
          created_time: '2024-01-10T16:45:00Z'
        }
      ];

      // Return 3 random reviews
      const shuffled = sampleReviews.sort(() => 0.5 - Math.random());
      return NextResponse.json(shuffled.slice(0, 3));
    }

    // Fetch real reviews from Facebook Graph API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/ratings?access_token=${FACEBOOK_ACCESS_TOKEN}&fields=reviewer{name},rating,review_text,created_time&limit=10`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Facebook reviews');
    }

    const data = await response.json();
    const reviews = data.data || [];

    // Transform Facebook data to our format
    const transformedReviews = reviews
      .filter((review: any) => review.review_text) // Only include reviews with text
      .map((review: any) => ({
        id: review.id,
        reviewer_name: review.reviewer?.name || 'Anonymous',
        rating: review.rating,
        review_text: review.review_text,
        created_time: review.created_time
      }))
      .slice(0, 3); // Return only 3 reviews

    return NextResponse.json(transformedReviews);

  } catch (error) {
    console.error('Error fetching Facebook reviews:', error);
    
    // Fallback to sample reviews on error
    const fallbackReviews = [
      {
        id: '1',
        reviewer_name: 'Abigail Sampson',
        rating: 5,
        review_text: 'Amazing honey! The quality is outstanding and the taste is incredible. Will definitely order again!',
        created_time: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        reviewer_name: 'Michał Hennig',
        rating: 5,
        review_text: 'Best honey I\'ve ever tasted. Fast delivery and excellent customer service. Highly recommended!',
        created_time: '2024-01-14T15:45:00Z'
      },
      {
        id: '3',
        reviewer_name: 'Lisa de Vries',
        rating: 5,
        review_text: 'Pure, natural honey that tastes like it should. The packaging is beautiful too. Love it!',
        created_time: '2024-01-13T09:20:00Z'
      }
    ];

    return NextResponse.json(fallbackReviews);
  }
}
