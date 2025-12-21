import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import { Download, Package, Clock, User } from 'lucide-react';

const CustomerAreaPage = ({ sections = {} }) => {
  return (
    <div className="digital-brand-theme">
      <Header {...(sections.header || {})} />
      <main style={{ paddingTop: '100px', paddingBottom: '100px', backgroundColor: '#F8FAFC' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
            <aside>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'white', border: '1px solid #E5E7EB', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, color: '#6C63FF' }}>
                  <Package size={20} /> My Products
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'transparent', border: 'none', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', fontWeight: 500, color: '#64748B' }}>
                  <Clock size={20} /> History
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'transparent', border: 'none', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', fontWeight: 500, color: '#64748B' }}>
                  <User size={20} /> Profile
                </button>
              </nav>
            </aside>

            <section>
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #E5E7EB' }}>
                <h2 style={{ fontFamily: 'Poppins', fontSize: '1.5rem', marginBottom: '2rem' }}>My Products</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[1, 2].map((id) => (
                    <div key={id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', border: '1px solid #F1F5F9', borderRadius: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '60px', height: '60px', background: '#F8FAFC', borderRadius: '12px' }}></div>
                        <div>
                          <h4 style={{ margin: 0, fontWeight: 600 }}>Next.js SaaS Starter</h4>
                          <span style={{ fontSize: '0.875rem', color: '#64748B' }}>Purchased on May 12, 2024</span>
                        </div>
                      </div>
                      <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#F1F5F9', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}>
                        <Download size={18} /> Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer {...(sections.footer || {})} />
    </div>
  );
};

export default CustomerAreaPage;
