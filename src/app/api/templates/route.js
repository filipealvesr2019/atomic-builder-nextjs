import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/db';
import Template from '@/models/Template';
import { z } from 'zod';

const createTemplateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['page', 'section', 'block', 'theme']).default('page'),
  content: z.array(z.any()), // Array of blocks
  templateId: z.string().optional(), // CMS-compatible template ID
  sections: z.record(z.any()).optional(), // Props for template sections
  url: z.string().optional(), // For iframe-based templates
  pages: z.array(z.object({
    name: z.string(),
    slug: z.string(),
    content: z.array(z.any()),
    rawHtml: z.string().optional(),
    rawCss: z.string().optional(),
    componentCode: z.string().optional()
  })).optional(), // For theme type
  isPublic: z.boolean().default(false),
});

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await dbConnect();
    // Fetch user's templates and public templates
    const templates = await Template.find({
      $or: [{ authorId: userId }, { isPublic: true }],
    }).sort({ createdAt: -1 });

    return NextResponse.json(templates);
  } catch (error) {
    console.error('[TEMPLATES_GET]', error);
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
    console.log('[TEMPLATES_POST] Body received:', JSON.stringify({
      ...body,
      content: body.content?.length + ' blocks',
      pages: body.pages?.map(p => ({
        name: p.name,
        hasRawHtml: !!p.rawHtml,
        rawHtmlLength: p.rawHtml?.length,
        hasRawCss: !!p.rawCss,
        blocks: p.content?.length
      }))
    }, null, 2));
    
    const validation = createTemplateSchema.safeParse(body);

    if (!validation.success) {
      console.error('[TEMPLATES_POST] Validation error:', validation.error);
      return new NextResponse(validation.error.errors[0].message, { status: 400 });
    }

    const { name, type, content, templateId, sections, url, pages, isPublic } = validation.data;

    await dbConnect();

    const template = await Template.create({
      name,
      type,
      content,
      templateId,
      sections,
      url,
      pages,
      isPublic,
      authorId: userId,
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error('[TEMPLATES_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
