'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Store, Globe, Share2, Code, Save, Settings, Package, FileDown, Upload, Palette, Ruler, Image as ImageIcon, Plus, X, Inbox } from 'lucide-react';
import styles from './settings.module.css';

export default function TemplateSettings({ params }) {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('physical'); // 'physical' | 'digital'
  const [currentProduct, setCurrentProduct] = useState({});

  // Product Lists State
  const [physicalProducts, setPhysicalProducts] = useState([]);
  const [digitalProducts, setDigitalProducts] = useState([]);

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
    storeLogo: null,
    // Global Settings for Physical
    physicalCurrency: 'USD ($)',
    measurementUnit: '',
    // Global Settings for Digital
    digitalCurrency: 'USD ($)',
  });

  const handleOpenModal = (type) => {
    setModalType(type);
    setCurrentProduct({}); // Reset form
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProductChange = (e) => {
      const { name, value, files } = e.target;
      if (files) {
          setCurrentProduct(prev => ({ ...prev, [name]: files[0] }));
      } else {
          setCurrentProduct(prev => ({ ...prev, [name]: value }));
      }
  };

  const handleSaveProduct = (e) => {
      e.preventDefault();
      // Simple validation mock
      if (!currentProduct.name || !currentProduct.price) {
          alert('Please fill Name and Price');
          return;
      }

      if (modalType === 'physical') {
          setPhysicalProducts([...physicalProducts, { ...currentProduct, id: Date.now() }]);
      } else {
          if (!currentProduct.digitalProductFile || !currentProduct.digitalProductCover) {
             alert('Warning: Digital products require a ZIP file and a Cover image.');
             // Proceeding for demo
          }
           setDigitalProducts([...digitalProducts, { ...currentProduct, id: Date.now() }]);
      }
      setIsModalOpen(false);
  };

  const handleSaveGlobal = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Global settings saved successfully!');
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
        setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
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

  const renderProductModal = () => {
      if (!isModalOpen) return null;

      // Determine fields based on modalType
      // Re-using logic similar to previous renderCommonProductFields but targeting currentProduct state
      return (
          <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                  <div className={styles.modalHeader}>
                      <h2 className={styles.modalTitle}>
                          {modalType === 'physical' ? 'Add Physical Product' : 'Add Digital Product'}
                      </h2>
                      <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                          <X size={24} />
                      </button>
                  </div>
                  
                  <div className={styles.modalBody}>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                           <div className={styles.formGroup}>
                                <label className={styles.label}>Product Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={currentProduct.name || ''}
                                    onChange={handleProductChange}
                                    className={styles.input} 
                                    placeholder="e.g. Handmade Chair"
                                />
                            </div>
                           <div className={styles.formGroup}>
                                <label className={styles.label}>Currency</label>
                                <select 
                                    name="currency"
                                    value={currentProduct.currency || 'USD ($)'}
                                    onChange={handleProductChange}
                                    className={styles.input}
                                >
                                    <option>USD ($)</option>
                                    <option>EUR (€)</option>
                                    <option>BRL (R$)</option>
                                </select>
                            </div>
                       </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className={styles.formGroup}>
                              <label className={styles.label}>Price</label>
                              <input 
                                type="number" 
                                name="price"
                                value={currentProduct.price || ''}
                                onChange={handleProductChange}
                                className={styles.input} 
                                placeholder="0.00"
                              />
                          </div>
                           {modalType === 'physical' && (
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Measurement Unit</label>
                                    <input 
                                        type="text" 
                                        name="measurementUnit"
                                        value={currentProduct.measurementUnit || ''}
                                        onChange={handleProductChange}
                                        className={styles.input} 
                                        placeholder="e.g. kg, lbs" 
                                    />
                                </div>
                           )}
                      </div>

                      <div className={styles.formGroup}>
                          <label className={styles.label}>Product Description</label>
                          <textarea 
                            name="description"
                            value={currentProduct.description || ''}
                            onChange={handleProductChange}
                            className={styles.textarea} 
                            placeholder="Product details..."
                          />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className={styles.formGroup}>
                              <label className={styles.label}>Category</label>
                              <input 
                                  type="text"
                                  name="category"
                                  value={currentProduct.category || ''}
                                  onChange={handleProductChange}
                                  className={styles.input} 
                                  placeholder="e.g. Furniture" 
                              />
                          </div>
                          <div className={styles.formGroup}>
                              <label className={styles.label}>Subcategory</label>
                              <input 
                                  type="text"
                                  name="subcategory"
                                  value={currentProduct.subcategory || ''}
                                  onChange={handleProductChange}
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
                                    name="colors"
                                    value={currentProduct.colors || ''}
                                    onChange={handleProductChange}
                                    className={styles.input} 
                                    placeholder="e.g. Red, Blue" 
                                 />
                                 <Palette size={20} className="text-gray-400" />
                              </div>
                          </div>
                          <div className={styles.formGroup}>
                              <label className={styles.label}>Available Sizes</label>
                              <div className="flex items-center gap-2">
                                 <input 
                                    type="text"
                                    name="sizes"
                                    value={currentProduct.sizes || ''}
                                    onChange={handleProductChange}
                                    className={styles.input} 
                                    placeholder="e.g. S, M, L" 
                                 />
                                 <Ruler size={20} className="text-gray-400" />
                              </div>
                          </div>
                      </div>

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
                                            <div className={styles.photoSlot}><ImageIcon size={16} /></div>
                                            <button className={styles.addPhotoBtn}><Plus size={16} /></button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center mt-2">
                                        <button className={styles.addVariantBtn} type="button">
                                            <Plus size={14} /> Add Color Variant
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                      {modalType === 'digital' && (
                           <div className={styles.digitalSection}>
                                <h4 className="font-medium mb-4 flex items-center gap-2 text-blue-600">
                                    <FileDown size={18} /> Digital Assets
                                </h4>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Product File (ZIP)</label>
                                    <div className={styles.fileInputWrapper}>
                                        <input type="file" name="digitalProductFile" className={styles.fileInput} onChange={handleProductChange} />
                                        <div className={styles.fileInputButton}>
                                            <Upload size={16} /> {currentProduct.digitalProductFile ? currentProduct.digitalProductFile.name : 'Upload ZIP'}
                                        </div>
                                    </div>
                                </div>
                                 <div className={styles.formGroup}>
                                    <label className={styles.label}>Cover Image</label>
                                    <div className={styles.fileInputWrapper}>
                                        <input type="file" name="digitalProductCover" className={styles.fileInput} onChange={handleProductChange} />
                                        <div className={styles.fileInputButton}>
                                            <Upload size={16} /> {currentProduct.digitalProductCover ? currentProduct.digitalProductCover.name : 'Upload Cover'}
                                        </div>
                                    </div>
                                </div>
                           </div>
                      )}

                  </div>
                  
                  <div className={styles.modalFooter}>
                      <button onClick={handleCloseModal} className={styles.cancelButton} type="button">Cancel</button>
                      <button onClick={handleSaveProduct} className={styles.addProductBtn}>Save Product</button>
                  </div>
              </div>
          </div>
      );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <>
            <div className={styles.sectionTitle}>General Settings</div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Template Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className={styles.textarea} />
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
                    <input type="file" name="storeLogo" accept="image/*" onChange={handleChange} className={styles.fileInput} />
                    <div className={styles.fileInputButton}>
                        <Upload size={16} /> {formData.storeLogo ? 'Change Logo' : 'Upload Logo'}
                    </div>
                  </div>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Display Name</label>
              <input type="text" name="storeName" value={formData.storeName} onChange={handleChange} className={styles.input} />
            </div>
          </>
        );
       case 'physical':
        return (
          <>
            <div className={styles.sectionTitle}>Physical Product Management</div>
            
            {/* Product List */}
            <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-700">Registered Products</h3>
            </div>

            {physicalProducts.length === 0 ? (
                <div className={styles.emptyState}>
                    <Inbox className={styles.emptyIcon} size={48} />
                    <div className={styles.emptyText}>No products registered</div>
                    <button className={styles.addProductBtn} onClick={() => handleOpenModal('physical')} type="button">
                        <Plus size={18} /> Add New Product
                    </button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {physicalProducts.map(p => (
                        <div key={p.id} className={styles.variantCard}>
                            <span className={styles.variantName}>{p.name}</span>
                            <span className="text-gray-500">{p.currency || '$'} {p.price}</span>
                        </div>
                    ))}
                    <button className={styles.addProductBtn} onClick={() => handleOpenModal('physical')} type="button">
                         <Plus size={18} /> Add Another Product
                    </button>
                </div>
            )}
          </>
        );

       case 'digital':
        return (
            <>
                <div className={styles.sectionTitle}>Digital Product Management</div>
                
                {/* Product List */}
                <div className="mb-4 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-700">Registered Products</h3>
                </div>

                {digitalProducts.length === 0 ? (
                    <div className={styles.emptyState}>
                        <Inbox className={styles.emptyIcon} size={48} />
                        <div className={styles.emptyText}>No products registered</div>
                        <button className={styles.addProductBtn} onClick={() => handleOpenModal('digital')} type="button">
                            <Plus size={18} /> Add New Product
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {digitalProducts.map(p => (
                            <div key={p.id} className={styles.variantCard}>
                                <div className="flex flex-col">
                                    <span className={styles.variantName}>{p.name}</span>
                                    <span className="text-xs text-gray-400">{p.category}</span>
                                </div>
                                <span className="text-gray-500">{p.currency || '$'} {p.price}</span>
                            </div>
                        ))}
                         <button className={styles.addProductBtn} onClick={() => handleOpenModal('digital')} type="button">
                            <Plus size={18} /> Add Another Product
                        </button>
                    </div>
                )}
            </>
        );
      default:
        // Render other steps (social, seo, advanced) simply
        return null; // Placeholder for brevity in this snippet
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Theme Settings</h1>
      </div>

      <div className={styles.contentWrapper}>
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
        <div className={styles.tabContent}>
          <form onSubmit={handleSaveGlobal}>
            {renderContent()}
            {activeTab !== 'physical' && activeTab !== 'digital' && (
                 <div className={styles.saveBar}>
                    <button type="submit" className={styles.saveButton} disabled={loading}>
                        <Save size={18} /> {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                 </div>
            )}
          </form>
        </div>
      </div>
      {renderProductModal()}
    </div>
  );
}
