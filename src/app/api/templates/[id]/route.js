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
  pageContent: z.array(z.any()).optional(), // Legacy support
  theme: z.any().optional(), // Theme ID or Object
  sections: z.record(z.any()).optional(), // Theme sections props
  products: z.array(z.object({
    id: z.string().or(z.number()).optional(),
    name: z.string(),
    price: z.number().or(z.string()), // Allow string input that can be parsed
    currency: z.string().optional(),
    category: z.string().optional(),
    subcategory: z.string().optional(),
    measurementUnit: z.string().optional(),
    colors: z.string().optional(),
    sizes: z.string().optional(),
    description: z.string().optional(),
    coverImage: z.any().optional(), // Allow file obj or string
    coverImagePublicId: z.string().optional(),
    type: z.enum(['physical', 'digital']).optional(),
    digitalProductFile: z.any().optional(), // Allow file obj or string
    digitalProductFilePublicId: z.string().optional(),
    digitalProductCover: z.any().optional(),
    digitalProductCoverPublicId: z.string().optional()
  })).optional(),
  plugins: z.array(z.object({
    id: z.string(),
    installedAt: z.string().or(z.date()).optional()
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

export async function PATCH(req, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const resolvedParams = await params;
    const body = await req.json();
    console.log('[TEMPLATE_PATCH] Received body:', JSON.stringify(body, null, 2));
    const validation = updateTemplateSchema.safeParse(body);

    if (!validation.success) {
      console.error('[TEMPLATE_PATCH] Validation error:', validation.error);
      const errorMessage = validation.error?.errors?.[0]?.message || 'Validation Error';
      return new NextResponse(errorMessage, { status: 400 });
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
    console.error('[TEMPLATE_PATCH]', error);
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
