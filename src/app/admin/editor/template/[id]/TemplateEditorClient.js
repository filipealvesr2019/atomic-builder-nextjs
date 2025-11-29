'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TemplateEditorClient({ templateId }) {
  const router = useRouter();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState(0);

  useEffect(() => {
    fetchTemplate();
  }, [templateId]);

  const fetchTemplate = async () => {
    try {
      const res = await fetch(`/api/templates/${templateId}`);
      if (res.ok) {
        const data = await res.json();
        setTemplate(data);
      }
    } catch (error) {
      console.error('Failed to load template', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Carregando template...</div>;
  if (!template) return <div>Template não encontrado</div>;

  // If it's a theme with pages, show page selector
  if (template.type === 'theme' && template.pages && template.pages.length > 0) {
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ padding: '2rem', flex: 1, overflow: 'auto' }}>
          <h1>{template.name}</h1>
          <p style={{ color: '#666', marginBottom: '2rem' }}>Tema com {template.pages.length} página(s)</p>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            {template.pages.map((page, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPage(idx)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: selectedPage === idx ? '#3b82f6' : '#f3f4f6',
                  color: selectedPage === idx ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: selectedPage === idx ? '600' : '400',
                }}
              >
                {page.name}
              </button>
            ))}
          </div>

          <div style={{ background: '#f9fafb', padding: '2rem', borderRadius: '0.5rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>{template.pages[selectedPage].name}</h2>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Slug: <code>{template.pages[selectedPage].slug}</code>
            </p>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              {template.pages[selectedPage].content?.length || 0} bloco(s) nesta página
            </p>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => {
                  // Store the current page data in localStorage for the editor
                  localStorage.setItem('templateEditData', JSON.stringify({
                    templateId: template._id,
                    pageIndex: selectedPage,
                    pageName: template.pages[selectedPage].name,
                    blocks: template.pages[selectedPage].content || []
                  }));
                  router.push('/admin/editor/template-edit');
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                ✏️ Editar no Editor
              </button>
              
              <button
                onClick={() => {
                  alert('Funcionalidade "Criar Página deste Template" será implementada em breve!');
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                Criar Página deste Template
              </button>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <Link href="/admin/templates" style={{ color: '#3b82f6', textDecoration: 'none' }}>
              ← Voltar para Templates
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // For non-theme templates (single page), redirect to page editor
  return (
    <div style={{ padding: '2rem' }}>
      <h1>{template.name}</h1>
      <p>Template do tipo: {template.type}</p>
      <p>A edição de templates simples será implementada em breve.</p>
      <Link href="/admin/templates" style={{ color: '#3b82f6', textDecoration: 'none' }}>
        ← Voltar para Templates
      </Link>
    </div>
  );
}
