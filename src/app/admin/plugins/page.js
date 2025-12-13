'use client';

import React, { useState } from 'react';
import { Plug, Zap, BarChart, ShoppingBag, Mail, Settings, Check, Download, CreditCard } from 'lucide-react';
import styles from './plugins.module.css';
import { useAtom } from 'jotai';
import { languageAtom } from '@/atoms/languageAtom';
import { translations } from '@/locales/translations';

const MOCK_PLUGINS = [
  {
    id: 'ecommerce-core',
    name: 'E-commerce Core',
    description: 'Add products, cart, and checkout functionality to your site.',
    icon: ShoppingBag,
    version: '1.2.0',
    installed: true,
    author: 'Atomic Builder'
  },
  {
    id: 'seo-booster',
    name: 'SEO Booster',
    description: 'Optimize your pages for search engines with advanced meta tags and sitemaps.',
    icon: Zap,
    version: '2.0.1',
    installed: false,
    author: 'SEO Masters'
  },
  {
    id: 'analytics-pro',
    name: 'Analytics Pro',
    description: 'Track visitor behavior and get detailed insights directly in your dashboard.',
    icon: BarChart,
    version: '1.0.5',
    installed: false,
    author: 'Data Corp'
  },
  {
    id: 'form-builder',
    name: 'Form Builder',
    description: 'Create contact forms, surveys, and newsletters with drag-and-drop.',
    icon: Mail,
    version: '3.1.0',
    installed: false,
    author: 'Atomic Builder'
  },
  {
    id: 'stripe-payments',
    name: 'Stripe Payments',
    description: 'Accept credit card payments securely with Stripe Checkout integration.',
    icon: CreditCard,
    version: '1.0.0',
    installed: false,
    author: 'Stripe Inc'
  }
];

export default function PluginsPage() {
  const [plugins, setPlugins] = useState(MOCK_PLUGINS);
  const [language] = useAtom(languageAtom);
  const t = translations[language].plugins;

  const toggleInstall = (id) => {
    setPlugins(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, installed: !p.installed };
      }
      return p;
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className={styles.grid}>
        {plugins.map((plugin) => (
          <div key={plugin.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconWrapper} ${plugin.installed ? styles.activeIcon : ''}`}>
                <plugin.icon size={24} />
              </div>
              <div className={styles.headerText}>
                <h3>{t.items[plugin.id]?.name || plugin.name}</h3>
                <span className={styles.version}>v{plugin.version} • {plugin.author}</span>
              </div>
            </div>
            
            <p className={styles.description}>
              {t.items[plugin.id]?.description || plugin.description}
            </p>

            <div className={styles.actions}>
              {plugin.installed ? (
                <button 
                  onClick={() => toggleInstall(plugin.id)}
                  className={`${styles.button} ${styles.installed}`}
                >
                  <Check size={16} />
                  {t.installed}
                </button>
              ) : (
                <button 
                  onClick={() => toggleInstall(plugin.id)}
                  className={`${styles.button} ${styles.install}`}
                >
                  <Download size={16} />
                  {t.install}
                </button>
              )}
              
              <button className={styles.settingsButton}>
                <Settings size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
