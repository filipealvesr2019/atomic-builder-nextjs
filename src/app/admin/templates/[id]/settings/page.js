'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Store, Globe, Share2, Code, Save, Settings } from 'lucide-react';
import styles from './settings.module.css';

export default function TemplateSettings({ params }) {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const templateId = params.id;

  const [formData, setFormData] = useState({
    name: 'Rustic Store',
    description: 'A beautiful theme for handmade furniture stores.',
    storeName: 'Rustic Store',
    contactEmail: 'contact@rusticstore.com',
    phoneNumber: '(11) 9999-9999',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    facebook: 'https://facebook.com/rusticstore',
    instagram: 'https://instagram.com/rusticstore',
    customCSS: '/* Add your custom CSS here */\n.header { background: red; }',
    googleAnalyticsId: 'UA-XXXXX-Y'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Configurações salvas com sucesso!');
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const tabs = [
    { id: 'general', label: 'Geral', icon: Settings },
    { id: 'store', label: 'Loja', icon: Store },
    { id: 'social', label: 'Redes Sociais', icon: Share2 },
    { id: 'seo', label: 'SEO & Analytics', icon: Globe },
    { id: 'advanced', label: 'Avançado', icon: Code },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <>
            <div className={styles.sectionTitle}>Configurações Gerais</div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Nome do Template</label>
              <input 
                type="text" 
                name="name"
                value={formData.name} 
                onChange={handleChange}
                className={styles.input} 
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Descrição</label>
              <textarea 
                name="description"
                value={formData.description} 
                onChange={handleChange}
                className={styles.textarea} 
              />
            </div>
          </>
        );
      case 'store':
        return (
          <>
            <div className={styles.sectionTitle}>Dados da Loja</div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Nome Exibido</label>
              <input 
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>E-mail de Contato</label>
              <input 
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Telefone / WhatsApp</label>
              <input 
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Endereço Completo</label>
              <input 
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </>
        );
      case 'social':
        return (
          <>
            <div className={styles.sectionTitle}>Redes Sociais</div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Facebook URL</label>
              <input 
                type="url"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                className={styles.input}
                placeholder="https://facebook.com/..."
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Instagram URL</label>
              <input 
                type="url"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className={styles.input}
                placeholder="https://instagram.com/..."
              />
            </div>
          </>
        );
      case 'seo':
        return (
          <>
            <div className={styles.sectionTitle}>SEO & Analytics</div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Google Analytics ID</label>
              <input 
                type="text"
                name="googleAnalyticsId"
                value={formData.googleAnalyticsId}
                onChange={handleChange}
                className={styles.input}
                placeholder="UA-XXXXX-Y"
              />
            </div>
          </>
        );
      case 'advanced':
        return (
          <>
            <div className={styles.sectionTitle}>Configurações Avançadas</div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Custom CSS</label>
              <textarea 
                name="customCSS"
                value={formData.customCSS}
                onChange={handleChange}
                className={styles.textarea}
                style={{ fontFamily: 'monospace', minHeight: '300px' }}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/admin/templates" className={styles.backLink}>
        <ArrowLeft size={16} /> Voltar para Templates
      </Link>

      <div className={styles.header}>
        <h1 className={styles.title}>
          <Settings size={32} />
          Configurações do Tema
        </h1>
        <p className={styles.subtitle}>Gerencie as informações e preferências da sua loja.</p>
      </div>

      <div className={styles.contentWrapper}>
        {/* Sidebar */}
        <div className={styles.tabs}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
              >
                <Icon className={styles.tabIcon} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className={styles.tabContent}>
          <form onSubmit={handleSave}>
            {renderContent()}
            
            <div className={styles.saveBar}>
              <button type="submit" className={styles.saveButton} disabled={loading}>
                <Save size={18} />
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
