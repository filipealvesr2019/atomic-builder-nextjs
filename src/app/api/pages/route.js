import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import { z } from 'zod';

const createPageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
});

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await dbConnect();
    const pages = await Page.find({ authorId: userId }).sort({ createdAt: -1 });

    return NextResponse.json(pages);
  } catch (error) {
    console.error('[PAGES_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const validation = createPageSchema.safeParse(body);

    if (!validation.success) {
      return new NextResponse(validation.error.errors[0].message, { status: 400 });
    }

    const { title, slug } = validation.data;

    await dbConnect();

    // Check if slug exists
    const existingPage = await Page.findOne({ slug });
    if (existingPage) {
      return new NextResponse('Slug already exists', { status: 409 });
    }

    const page = await Page.create({
      title,
      slug,
      authorId: userId,
      blocks: [], // Initial empty blocks
    });

    return NextResponse.json(page);
  } catch (error) {
    console.error('[PAGES_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
