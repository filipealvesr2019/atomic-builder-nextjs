import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import { z } from 'zod';

const updatePageSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  status: z.enum(['draft', 'published']).optional(),
  blocks: z.array(z.any()).optional(),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
});

export async function GET(req, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await dbConnect();
    const page = await Page.findOne({ _id: params.id, authorId: userId });

    if (!page) {
      return new NextResponse('Page not found', { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('[PAGE_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const validation = updatePageSchema.safeParse(body);

    if (!validation.success) {
      return new NextResponse(validation.error.errors[0].message, { status: 400 });
    }

    await dbConnect();
    const page = await Page.findOneAndUpdate(
      { _id: params.id, authorId: userId },
      { ...validation.data, updatedAt: new Date() },
      { new: true }
    );

    if (!page) {
      return new NextResponse('Page not found', { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('[PAGE_PUT]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await dbConnect();
    const page = await Page.findOneAndDelete({ _id: params.id, authorId: userId });

    if (!page) {
      return new NextResponse('Page not found', { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('[PAGE_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
