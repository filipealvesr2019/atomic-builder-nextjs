import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { z } from 'zod';

const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  sku: z.string().optional(),
  stock: z.number().min(0).optional(),
  description: z.string().optional(),
  status: z.enum(['active', 'draft', 'archived']).optional(),
  images: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
});

export async function GET(req, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await dbConnect();
    const product = await Product.findById(params.id);

    if (!product) {
      return new NextResponse('Product not found', { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('[PRODUCT_GET]', error);
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
    const validation = updateProductSchema.safeParse(body);

    if (!validation.success) {
      return new NextResponse(validation.error.errors[0].message, { status: 400 });
    }

    await dbConnect();
    const product = await Product.findByIdAndUpdate(
      params.id,
      { ...validation.data, updatedAt: new Date() },
      { new: true }
    );

    if (!product) {
      return new NextResponse('Product not found', { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('[PRODUCT_PUT]', error);
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
    const product = await Product.findByIdAndDelete(params.id);

    if (!product) {
      return new NextResponse('Product not found', { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('[PRODUCT_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
