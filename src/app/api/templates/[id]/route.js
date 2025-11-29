import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/db';
import Template from '@/models/Template';
import { z } from 'zod';

const updateTemplateSchema = z.object({
  pages: z.array(z.object({
    name: z.string(),
    slug: z.string(),
    content: z.array(z.any()),
    rawHtml: z.string().optional(),
    rawCss: z.string().optional(),
    componentCode: z.string().optional()
  })).optional(),
});

export async function GET(req, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const resolvedParams = await params;
    await dbConnect();
    const template = await Template.findById(resolvedParams.id);

    if (!template) {
      return new NextResponse('Template not found', { status: 404 });
    }

    return NextResponse.json(template);
  } catch (error) {
    console.error('[TEMPLATE_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const resolvedParams = await params;
    const body = await req.json();
    const validation = updateTemplateSchema.safeParse(body);

    if (!validation.success) {
      console.error('[TEMPLATE_PUT] Validation error:', validation.error);
      return new NextResponse(validation.error.errors[0].message, { status: 400 });
    }

    await dbConnect();
    
    const template = await Template.findOneAndUpdate(
      { _id: resolvedParams.id, authorId: userId },
      { $set: validation.data },
      { new: true }
    );

    if (!template) {
      return new NextResponse('Template not found or unauthorized', { status: 404 });
    }

    return NextResponse.json(template);
  } catch (error) {
    console.error('[TEMPLATE_PUT]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const resolvedParams = await params;
    await dbConnect();
    const template = await Template.findOneAndDelete({ _id: resolvedParams.id, authorId: userId });

    if (!template) {
      return new NextResponse('Template not found or unauthorized', { status: 404 });
    }

    return NextResponse.json(template);
  } catch (error) {
    console.error('[TEMPLATE_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
