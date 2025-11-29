'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Componente para renderizar HTML/CSS original de templates importados
 * Usado no preview para mostrar o template completo com toda formatação
 */
export default function RawHTMLRenderer({ html, css }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && html) {
      console.log('[RawHTMLRenderer] Input HTML length:', html.length);
      
      // Limpar JSX syntax que não pode ser renderizado como HTML puro
      let cleanedHtml = html;
      
      // Remover imports
      cleanedHtml = cleanedHtml.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '');
      
      // Remover exports
      cleanedHtml = cleanedHtml.replace(/export\s+(default\s+)?/g, '');
      
      // Tentar extrair o JSX do return statement
      // Estratégia: Tentar capturar o bloco return mais externo possível
      
      let extractedJsx = null;
      
      // 1. Tenta formato com parênteses: return ( ... ); (Greedy para pegar até o último parêntese)
      const matchParens = cleanedHtml.match(/return\s*\(([\s\S]*)\)\s*;?\s*}/);
      if (matchParens) {
        extractedJsx = matchParens[1];
        console.log('[RawHTMLRenderer] JSX extracted via greedy parens match');
      }
      
      // 2. Se não achou, tenta formato sem parênteses: return <...>; (Greedy)
      if (!extractedJsx) {
        const matchNoParens = cleanedHtml.match(/return\s+(<[\s\S]*>)\s*;?\s*}/);
        if (matchNoParens) {
          extractedJsx = matchNoParens[1];
          console.log('[RawHTMLRenderer] JSX extracted via greedy direct tag match');
        }
      }
      
      // 3. Arrow function implícita: => ( ... )
      if (!extractedJsx) {
        const matchArrow = cleanedHtml.match(/=>\s*\(([\s\S]*)\)\s*;?\s*$/);
        if (matchArrow) {
          extractedJsx = matchArrow[1];
          console.log('[RawHTMLRenderer] JSX extracted via arrow function match');
        }
      }

      if (extractedJsx) {
        cleanedHtml = extractedJsx;
      } else {
        console.log('[RawHTMLRenderer] Regex failed, using full content fallback');
        cleanedHtml = `<div style="border:1px solid orange; padding:10px; margin-bottom:10px; color:orange;">⚠️ Falha ao extrair JSX. Exibindo conteúdo bruto:</div>` + cleanedHtml;
      }
      
      // Remover expressões JSX simples {variavel}
      cleanedHtml = cleanedHtml.replace(/\{[^{}]+\}/g, '');
      
      // Converter className para class
      cleanedHtml = cleanedHtml.replace(/className=/g, 'class=');
      
      // Converter componentes Next.js comuns
      // <Image /> -> <img />
      cleanedHtml = cleanedHtml.replace(/<Image\s+([^>]*?)\/>/g, '<img $1 />');
      cleanedHtml = cleanedHtml.replace(/<Image\s+([^>]*?)><\/Image>/g, '<img $1 />');
      
      // <Link href="..."> -> <a href="...">
      cleanedHtml = cleanedHtml.replace(/<Link\s+([^>]*?)>/g, '<a $1>');
      cleanedHtml = cleanedHtml.replace(/<\/Link>/g, '</a>');
      
      // Converter tags de componentes genéricos (ex: <Header />) em divs visíveis
      // DESABILITADO: O importador já faz inlining dos componentes reais
      // cleanedHtml = cleanedHtml.replace(/<([A-Z][a-zA-Z0-9]*)([^>]*?)\/>/g, '<div data-component="$1" class="component-placeholder" style="border: 1px dashed #ccc; padding: 1rem; margin: 1rem 0; background: #f9fafb;"><strong>📦 Componente: $1</strong><br/><small>Conteúdo dinâmico não renderizado no preview</small></div>');
      // cleanedHtml = cleanedHtml.replace(/<([A-Z][a-zA-Z0-9]*)([^>]*?)>([\s\S]*?)<\/\1>/g, '<div data-component="$1" class="component-placeholder" style="border: 1px dashed #ccc; padding: 1rem; margin: 1rem 0; background: #f9fafb;"><strong>📦 Componente: $1</strong><div style="margin-top:0.5rem">$3</div></div>');
      
      // Remover self-closing tags do JSX que não são válidas em HTML (exceto as tratadas acima)
      cleanedHtml = cleanedHtml.replace(/<(\w+)([^>]*?)\/>/g, '<$1$2></$1>');
      
      console.log('[RawHTMLRenderer] Final HTML length:', cleanedHtml.length);
      
      if (!cleanedHtml || cleanedHtml.trim().length === 0) {
        cleanedHtml = '<div style="padding: 20px; text-align: center; color: #666;">Nenhum conteúdo HTML encontrado para renderizar.</div>';
        setDebugTab('input'); // Auto-switch to input tab if empty
        setShowDebug(true);
      }

      try {
        containerRef.current.innerHTML = cleanedHtml;
      } catch (e) {
        console.error('[RawHTMLRenderer] Error setting innerHTML:', e);
        containerRef.current.innerHTML = `<div style="color: red; padding: 1rem; border: 1px solid red;">Erro ao renderizar HTML: ${e.message}</div>`;
        setDebugTab('input');
        setShowDebug(true);
      }
    } else if (containerRef.current) {
       containerRef.current.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Carregando conteúdo...</div>';
    }
  }, [html]);

  console.log('[RawHTMLRenderer] Rendered with HTML length:', html?.length);

  const [showDebug, setShowDebug] = useState(false);
  const [debugTab, setDebugTab] = useState('output'); // 'input' | 'output'
  const [error, setError] = useState(null);

  return (
    <div className="raw-html-renderer">
      {/* CSS Injection - Reativado */}
      {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
      
      {/* Header de Debug */}
      <div style={{ 
        marginBottom: '1rem', 
        padding: '0.5rem', 
        background: '#f3f4f6', 
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '0.875rem', color: '#374151' }}>
          <strong>Status:</strong> {html ? `HTML carregado (${html.length} chars)` : 'Sem HTML'} 
          {error && <span style={{ color: 'red', marginLeft: '0.5rem' }}>❌ Erro: {error}</span>}
        </div>
        <button 
          onClick={() => setShowDebug(!showDebug)}
          style={{ 
            fontSize: '0.75rem', 
            padding: '0.25rem 0.75rem', 
            background: showDebug ? '#2563eb' : '#fff', 
            color: showDebug ? '#fff' : '#374151',
            border: '1px solid #d1d5db', 
            borderRadius: '0.25rem',
            cursor: 'pointer'
          }}
        >
          {showDebug ? 'Fechar Debug' : 'Abrir Debug'}
        </button>
      </div>

      {/* Painel de Debug */}
      {showDebug && (
        <div style={{ marginBottom: '1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', overflow: 'hidden' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #d1d5db', background: '#f9fafb' }}>
            <button 
              onClick={() => setDebugTab('output')}
              style={{ flex: 1, padding: '0.5rem', background: debugTab === 'output' ? '#fff' : 'transparent', border: 'none', cursor: 'pointer', fontWeight: debugTab === 'output' ? 'bold' : 'normal' }}
            >
              HTML Processado (DOM)
            </button>
            <button 
              onClick={() => setDebugTab('input')}
              style={{ flex: 1, padding: '0.5rem', background: debugTab === 'input' ? '#fff' : 'transparent', border: 'none', cursor: 'pointer', fontWeight: debugTab === 'input' ? 'bold' : 'normal' }}
            >
              HTML Original (Input)
            </button>
          </div>
          <div style={{ padding: '1rem', background: '#1e1e1e', color: '#d4d4d4', maxHeight: '300px', overflow: 'auto' }}>
            <pre style={{ margin: 0, fontSize: '0.75rem', whiteSpace: 'pre-wrap' }}>
              {debugTab === 'output' ? (containerRef.current?.innerHTML || 'Renderizando...') : (html || 'Nenhum input')}
            </pre>
          </div>
        </div>
      )}
      
      {/* Container Principal */}
      <div 
        ref={containerRef} 
        className="raw-html-content"
        style={{ minHeight: '100px', border: showDebug ? '1px dashed blue' : 'none' }}
      />
    </div>
  );
}
