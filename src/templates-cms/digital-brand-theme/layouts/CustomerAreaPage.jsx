import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import { Download, Package, History, Settings } from 'lucide-react';

const CustomerAreaPage = ({ content }) => {
  return (
    <div className="digital-brand-theme">
      <Header content={content?.header} />
      <main style={{ paddingTop: '100px', paddingBottom: '100px', backgroundColor: '#F8FAFC' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <h1 style={{ fontFamily: 'Poppins', fontSize: '2.5rem', fontWeight: 700, marginBottom: '3rem' }}>Minha Área</h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem' }}>
            <aside>
              <nav style={{ backgroundColor: 'white', borderRadius: '20px', padding: '1rem', border: '1px solid #E5E7EB' }}>
                <button style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', background: '#F1F0FF', color: '#6C63FF', border: 'none', borderRadius: '12px', fontWeight: 600, textAlign: 'left', marginBottom: '0.5rem' }}>
                  <Package size={20} /> Meus Produtos
                </button>
                <button style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'none', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: 500, textAlign: 'left', marginBottom: '0.5rem' }}>
                  <History size={20} /> Histórico
                </button>
                <button style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'none', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: 500, textAlign: 'left' }}>
                  <Settings size={20} /> Perfil
                </button>
              </nav>
            </aside>

            <section>
              <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '2.5rem', border: '1px solid #E5E7EB' }}>
                <h2 style={{ fontFamily: 'Poppins', fontSize: '1.5rem', marginBottom: '2rem' }}>Downloads Disponíveis</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {[1, 2].map(i => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', border: '1px solid #F1F5F9', borderRadius: '16px' }}>
                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ width: '60px', height: '60px', background: '#F8FAFC', borderRadius: '12px' }}></div>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '1.125rem' }}>Produto Digital #{i}</h4>
                          <span style={{ fontSize: '0.875rem', color: '#64748B' }}>Adquirido em 12/12/2025</span>
                        </div>
                      </div>
                      <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#6C63FF', color: 'white', border: 'none', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
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
      <Footer content={content?.footer} />
    </div>
  );
};

export default CustomerAreaPage;
