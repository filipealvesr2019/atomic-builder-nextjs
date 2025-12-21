'use client';

import React, { useState, useEffect } from 'react';
import { Plug, Zap, BarChart, ShoppingBag, Mail, Settings, Check, Download, CreditCard, X } from 'lucide-react';
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
  const [plugins] = useState(MOCK_PLUGINS);
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlugin, setSelectedPlugin] = useState(null);
  const [selectedSiteId, setSelectedSiteId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  
  const [language] = useAtom(languageAtom);
  const t = translations[language].plugins;

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const res = await fetch('/api/templates');
      if (res.ok) {
        const data = await res.json();
        // Templates with type 'theme' are considered sites/stores
        setSites(data.filter(s => s.type === 'theme'));
      }
    } catch (error) {
      console.error('Failed to fetch sites', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInstallClick = (plugin) => {
    setSelectedPlugin(plugin);
    setIsModalOpen(true);
  };

  const handlePluginToggle = async (siteId, action) => {
    setUpdating(siteId);
    const site = sites.find(s => s._id === siteId);
    let updatedPlugins = [...(site.plugins || [])];
    
    if (action === 'install') {
      if (!updatedPlugins.find(p => p.id === selectedPlugin.id)) {
        updatedPlugins.push({ id: selectedPlugin.id, installedAt: new Date() });
      }
    } else {
      updatedPlugins = updatedPlugins.filter(p => p.id !== selectedPlugin.id);
    }

    try {
      const res = await fetch(`/api/templates/${siteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plugins: updatedPlugins }),
      });

      if (res.ok) {
        await fetchSites();
      } else {
        const error = await res.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      console.error('Failed to update plugins', error);
      alert('Failed to update plugins');
    } finally {
      setUpdating(false);
    }
  };

  const isPluginInstalledOnAnySite = (pluginId) => {
    return sites.some(site => site.plugins?.some(p => p.id === pluginId));
  };

  const getInstalledSites = (pluginId) => {
    return sites.filter(site => site.plugins?.some(p => p.id === pluginId));
  };

  if (loading) return <div className={styles.container}>{translations[language].templates.loading}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className={styles.grid}>
        {plugins.map((plugin) => {
          const installedOn = getInstalledSites(plugin.id);
          const isInstalled = installedOn.length > 0;
          
          return (
            <div key={plugin.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={`${styles.iconWrapper} ${isInstalled ? styles.activeIcon : ''}`}>
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

              {isInstalled && (
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '0.25rem' }}>
                    {language === 'pt' ? 'Instalado em:' : 'Installed on:'}
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {installedOn.map(s => (
                      <span key={s._id} style={{ 
                        fontSize: '0.7rem', 
                        background: '#f3f4f6', 
                        padding: '0.2rem 0.6rem', 
                        borderRadius: '0.5rem',
                        border: '1px solid #e5e7eb',
                        fontWeight: '500'
                      }}>
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.actions}>
                <button 
                  onClick={() => handleInstallClick(plugin)}
                  className={`${styles.button} ${isInstalled ? styles.installed : styles.install}`}
                >
                  <Settings size={16} />
                  {language === 'pt' ? 'Gerenciar' : 'Manage'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manage Plugin Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => !updating && setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{language === 'pt' ? 'Gerenciar Plugin' : 'Manage Plugin'}</h2>
              {!updating && (
                <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                  <X size={24} />
                </button>
              )}
            </div>
            <div className={styles.modalBody}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>
                  {t.items[selectedPlugin?.id]?.name || selectedPlugin?.name}
                </h3>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                  {language === 'pt' 
                    ? 'Instale ou remova este plugin dos seus sites abaixo.'
                    : 'Install or remove this plugin from your sites below.'}
                </p>
              </div>
              
              <div className={styles.siteList}>
                {sites.length === 0 ? (
                  <p>{language === 'pt' ? 'Nenhum site encontrado.' : 'No sites found.'}</p>
                ) : (
                  sites.map((site) => {
                    const alreadyInstalled = site.plugins?.some(p => p.id === selectedPlugin?.id);
                    const isUpdatingThisSite = updating === site._id;

                    return (
                      <div 
                        key={site._id} 
                        className={styles.siteItem}
                        style={{ cursor: 'default' }}
                      >
                        <div className={styles.siteInfo}>
                          <h4>{site.name}</h4>
                          <p>{site.url || site.templateId}</p>
                        </div>
                        
                        <div>
                          {alreadyInstalled ? (
                            <button
                              onClick={() => handlePluginToggle(site._id, 'uninstall')}
                              disabled={!!updating}
                              className={styles.button}
                              style={{ 
                                background: '#fee2e2', 
                                color: '#dc2626', 
                                border: '1px solid #fecaca',
                                padding: '0.4rem 0.8rem',
                                fontSize: '0.8rem'
                              }}
                            >
                              {isUpdatingThisSite ? '...' : (language === 'pt' ? 'Remover' : 'Remove')}
                            </button>
                          ) : (
                            <button
                              onClick={() => handlePluginToggle(site._id, 'install')}
                              disabled={!!updating}
                              className={styles.button}
                              style={{ 
                                background: '#dcfce7', 
                                color: '#16a34a', 
                                border: '1px solid #bbf7d0',
                                padding: '0.4rem 0.8rem',
                                fontSize: '0.8rem'
                              }}
                            >
                              {isUpdatingThisSite ? '...' : (language === 'pt' ? 'Instalar' : 'Install')}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button 
                className={styles.confirmButton} 
                onClick={() => setIsModalOpen(false)}
                disabled={!!updating}
              >
                {language === 'pt' ? 'Concluir' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
