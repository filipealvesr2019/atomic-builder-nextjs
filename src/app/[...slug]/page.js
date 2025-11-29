import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import BlockRenderer from '@/components/editor/BlockRenderer';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const slugPath = (await params).slug.join('/');
  await dbConnect();
  const page = await Page.findOne({ slug: slugPath, status: 'published' });

  if (!page) return {};

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description,
  };
}

export default async function PublicPage({ params }) {
  const slugPath = (await params).slug.join('/');
  
  await dbConnect();
  const page = await Page.findOne({ slug: slugPath, status: 'published' });

  if (!page) {
    notFound();
  }

  return (
    <main>
      {page.blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} readOnly={true} />
      ))}
    </main>
  );
}
