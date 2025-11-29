import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import BlockRenderer from '@/components/editor/BlockRenderer';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';

export const metadata = {
  title: 'CMS Nextjs',
  description: 'Built with Next.js and MongoDB',
};

export default async function Home() {
  await dbConnect();
  
  // Try to find a page with slug 'home'
  const page = await Page.findOne({ slug: 'home', status: 'published' });

  if (page) {
    return (
      <main>
        {page.blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} readOnly={true} />
        ))}
      </main>
    );
  }

  // Default Welcome Screen if no 'home' page exists
  const { userId } = await auth();

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>CMS Nextjs</h1>
      <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '2rem', maxWidth: '600px' }}>
        Bem-vindo ao seu novo CMS. Parece que você ainda não criou uma página inicial (slug: <strong>home</strong>).
      </p>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link 
          href="/admin" 
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: '#2563eb', 
            color: 'white', 
            borderRadius: '0.5rem', 
            textDecoration: 'none',
            fontWeight: '600'
          }}
        >
          {userId ? 'Ir para o Admin' : 'Fazer Login'}
        </Link>
      </div>
    </div>
  );
}
