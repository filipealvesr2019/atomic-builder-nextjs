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
      
      let cleanedHtml = html;
      let extractedJsx = null;

      // 0. Verificar se já é HTML/JSX limpo (não tem imports, exports ou return)
      // Se começar com < e terminar com >, assumimos que é o conteúdo direto
      const trimmed = cleanedHtml.trim();
      if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
         // Verificar se NÃO tem "return " antes do primeiro < (pode ser um fragmento ou componente)
         // Mas se o input for APENAS o JSX, não deve ter return
         if (!trimmed.includes('export default') && !trimmed.includes('return (')) {
             extractedJsx = trimmed;
             console.log('[RawHTMLRenderer] Input appears to be already extracted JSX/HTML');
         }
      }
      
      if (!extractedJsx) {
        // Limpar JSX syntax que não pode ser renderizado como HTML puro
        // Remover imports
        cleanedHtml = cleanedHtml.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '');
        
        // Remover exports
        cleanedHtml = cleanedHtml.replace(/export\s+(default\s+)?/g, '');
        
        // NOVA ESTRATÉGIA: Parser manual para encontrar o último return e balancear parênteses
        
        try {
          // Encontrar todos os índices de "return"
          const returnIndices = [];
          const regexReturn = /return\s+/g;
          let match;
          while ((match = regexReturn.exec(cleanedHtml)) !== null) {
            returnIndices.push(match.index);
          }
          
          // Tentar do último para o primeiro
          for (let i = returnIndices.length - 1; i >= 0; i--) {
            const startIndex = returnIndices[i];
            const afterReturn = cleanedHtml.substring(startIndex + 6).trimStart();
            
            // Se começa com '(', vamos balancear
            if (afterReturn.startsWith('(')) {
              let openCount = 0;
              let endIndex = -1;
              let foundStart = false;
              
              const openParenIndex = cleanedHtml.indexOf('(', startIndex);
              
              for (let j = openParenIndex; j < cleanedHtml.length; j++) {
                if (cleanedHtml[j] === '(') {
                  openCount++;
                  foundStart = true;
                } else if (cleanedHtml[j] === ')') {
                  openCount--;
                }
                
                if (foundStart && openCount === 0) {
                  endIndex = j;
                  break;
                }
              }
              
              if (endIndex !== -1) {
                const content = cleanedHtml.substring(openParenIndex + 1, endIndex);
                if (content.includes('<') || i === returnIndices.length - 1) {
                   extractedJsx = content;
                   console.log('[RawHTMLRenderer] JSX extracted via manual parser (parens)');
                   break;
                }
              }
            } 
            // Se começa com '<', é return direto
            else if (afterReturn.startsWith('<')) {
               const firstTag = cleanedHtml.indexOf('<', startIndex);
               const lastTag = cleanedHtml.lastIndexOf('>');
               if (firstTag !== -1 && lastTag > firstTag) {
                  extractedJsx = cleanedHtml.substring(firstTag, lastTag + 1);
                  console.log('[RawHTMLRenderer] JSX extracted via manual parser (direct)');
                  break;
               }
            }
          }
        } catch (e) {
          console.error('[RawHTMLRenderer] Parser error:', e);
        }

        // Fallback
        if (!extractedJsx) {
           const regexParens = /return\s*\(([\s\S]*?)\)\s*;?\s*}/g;
           const matches = [...cleanedHtml.matchAll(regexParens)];
           if (matches.length > 0) {
               extractedJsx = matches[matches.length - 1][1];
               console.log('[RawHTMLRenderer] JSX extracted via fallback regex (last match)');
           }
        }
      }

      if (extractedJsx) {
        cleanedHtml = extractedJsx;
      } else {
        // Se ainda assim falhar, mas o conteúdo parecer HTML, use-o como último recurso
        if (cleanedHtml.trim().startsWith('<')) {
            console.log('[RawHTMLRenderer] Extraction failed but content looks like HTML, using as is');
        } else {
            console.log('[RawHTMLRenderer] Extraction failed completely');
            cleanedHtml = `<div style="padding: 20px; border: 1px dashed red; color: red;">
              <strong>Erro de Visualização</strong><br/>
              Não foi possível extrair o conteúdo visual deste template.<br/>
              <small>O código pode ser muito complexo para o preview simples.</small>
            </div>`;
        }
      }
      
      // Remover expressões JSX simples {variavel}
      cleanedHtml = cleanedHtml.replace(/\{[^{}]+\}/g, '');
      
      // Converter className para class
      // 1. className={styles.foo} -> class="foo"
      cleanedHtml = cleanedHtml.replace(/className=\{styles\.(\w+)\}/g, 'class="$1"');
      // 2. className="foo" -> class="foo"
      cleanedHtml = cleanedHtml.replace(/className="([^"]+)"/g, 'class="$1"');
      // 3. className={'foo'} -> class="foo"
      cleanedHtml = cleanedHtml.replace(/className=\{'([^']+)'\}/g, 'class="$1"');
      
      // Converter componentes Next.js comuns
      // <Image /> -> <img />
      cleanedHtml = cleanedHtml.replace(/<Image\s+([^>]*?)\/>/g, '<img $1 />');
      cleanedHtml = cleanedHtml.replace(/<Image\s+([^>]*?)><\/Image>/g, '<img $1 />');
      
      // <Link href="..."> -> <a href="...">
      cleanedHtml = cleanedHtml.replace(/<Link\s+([^>]*?)>/g, '<a $1>');
      cleanedHtml = cleanedHtml.replace(/<\/Link>/g, '</a>');
      
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

  const [showDebug, setShowDebug] = useState(true);
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
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ fontSize: '0.75rem', color: '#374151', fontFamily: 'monospace', wordBreak: 'break-all' }}>
          <strong>Status:</strong> {html ? `HTML carregado (${html.length} chars)` : 'Sem HTML'} 
          <br/>
          <strong>Snippet:</strong> {html ? html.substring(0, 100).replace(/</g, '&lt;') + '...' : 'N/A'}
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
