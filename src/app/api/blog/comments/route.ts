import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, query, where, orderBy, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const { postId, content, authorName, authorEmail } = await request.json();

    if (!postId || !content || !authorName || !authorEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const commentData = {
      postId,
      content: content.trim(),
      authorName,
      authorEmail,
      createdAt: serverTimestamp(),
      isApproved: false, // Comments require admin approval
    };

    const docRef = await addDoc(collection(db, 'blog_comments'), commentData);

    return NextResponse.json({
      success: true,
      commentId: docRef.id,
      message: 'Comment submitted successfully and awaiting approval'
    });

  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json(
      { error: 'Failed to submit comment' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    const q = query(
      collection(db, 'blog_comments'),
      where('postId', '==', postId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const comments: any[] = [];

    querySnapshot.forEach((doc) => {
      comments.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return NextResponse.json({ comments });

  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}
