'use client';

import React from 'react';
import { HelpCircle, Mail, MessageSquare, ExternalLink } from 'lucide-react';
import styles from '../admin.module.css'; // Reusing admin styles or use a new one
import { useAtom } from 'jotai';
import { languageAtom } from '@/atoms/languageAtom';
import { translations } from '@/locales/translations';

export default function SupportPage() {
  const [language] = useAtom(languageAtom);
  const t = translations[language].sidebar.support;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <HelpCircle size={32} color="#2563eb" />
          {t}
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1.1rem', marginTop: '0.5rem' }}>
          {language === 'pt' ? 'Precisa de ajuda? Estamos aqui para você.' : 'Need help? We are here for you.'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '1rem', background: 'white' }}>
          <div style={{ width: '3rem', height: '3rem', background: '#eff6ff', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyItems: 'center', color: '#2563eb', marginBottom: '1rem', justifyContent: 'center' }}>
            <Mail size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            {language === 'pt' ? 'Suporte por E-mail' : 'Email Support'}
          </h3>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            {language === 'pt' ? 'Envie suas dúvidas e responderemos em até 24h úteis.' : 'Send your questions and we will respond within 24 business hours.'}
          </p>
          <a href="mailto:suporte@atomicbuilder.com" style={{ color: '#2563eb', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}>
            suporte@atomicbuilder.com
            <ExternalLink size={14} />
          </a>
        </div>

        <div style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '1rem', background: 'white' }}>
          <div style={{ width: '3rem', height: '3rem', background: '#f0fdf4', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyItems: 'center', color: '#16a34a', marginBottom: '1rem', justifyContent: 'center' }}>
            <MessageSquare size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            {language === 'pt' ? 'Chat ao Vivo' : 'Live Chat'}
          </h3>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            {language === 'pt' ? 'Disponível de segunda a sexta, das 9h às 18h.' : 'Available Monday to Friday, from 9 AM to 6 PM.'}
          </p>
          <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '0.5rem', fontWeight: '600', cursor: 'pointer' }}>
            {language === 'pt' ? 'Iniciar Chat' : 'Start Chat'}
          </button>
        </div>
      </div>
    </div>
  );
}
