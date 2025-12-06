'use client';

import React, { useState } from 'react';
import { Plug, Zap, BarChart, ShoppingBag, Mail, Settings, Check, Download } from 'lucide-react';
import styles from './plugins.module.css';

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
  }
];

export default function PluginsPage() {
  const [plugins, setPlugins] = useState(MOCK_PLUGINS);

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
        <h1>Plugins</h1>
        <p>Extend the functionality of your site with powerful plugins.</p>
      </div>

      <div className={styles.grid}>
        {plugins.map((plugin) => (
          <div key={plugin.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconWrapper} ${plugin.installed ? styles.activeIcon : ''}`}>
                <plugin.icon size={24} />
              </div>
              <div className={styles.headerText}>
                <h3>{plugin.name}</h3>
                <span className={styles.version}>v{plugin.version} • {plugin.author}</span>
              </div>
            </div>
            
            <p className={styles.description}>
              {plugin.description}
            </p>

            <div className={styles.actions}>
              {plugin.installed ? (
                <button 
                  onClick={() => toggleInstall(plugin.id)}
                  className={`${styles.button} ${styles.installed}`}
                >
                  <Check size={16} />
                  Installed
                </button>
              ) : (
                <button 
                  onClick={() => toggleInstall(plugin.id)}
                  className={`${styles.button} ${styles.install}`}
                >
                  <Download size={16} />
                  Install
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
