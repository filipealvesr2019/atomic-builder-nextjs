import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import { CreditCard, Lock } from 'lucide-react';

const CheckoutPage = ({ sections = {} }) => {
  return (
    <div className="digital-brand-theme">
      <Header {...(sections.header || {})} />
      <main style={{ paddingTop: '100px', paddingBottom: '100px', backgroundColor: '#F8FAFC' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
          <h1 style={{ 
            fontFamily: 'Poppins, sans-serif', 
            fontSize: '2.5rem', 
            fontWeight: 700, 
            color: '#0F172A',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Checkout
          </h1>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '3rem', 
            borderRadius: '24px', 
            border: '1px solid #E5E7EB',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'Poppins', fontSize: '1.25rem', marginBottom: '1.5rem' }}>Payment Information</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input type="email" placeholder="Your professional email" style={{ padding: '1rem', borderRadius: '10px', border: '1px solid #E5E7EB', outline: 'none' }} />
                <div style={{ position: 'relative' }}>
                  <input type="text" placeholder="Card number" style={{ padding: '1rem', paddingRight: '3rem', borderRadius: '10px', border: '1px solid #E5E7EB', width: '100%', outline: 'none' }} />
                  <CreditCard size={20} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input type="text" placeholder="MM/YY" style={{ padding: '1rem', borderRadius: '10px', border: '1px solid #E5E7EB', outline: 'none' }} />
                  <input type="text" placeholder="CVC" style={{ padding: '1rem', borderRadius: '10px', border: '1px solid #E5E7EB', outline: 'none' }} />
                </div>
              </div>
            </div>

            <button style={{ 
              width: '100%', 
              backgroundColor: '#22C55E', 
              color: 'white', 
              padding: '1.25rem', 
              borderRadius: '12px', 
              fontFamily: 'Inter', 
              fontWeight: 600, 
              fontSize: '1.125rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <Lock size={18} />
              Pay Now
            </button>
            <p style={{ textAlign: 'center', color: '#64748B', fontSize: '0.875rem', marginTop: '1.5rem' }}>
              100% secure payment processed by Stripe.
            </p>
          </div>
        </div>
      </main>
      <Footer {...(sections.footer || {})} />
    </div>
  );
};

export default CheckoutPage;
