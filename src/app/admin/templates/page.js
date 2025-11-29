'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash, X, Eye } from 'lucide-react';
import styles from './templates.module.css';
import BlockRenderer from '@/components/editor/BlockRenderer';
import { v4 as uuidv4 } from 'uuid';

export default function TemplatesList() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState('');

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/templates');
      if (res.ok) {
        const data = await res.json();
        setTemplates(data);
      }
    } catch (error) {
      console.error('Failed to fetch templates', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!confirm('Tem certeza que deseja excluir este template?')) return;

    try {
      const res = await fetch(`/api/templates/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setTemplates(templates.filter((t) => t._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete template', error);
    }
  };

  // Helper to parse code
  const parseCodeToBlocks = (codeString) => {
    const blocks = [];
    
    // Função para limpar código JSX/dinâmico de strings
    const cleanDynamicCode = (text) => {
      if (!text) return '';
      
      // Remover expressões JSX {variavel}, {objeto.propriedade}, etc.
      let cleaned = text.replace(/\{[^}]+\}/g, '');
      
      // Remover tags JSX vazias
      cleaned = cleaned.replace(/<[^>]+\/>/g, '');
      
      // Limpar espaços extras
      cleaned = cleaned.trim();
      
      return cleaned;
    };
    
    // Verificar se o conteúdo é válido (não é apenas código dinâmico)
    const isValidContent = (text) => {
      if (!text || text.trim().length === 0) return false;
      
      // Rejeitar se for apenas código dinâmico ou variáveis
      if (text.match(/^[\s{}<>]+$/)) return false;
      
      // Rejeitar se começar com palavras-chave de código
      const codeKeywords = ['import', 'export', 'const', 'let', 'var', 'function', 'return', 'if', 'else'];
      for (const keyword of codeKeywords) {
        if (text.trim().startsWith(keyword)) return false;
      }
      
      return true;
    };
    
    // Try to find data-block-type sections first (for CMS-compatible themes)
    const blockRegex = /<[^>]+data-block-type=["']([^"']+)["'][^>]*>([\s\S]*?)<\/[^>]+>/g;
    let match;
    
    while ((match = blockRegex.exec(codeString)) !== null) {
      const blockType = match[1]; // e.g., "hero", "features", "contact"
      const blockContent = match[2];
      
      // Create a container block
      const containerBlock = {
        id: uuidv4(),
        type: 'container',
        props: { blockType: blockType },
        children: []
      };
      
      // Helper to process content inside container
      const processContent = (content) => {
        // Extract h1, h2, h3, h4, h5, h6
        const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
        let hMatch;
        while ((hMatch = headingRegex.exec(content)) !== null) {
          const tag = `h${hMatch[1]}`;
          const text = cleanDynamicCode(hMatch[2]);
          if (isValidContent(text)) {
            containerBlock.children.push({
              id: uuidv4(),
              type: 'text',
              content: text,
              props: { tag: tag }
            });
          }
        }

        // Extract paragraphs
        const pRegex = /<p[^>]*>(.*?)<\/p>/gi;
        let pMatch;
        while ((pMatch = pRegex.exec(content)) !== null) {
          const text = cleanDynamicCode(pMatch[1]);
          if (isValidContent(text)) {
            containerBlock.children.push({
              id: uuidv4(),
              type: 'text',
              content: text,
              props: { tag: 'p' }
            });
          }
        }

        // Extract images
        const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
        let imgMatch;
        while ((imgMatch = imgRegex.exec(content)) !== null) {
          const src = imgMatch[1];
          if (!src.includes('{') && !src.startsWith('/api/')) {
            containerBlock.children.push({
              id: uuidv4(),
              type: 'image',
              props: { src: src, alt: 'Imported' },
              content: ''
            });
          }
        }

        // Extract buttons (looks for data-block-type="button" or simple <a>/ <button> with classes)
        const btnRegex = /<(?:a|button)[^>]*data-block-type=["']button["'][^>]*>(.*?)<\/(?:a|button)>/gi;
        let btnMatch;
        while ((btnMatch = btnRegex.exec(content)) !== null) {
          const text = cleanDynamicCode(btnMatch[1]);
          containerBlock.children.push({
            id: uuidv4(),
            type: 'button',
            props: { text: text || 'Button', style: 'primary' },
            content: ''
          });
        }
      };

      processContent(blockContent);
      
      if (containerBlock.children.length > 0) {
        blocks.push(containerBlock);
      }
    }
    
    // Fallback: if no data-block-type found, use old regex method
    if (blocks.length === 0) {
      const h1Regex = /<h1[^>]*>(.*?)<\/h1>/g;
      while ((match = h1Regex.exec(codeString)) !== null) {
        const cleanedText = cleanDynamicCode(match[1]);
        if (isValidContent(cleanedText)) {
          blocks.push({ id: uuidv4(), type: 'text', content: cleanedText, props: { tag: 'h1' } });
        }
      }

      const pRegex = /<p[^>]*>(.*?)<\/p>/g;
      while ((match = pRegex.exec(codeString)) !== null) {
        const cleanedText = cleanDynamicCode(match[1]);
        if (isValidContent(cleanedText)) {
          blocks.push({ id: uuidv4(), type: 'text', content: cleanedText, props: { tag: 'p' } });
        }
      }

      const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
      while ((match = imgRegex.exec(codeString)) !== null) {
        const src = match[1];
        // Ignorar imagens dinâmicas ou variáveis
        if (!src.includes('{') && !src.startsWith('/api/')) {
          blocks.push({ id: uuidv4(), type: 'image', props: { src: src, alt: 'Imported Image' }, content: '' });
        }
      }
    }

    return blocks;
  };

  // Função para extrair CSS de arquivos associados
  const extractCSS = async (files, pageFile) => {
    let css = '';
    const pagePath = pageFile.webkitRelativePath || pageFile.name;
    
    // Buscar arquivo CSS Module correspondente (e.g., page.module.css)
    const baseFileName = pageFile.name.replace(/\.(js|jsx|tsx)$/, '');
    const cssModuleName = `${baseFileName}.module.css`;
    
    const cssModuleFile = files.find(f => {
      const fPath = f.webkitRelativePath || f.name;
      return fPath.includes(cssModuleName);
    });
    
    if (cssModuleFile) {
      try {
        css += await cssModuleFile.text();
        console.log(`[DEBUG] Found CSS Module: ${cssModuleName}`);
      } catch (err) {
        console.error(`Erro ao ler CSS Module ${cssModuleName}`, err);
      }
    }
    
    // Buscar arquivo CSS global na mesma pasta
    const folder = pagePath.split(/[\/\\]/).slice(0, -1).join('/');
    const globalCssFile = files.find(f => {
      const fPath = f.webkitRelativePath || f.name;
      return fPath.startsWith(folder) && 
             f.name.endsWith('.css') && 
             !f.name.includes('.module.');
    });
    
    if (globalCssFile) {
      try {
        const globalCss = await globalCssFile.text();
        css += '\n\n' + globalCss;
        console.log(`[DEBUG] Found global CSS: ${globalCssFile.name}`);
      } catch (err) {
        console.error(`Erro ao ler CSS global ${globalCssFile.name}`, err);
      }
    }
    
    return css;
  };

  const handleFolderUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setImporting(true);
    setImportProgress('Iniciando importação...');
    
    // Lista de pastas/arquivos a serem ignorados
    const ignoredPaths = [
      'node_modules',
      '.next',
      'build',
      'dist',
      '.git',
      '.github',
      '.vscode',
      '.idea',
      'coverage',
      '.cache',
      'out',
      '.vercel',
      '.turbo',
      'public', // Geralmente contém apenas assets
      '.env',
      '.env.local',
      '.DS_Store',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml'
    ];
    
    // Filtrar arquivos que não estão em pastas ignoradas
    const filteredFiles = files.filter(file => {
      const path = file.webkitRelativePath || file.name;
      const pathLower = path.toLowerCase();
      
      // Verificar se o caminho contém alguma pasta ignorada
      for (const ignored of ignoredPaths) {
        if (pathLower.includes(`/${ignored}/`) || 
            pathLower.includes(`\\${ignored}\\`) ||
            pathLower.startsWith(`${ignored}/`) ||
            pathLower.startsWith(`${ignored}\\`) ||
            pathLower === ignored) {
          return false;
        }
      }
      return true;
    });
    
    console.log(`[DEBUG] Total files: ${files.length}, Filtered files: ${filteredFiles.length}`);
    setImportProgress(`Processando ${filteredFiles.length} arquivos...`);
    
    const pages = [];
    const componentMap = new Map(); // Store component files

    // First pass: Parse all component files
    for (const file of filteredFiles) {
      if ((file.name.endsWith('.js') || file.name.endsWith('.jsx') || file.name.endsWith('.tsx')) && 
          (file.webkitRelativePath.includes('/components/') || file.webkitRelativePath.includes('\\components\\'))) {
        try {
          const text = await file.text();
          const fileName = file.name.split('.')[0];
          componentMap.set(fileName, text);
          console.log(`[DEBUG] Cached component: ${fileName}`);
        } catch (err) {
          console.error(`Erro ao ler componente ${file.name}`, err);
        }
      }
    }

    // Second pass: Parse page files and merge component blocks
    for (const file of filteredFiles) {
      if (file.name.endsWith('.js') || file.name.endsWith('.jsx') || file.name.endsWith('.tsx')) {
        // Skip component files, only process pages
        if (file.webkitRelativePath.includes('/components/') || file.webkitRelativePath.includes('\\components\\')) {
          continue;
        }
        
        setImportProgress(`Lendo ${file.name}...`);
        
        try {
          const text = await file.text();
          
          // 1. Extrair CSS associado
          const css = await extractCSS(filteredFiles, file);
          
          // 2. Determinar nome da página
          const fileName = file.name.split('.')[0];
          const filePath = file.webkitRelativePath || file.name;
          
          let pageName = fileName;
          if (fileName === 'index' || fileName === 'page') {
            pageName = 'index';
          } else if (filePath.includes('/pages/index.') || filePath.includes('\\pages\\index.')) {
            pageName = 'index';
          } else if (filePath.includes('/app/page.') || filePath.includes('\\app\\page.')) {
            pageName = 'index';
          }

          // 3. Inlining de Componentes (Header, Footer, etc.)
          let inlinedHtml = text;
          let inlinedCss = css;
          
          // Regex para encontrar imports APENAS DE COMPONENTES LOCAIS (ignora bibliotecas)
          // Procura por: import X from './...' ou '../...'
          const importRegex = /import\s+(\w+)\s+from\s+['"](\.\.?\/.*?)['"]/g;
          let importMatch;
          
          while ((importMatch = importRegex.exec(text)) !== null) {
            const componentName = importMatch[1];
            const importPath = importMatch[2];
            
            // IMPORTANTE: Só processar se for caminho relativo (./ ou ../)
            // Isso ignora imports de node_modules como 'lucide-react', 'next/image', etc
            if (!importPath.startsWith('.')) {
              continue; // Pular bibliotecas externas
            }
            
            if (componentMap.has(componentName)) {
              console.log(`[DEBUG] Inlining component ${componentName} into ${pageName}`);
              const componentCode = componentMap.get(componentName);
              
              // Tentar extrair JSX do componente
              let componentJsx = null;
              const returnMatch = componentCode.match(/return\s*\(?([\s\S]*?)\)?;?\s*}/);
              if (returnMatch) componentJsx = returnMatch[1];
              else {
                const arrowMatch = componentCode.match(/=>\s*\(?([\s\S]*?)\)?;?\s*$/);
                if (arrowMatch) componentJsx = arrowMatch[1];
              }
              
              if (componentJsx) {
                // Limpar fragments
                componentJsx = componentJsx.replace(/<>\s*/g, '').replace(/<\/>\s*/g, '');
                
                // Substituir tag pelo JSX
                const tagRegex = new RegExp(`<${componentName}\\s*[^>]*?/>|<${componentName}\\s*[^>]*?>[\\s\\S]*?</${componentName}>`, 'g');
                
                // SEM COMENTÁRIOS (eles aparecem como texto laranja)
                const replacement = `<div data-component-source="${componentName}" style="display: contents;">${componentJsx}</div>`;
                
                inlinedHtml = inlinedHtml.replace(tagRegex, replacement);
                
                // Buscar CSS do componente
                const compFileName = importPath.split('/').pop();
                const compCssName = compFileName + '.module.css';
                const compCssFile = filteredFiles.find(f => f.name === compCssName || f.webkitRelativePath.includes(compCssName));
                
                if (compCssFile) {
                  try {
                    const compCss = await compCssFile.text();
                    inlinedCss += `\n/* CSS do Componente ${componentName} */\n${compCss}`;
                  } catch (e) {
                    console.error('Erro ao ler CSS do componente', e);
                  }
                }
              }
            }
          }
          
          // Remover componentes de ícones do Lucide React que não conseguimos renderizar
          // Eles aparecem como <ShoppingBag />, <ChevronLeft />, etc
          const lucideIcons = ['ShoppingBag', 'Menu', 'X', 'Search', 'User', 'ChevronLeft', 'ChevronRight', 
                               'Facebook', 'Instagram', 'Twitter', 'Mail', 'Phone', 'MapPin', 'Home', 
                               'Package', 'Truck', 'Shield', 'Star'];
          
          lucideIcons.forEach(iconName => {
            // Substituir por um placeholder de ícone ou simplesmente remover
            const iconRegex = new RegExp(`<${iconName}[^>]*?/>`, 'g');
            inlinedHtml = inlinedHtml.replace(iconRegex, `<span class="icon-placeholder">[${iconName}]</span>`);
          });

          // 4. Limpar JSX para HTML válido (Best Effort)
          // Isso é necessário porque o navegador não entende className={styles.foo}
          const cleanJsxToHtml = (jsx) => {
            let html = jsx;
            
            // 1. Converter className={styles.foo} -> class="foo"
            html = html.replace(/className=\{styles\.(\w+)\}/g, 'class="$1"');
            
            // 2. Converter className={styles['foo']} -> class="foo"
            html = html.replace(/className=\{styles\['(\w+)'\]\}/g, 'class="$1"');
            
            // 3. Converter className="foo" -> class="foo" (React usa className)
            html = html.replace(/className="([^"]+)"/g, 'class="$1"');
            
            // 4. Tentar lidar com template literals simples: className={`${styles.a} ${styles.b}`}
            // Isso é complexo com regex, mas vamos tentar um caso comum
            html = html.replace(/className=\{`([^`]+)`\}/g, (match, content) => {
              // Substituir ${styles.foo} por foo
              let classes = content.replace(/\$\{styles\.(\w+)\}/g, '$1');
              // Substituir ${styles['foo']} por foo
              classes = classes.replace(/\$\{styles\['(\w+)'\]\}/g, '$1');
              return `class="${classes}"`;
            });

            // 5. Remover eventos (onClick={...})
            html = html.replace(/on[A-Z]\w+=\{[^}]+\}/g, '');
            
            // 6. Remover style={{...}} simples (muito complexo para regex perfeito, mas ajuda)
            // html = html.replace(/style=\{\{([^}]+)\}\}/g, 'style="$1"'); // Arriscado transformar sintaxe de obj para string css

            return html;
          };

          inlinedHtml = cleanJsxToHtml(inlinedHtml);

          // 5. Gerar blocos a partir do HTML limpo
          const blocks = parseCodeToBlocks(inlinedHtml);

          // 5. Adicionar ou atualizar página na lista
          const existingPageIndex = pages.findIndex(p => p.name === pageName);
          
          if (existingPageIndex === -1) {
            console.log(`[DEBUG] Adding page: ${pageName} with ${blocks.length} blocks`);
            pages.push({
              name: pageName,
              slug: pageName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              content: blocks,
              rawHtml: inlinedHtml,
              rawCss: inlinedCss,
              componentCode: text
            });
          } else if (blocks.length > pages[existingPageIndex].content.length) {
            console.log(`[DEBUG] Updating page: ${pageName} with more blocks (${blocks.length})`);
            pages[existingPageIndex] = {
              ...pages[existingPageIndex],
              content: blocks,
              rawHtml: inlinedHtml,
              rawCss: inlinedCss,
              componentCode: text
            };
          }
        } catch (err) {
          console.error(`Erro ao processar arquivo ${file.name}`, err);
        }
      }
    }

    if (pages.length > 0) {
      setImportProgress('Salvando tema...');
      
      // Get folder name from first file path, with better fallback
      let folderName = 'Imported Theme';
      
      if (files[0].webkitRelativePath) {
        const pathParts = files[0].webkitRelativePath.split('/');
        if (pathParts.length > 0 && pathParts[0]) {
          folderName = pathParts[0];
        }
      }
      
      try {
        const payload = {
          name: folderName,
          type: 'theme',
          content: [], // Empty for themes
          pages: pages,
          isPublic: false
        };
        
        console.log('[DEBUG] Enviando payload:', JSON.stringify({
          ...payload,
          pages: payload.pages.map(p => ({
            name: p.name,
            hasRawHtml: !!p.rawHtml,
            rawHtmlLength: p.rawHtml?.length
          }))
        }, null, 2));

        await fetch('/api/templates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        setImportProgress(`Concluído! Tema "${folderName}" importado com ${pages.length} páginas.`);
      } catch (err) {
        console.error('Erro ao salvar tema', err);
        setImportProgress('Erro ao salvar tema.');
      }
    } else {
      setImportProgress('Nenhum arquivo válido encontrado.');
    }

    setTimeout(() => {
      setImporting(false);
      setIsImportModalOpen(false);
      fetchTemplates(); // Refresh list
    }, 1500);
  };

  console.log('[DEBUG] Templates component rendering, isImportModalOpen:', isImportModalOpen);
  
  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <div className={styles.header}>
        <h1>Templates</h1>
        <button 
          onClick={() => {
            console.log('[DEBUG] Import button clicked');
            setIsImportModalOpen(true);
          }} 
          className={styles.createButton}
          style={{ border: '2px solid red' }} // Debug: make sure it's visible
        >
          <Plus size={20} />
          Importar Pasta
        </button>
      </div>

      <div className={styles.grid}>
        {templates.map((template) => (
          <div 
            key={template._id} 
            className={styles.card}
          >
            <div className={styles.cardHeader}>
              <h3>{template.name}</h3>
              <span className={styles.type}>{template.type}</span>
            </div>
            {template.type === 'theme' && template.pages && (
              <p style={{ color: '#666', fontSize: '0.875rem', margin: '0.5rem 0' }}>
                {template.pages.length} página(s)
              </p>
            )}
            <div className={styles.actions}>
              <button
                onClick={() => {
                  if (template.type === 'theme' && template.pages && template.pages.length > 0) {
                    // Find home/index page
                    let homePageIndex = template.pages.findIndex(page => {
                      const name = page.name.toLowerCase();
                      const slug = page.slug.toLowerCase();
                      return name === 'index' || 
                             name === 'home' ||
                             name === 'homepage' ||
                             name === 'hero' ||
                             slug === 'index' ||
                             slug === 'home' ||
                             slug === 'homepage';
                    });
                    
                    // If not found, use first page
                    if (homePageIndex === -1) homePageIndex = 0;
                    
                    // For themes, edit the home/index page
                    localStorage.setItem('templateEditData', JSON.stringify({
                      templateId: template._id,
                      pageIndex: homePageIndex,
                      pageName: template.pages[homePageIndex].name,
                      blocks: template.pages[homePageIndex].content || []
                    }));
                    window.location.href = '/admin/editor/template-edit';
                  } else {
                    alert('Edição de templates simples em breve!');
                  }
                }}
                className={styles.actionButton}
              >
                <Edit size={18} />
                Editar
              </button>
              
              <Link 
                href={`/admin/demo-preview/${template._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionButton}
                style={{ background: '#10b981', color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Eye size={18} />
                Ver Tema
              </Link>
              
              <button
                onClick={(e) => handleDelete(e, template._id)}
                className={`${styles.actionButton} ${styles.delete}`}
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className={styles.modalOverlay} onClick={() => !importing && setIsImportModalOpen(false)}>
          <div className={styles.modalContent} style={{ height: 'auto', maxHeight: '80vh' }} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Importar Tema (Pasta)</h2>
              {!importing && (
                <button className={styles.closeButton} onClick={() => setIsImportModalOpen(false)}>
                  <X size={24} />
                </button>
              )}
            </div>
            <div className={styles.modalBody}>
              {importing ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p>{importProgress}</p>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p style={{ marginBottom: '1rem' }}>Selecione a pasta do seu projeto Next.js. Todos os arquivos serão importados como um único tema.</p>
                  <input 
                    type="file" 
                    webkitdirectory="" 
                    directory="" 
                    multiple 
                    onChange={handleFolderUpload}
                    style={{ padding: '1rem', border: '2px dashed #ccc', borderRadius: '0.5rem', width: '100%' }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewTemplate && (
        <div className={styles.modalOverlay} onClick={() => setPreviewTemplate(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Preview: {previewTemplate.name}</h2>
              <button className={styles.closeButton} onClick={() => setPreviewTemplate(null)}>
                <X size={24} />
              </button>
            </div>
            <div className={styles.modalBody}>
              {previewTemplate.type === 'theme' && previewTemplate.pages ? (
                <div>
                  <h3 style={{ marginBottom: '1rem' }}>Páginas do Tema:</h3>
                  {previewTemplate.pages.map((page, idx) => (
                    <div key={idx} style={{ marginBottom: '2rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                      <h4 style={{ marginBottom: '0.5rem' }}>{page.name}</h4>
                      {page.content && page.content.map((block) => (
                        <BlockRenderer key={block.id} block={block} readOnly={true} />
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {previewTemplate.content && previewTemplate.content.map((block) => (
                    <BlockRenderer key={block.id} block={block} readOnly={true} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
