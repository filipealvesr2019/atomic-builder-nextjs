'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import templates from '@/templates-cms/registry';
import { DownloadCloud, Eye, Check } from 'lucide-react';
import styles from './store.module.css';
import { useAtom } from 'jotai';
import { languageAtom } from '@/atoms/languageAtom';
import { translations } from '@/locales/translations';

export default function TemplateStore() {
  const router = useRouter();
  const [installing, setInstalling] = useState(null);
  const [language] = useAtom(languageAtom);
  const t = translations[language].store;

  const availableTemplates = Object.entries(templates).map(([key, config]) => ({
    id: key,
    ...config
  }));

  const handleInstall = async (templateId) => {
    setInstalling(templateId);
    const templateConfig = templates[templateId];

    try {
      const res = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${templateConfig.name} (Installed)`,
          type: 'theme',
          templateId: templateId,
          content: [], // Theme usually handles content
          sections: {},
          isPublic: false
        }),
      });

      if (res.ok) {
        const newTemplate = await res.json();
        // Redirect to editor
        router.push(`/admin/editor/${newTemplate._id}`);
      }
    } catch (error) {
      console.error('Failed to install template', error);
      setInstalling(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className={styles.grid}>
        {availableTemplates.map((template) => (
          <div key={template.id} className={styles.card}>
            {/* Preview Image Placeholder */}
            <div className={styles.cardPreview}>
                <div className={styles.previewPlaceholder}>
                    <span>{template.name} {t.preview}</span>
                </div>
            </div>

            <div className={styles.cardBody}>
              <h3>{template.name}</h3>
              <p className={styles.description}>Perfect for {template.name.toLowerCase()} websites. Fully customizable.</p>
              
              <div className={styles.actions}>
                <a 
                    href={`/admin/store/preview/${template.id}`} 
                    target="_blank" 
                    className={styles.previewButton}
                >
                    <Eye size={16} />
                    {t.liveDemo}
                </a>
                
                <button 
                  onClick={() => handleInstall(template.id)}
                  disabled={installing === template.id}
                  className={styles.installButton}
                >
                  {installing === template.id ? t.installing : (
                    <>
                        <DownloadCloud size={16} />
                        {t.install}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
