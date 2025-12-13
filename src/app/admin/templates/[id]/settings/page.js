'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Store, Globe, Share2, Code, Save, Settings, Package, FileDown, Upload, Palette, Ruler, Image as ImageIcon, Plus } from 'lucide-react';
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
    googleAnalyticsId: 'UA-XXXXX-Y',
    // New Fields
    storeLogo: null,
    // Physical Defaults
    physicalName: '',
    physicalPrice: '',
    physicalDescription: '',
    physicalCategory: '',
    physicalSubcategory: '',
    physicalColors: '',
    physicalSizes: '',
    physicalCurrency: 'USD ($)',
    measurementUnit: '',
    // Digital Defaults
    digitalName: '',
    digitalPrice: '',
    digitalDescription: '',
    digitalCategory: '',
    digitalSubcategory: '',
    digitalColors: '',
    digitalSizes: '',
    digitalCurrency: 'USD ($)',
    digitalProductFile: null,
    digitalProductCover: null
  });

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    if (activeTab === 'digital') {
        if (!formData.digitalProductFile || !formData.digitalProductCover) {
             alert('Warning: Digital products require a ZIP file and a Cover image to be fully configured.');
        }
    }
    
    setTimeout(() => {
      setLoading(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
        setFormData(prev => ({
            ...prev,
            [name]: files[0]
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'store', label: 'Store', icon: Store },
    { id: 'physical', label: 'Physical Products', icon: Package },
    { id: 'digital', label: 'Digital Products', icon: FileDown },
    { id: 'social', label: 'Social Media', icon: Share2 },
    { id: 'seo', label: 'SEO & Analytics', icon: Globe },
    { id: 'advanced', label: 'Advanced', icon: Code },
  ];

  // Helper to render common product fields
  const renderCommonProductFields = (prefix) => (
    <>
      <div className={styles.formGroup}>
          <label className={styles.label}>Product Name</label>
          <input 
            type="text" 
            name={`${prefix}Name`}
            value={formData[`${prefix}Name`]}
            onChange={handleChange}
            className={styles.input} 
            placeholder="e.g. Handmade Chair"
          />
      </div>

      <div className={styles.formGroup}>
          <label className={styles.label}>Price</label>
          <input 
            type="number" 
            name={`${prefix}Price`}
            value={formData[`${prefix}Price`]}
            onChange={handleChange}
            className={styles.input} 
            placeholder="0.00"
          />
      </div>

      <div className={styles.formGroup}>
          <label className={styles.label}>Product Description</label>
          <textarea 
            name={`${prefix}Description`}
            value={formData[`${prefix}Description`]}
            onChange={handleChange}
            className={styles.textarea} 
            placeholder="Default product description..."
          />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
          <div className={styles.formGroup}>
              <label className={styles.label}>Category</label>
              <input 
                  type="text"
                  name={`${prefix}Category`}
                  value={formData[`${prefix}Category`]}
                  onChange={handleChange}
                  className={styles.input} 
                  placeholder="e.g. Furniture" 
              />
          </div>
          <div className={styles.formGroup}>
              <label className={styles.label}>Subcategory</label>
              <input 
                  type="text"
                  name={`${prefix}Subcategory`}
                  value={formData[`${prefix}Subcategory`]}
                  onChange={handleChange}
                  className={styles.input} 
                  placeholder="e.g. Chairs" 
              />
          </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
          <div className={styles.formGroup}>
              <label className={styles.label}>Available Colors</label>
              <div className="flex items-center gap-2">
                 <input 
                    type="text"
                    name={`${prefix}Colors`}
                    value={formData[`${prefix}Colors`]}
                    onChange={handleChange}
                    className={styles.input} 
                    placeholder="e.g. Red, Blue, Green" 
                 />
                 <Palette size={20} className="text-gray-400" />
              </div>
          </div>
          <div className={styles.formGroup}>
              <label className={styles.label}>Available Sizes</label>
              <div className="flex items-center gap-2">
                 <input 
                    type="text"
                    name={`${prefix}Sizes`}
                    value={formData[`${prefix}Sizes`]}
                    onChange={handleChange}
                    className={styles.input} 
                    placeholder="e.g. S, M, L, XL" 
                 />
                 <Ruler size={20} className="text-gray-400" />
              </div>
          </div>
      </div>
      
      {/* Mock for Photos related to Colors */}
      {/* Mock for Photos related to Colors */}
      <div className={styles.formGroup}>
          <label className={styles.label}>Color Variations & Photos</label>
          <div className={styles.variationsContainer}>
               <div className="flex flex-col gap-3">
                   <div className={styles.variantCard}>
                       <div className={styles.variantInfo}>
                           <div className={`${styles.colorPreview} bg-red-500`}></div>
                           <span className={styles.variantName}>Red Variant</span>
                       </div>
                       <div className={styles.variantPhotos}>
                           <div className={styles.photoSlot}>
                               <ImageIcon size={16} />
                           </div>
                           <div className={styles.photoSlot}>
                               <ImageIcon size={16} />
                           </div>
                           <button className={styles.addPhotoBtn}>
                               <Plus size={16} />
                           </button>
                       </div>
                   </div>
                    <div className="flex items-center justify-center mt-2">
                       <button className={styles.addVariantBtn}>
                           <Plus size={14} /> Add Color Variant
                       </button>
                   </div>
               </div>
          </div>
          <p className="text-xs text-gray-400 mt-1">Configure images for each specific color variant.</p>
      </div>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <>
            <div className={styles.sectionTitle}>General Settings</div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Template Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name} 
                onChange={handleChange}
                className={styles.input} 
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Description</label>
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
            <div className={styles.sectionTitle}>Store Information</div>
             <div className={styles.formGroup}>
              <label className={styles.label}>Store Logo</label>
              <div className="flex items-center gap-4">
                  <div className={styles.fileInputWrapper}>
                    <input 
                        type="file"
                        name="storeLogo"
                        accept="image/*"
                        onChange={handleChange}
                        className={styles.fileInput}
                    />
                    <div className={styles.fileInputButton}>
                        <Upload size={16} /> {formData.storeLogo ? 'Change Logo' : 'Upload Logo'}
                    </div>
                  </div>
                  {formData.storeLogo && <span className="text-sm text-green-600">Logo selected</span>}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Display Name</label>
              <input 
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Contact Email</label>
              <input 
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Phone / WhatsApp</label>
              <input 
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Address</label>
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
       case 'physical':
        return (
          <>
            <div className={styles.sectionTitle}>Physical Product Settings</div>
            
            {renderCommonProductFields('physical')}

            <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
                 <div className={styles.formGroup}>
                    <label className={styles.label}>Currency</label>
                    <select 
                        name="physicalCurrency"
                        value={formData.physicalCurrency}
                        onChange={handleChange}
                        className={styles.input}
                    >
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>BRL (R$)</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Measurement Unit</label>
                    <input 
                        type="text" 
                        name="measurementUnit"
                        value={formData.measurementUnit}
                        onChange={handleChange}
                        className={styles.input} 
                        placeholder="e.g. kg, lbs" 
                    />
                </div>
            </div>
            
            <div className="p-4 bg-blue-50 text-blue-800 rounded-md text-sm">
                <Package className="inline-block mr-2" size={16} />
                Physical products include shipping address fields at checkout.
            </div>
          </>
        );

       case 'digital':
        return (
            <>
                <div className={styles.sectionTitle}>Digital Product Settings</div>
                
                {renderCommonProductFields('digital')}

                 <div className="grid grid-cols-2 gap-4 mb-4 mt-4">
                     <div className={styles.formGroup}>
                        <label className={styles.label}>Currency</label>
                        <select 
                            name="digitalCurrency"
                            value={formData.digitalCurrency}
                            onChange={handleChange}
                            className={styles.input}
                        >
                            <option>USD ($)</option>
                            <option>EUR (€)</option>
                            <option>BRL (R$)</option>
                        </select>
                    </div>
                 </div>

                <div className={styles.digitalSection}>
                    <h4 className="font-medium mb-4 flex items-center gap-2 text-blue-600">
                        <FileDown size={18} /> Global Digital Assets
                    </h4>
                    
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Default Product File (ZIP)</label>
                        <div className={styles.fileInputWrapper}>
                            <input 
                                type="file" 
                                name="digitalProductFile"
                                accept=".zip,.rar,.7z"
                                onChange={handleChange}
                                className={styles.fileInput}
                            />
                                <div className={styles.fileInputButton}>
                                <Upload size={16} /> {formData.digitalProductFile ? formData.digitalProductFile.name : 'Upload ZIP File'}
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Default file if none provided per product.</p>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Default Cover Image</label>
                            <div className={styles.fileInputWrapper}>
                            <input 
                                type="file" 
                                name="digitalProductCover"
                                accept="image/*"
                                onChange={handleChange}
                                className={styles.fileInput}
                            />
                                <div className={styles.fileInputButton}>
                                <Upload size={16} /> {formData.digitalProductCover ? formData.digitalProductCover.name : 'Upload Cover'}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
      case 'social':
        return (
          <>
            <div className={styles.sectionTitle}>Social Media</div>
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
            <div className={styles.sectionTitle}>Advanced Settings</div>
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
        <ArrowLeft size={16} /> Back to Templates
      </Link>

      <div className={styles.header}>
        <h1 className={styles.title}>
          <Settings size={32} />
          Theme Settings
        </h1>
        <p className={styles.subtitle}>Manage your store information and preferences.</p>
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
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
