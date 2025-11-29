import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { z } from 'zod';

const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  price: z.number().min(0, 'Price must be positive'),
  sku: z.string().optional(),
  stock: z.number().min(0).default(0),
  description: z.string().optional(),
});

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    console.error('[PRODUCTS_GET]', error);
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
    const validation = createProductSchema.safeParse(body);

    if (!validation.success) {
      return new NextResponse(validation.error.errors[0].message, { status: 400 });
    }

    const { name, slug, price, sku, stock, description } = validation.data;

    await dbConnect();

    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return new NextResponse('Slug already exists', { status: 409 });
    }

    const product = await Product.create({
      name,
      slug,
      price,
      sku,
      stock,
      description,
      status: 'draft',
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('[PRODUCTS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
