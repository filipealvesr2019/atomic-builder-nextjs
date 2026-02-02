'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import templates from '@/templates-cms/registry';
import { translations } from '@/locales/translations';
import { useAtom } from 'jotai';
import { languageAtom } from '@/atoms/languageAtom';
import { DownloadCloud, Eye, ArrowLeft, CheckCircle2, Target, Layout } from 'lucide-react';
import styles from './details.module.css';

export default function TemplateDetails() {
    const { templateId } = useParams();
    const router = useRouter();
    const [language] = useAtom(languageAtom);
    const t = translations[language].store;
    const common = translations[language].common;
    const [installing, setInstalling] = useState(false);

    const template = templates[templateId];

    if (!template) {
        return (
            <div className={styles.errorContainer}>
                <h1>Template not found</h1>
                <button onClick={() => router.push('/admin/store')} className={styles.backButton}>
                    <ArrowLeft size={20} />
                    Back to Store
                </button>
            </div>
        );
    }

    // Fallback metadata if not present in translations
    const metadata = t.items?.[templateId] || {
        name: template.name,
        description: 'A premium template designed for high performance and conversion.',
        target: 'Businesses and professionals looking for a modern online presence.',
        features: ['Fully Responsive', 'SEO Optimized', 'Customizable Sections', 'Interactive Elements']
    };

    const handleInstall = async () => {
        setInstalling(true);
        try {
            const res = await fetch('/api/templates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${template.name} (Installed)`,
                    type: 'theme',
                    templateId: templateId,
                    content: [],
                    sections: {},
                    isPublic: false
                }),
            });

            if (res.ok) {
                const newTemplate = await res.json();
                router.push(`/admin/editor/${newTemplate._id}`);
            }
        } catch (error) {
            console.error('Failed to install template', error);
            setInstalling(false);
        }
    };

    return (
        <div className={styles.container}>
            <button onClick={() => router.back()} className={styles.backButton}>
                <ArrowLeft size={20} />
                {translations[language].common?.back || 'Back'}
            </button>

            <div className={styles.mainLayout}>
                <div className={styles.previewSection}>
                    <div className={styles.browserToolbar}>
                        <div className={styles.dots}>
                            <span className={styles.dotRed}></span>
                            <span className={styles.dotYellow}></span>
                            <span className={styles.dotGreen}></span>
                        </div>
                        <div className={styles.addressBar}>
                            {template.name.toLowerCase().replace(/\s+/g, '-')}.atomic.io
                        </div>
                    </div>
                    <div className={styles.iframeWrapper}>
                        <iframe
                            src={`/iframe-preview/${templateId}`}
                            title={`${template.name} Preview`}
                            className={styles.previewIframe}
                        />
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <h1 className={styles.title}>{metadata.name}</h1>
                    <p className={styles.description}>{metadata.description}</p>

                    <div className={styles.metaGrid}>
                        <div className={styles.metaItem}>
                            <h3>
                                <Target size={20} />
                                {language === 'pt' ? 'Para quem é?' : 'Who is it for?'}
                            </h3>
                            <p>{metadata.target}</p>
                        </div>

                        <div className={styles.metaItem}>
                            <h3>
                                <Layout size={20} />
                                {language === 'pt' ? 'Recursos Principais' : 'Key Features'}
                            </h3>
                            <ul className={styles.featuresList}>
                                {metadata.features?.map((feature, index) => (
                                    <li key={index}>
                                        <CheckCircle2 size={16} className={styles.checkIcon} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button
                            onClick={handleInstall}
                            disabled={installing}
                            className={styles.installButton}
                        >
                            {installing ? t.installing : (
                                <>
                                    <DownloadCloud size={20} />
                                    {t.install}
                                </>
                            )}
                        </button>

                        <a
                            href={`/iframe-preview/${templateId}`}
                            target="_blank"
                            className={styles.demoButton}
                        >
                            <Eye size={20} />
                            {t.liveDemo}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
