'use client';

import { useAtom } from 'jotai';
import { languageAtom } from '@/atoms/languageAtom';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const [language, setLanguage] = useAtom(languageAtom);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt' : 'en');
  };

  return (
    <button 
      onClick={toggleLanguage} 
      className={styles.switcherButton}
      title={language === 'en' ? "Mudar para Português" : "Switch to English"}
    >
      {language === 'en' ? (
        // US Flag
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" className={styles.flagIcon}>
          <circle cx="30" cy="30" r="30" fill="#fff"/>
          <path fill="#bd3d44" d="M30,58c-15.5,0-28-12.5-28-28S14.5,2,30,2s28,12.5,28,28S45.5,58,30,58z"/>
          <path fill="#fff" d="M2,30c0,15.5,12.5,28,28,28s28-12.5,28-28S45.5,2,30,2S2,14.5,2,30z"/>
          <path fill="#192f5d" d="M2.6,26.4h28.8v-23C18.8,5.1,8.3,14,2.6,26.4z"/>
          <path fill="#bd3d44" d="M2,30c0,2.1,0.3,4.1,0.7,6.1h28.7v-6.1H2z"/>
          <path fill="#fff" d="M2.7,36.1c1.4,5.4,4.4,10.1,8.4,13.8h20.3v-13.8H2.7z"/>
          <path fill="#bd3d44" d="M49.4,5.5L49.4,5.5L49.4,5.5c-4-2.8-8.8-4.7-14-5.3v26.2h22.6C56.6,18.5,54.1,11.2,49.4,5.5z"/>
          <path fill="#fff" d="M58,30H35.4v6.1H58c0-2-0.3-4-0.7-6.1z"/>
          <path fill="#bd3d44" d="M57.3,36.1H35.4v13.8h11.7C52.1,47,55.8,42,57.3,36.1z"/>
        </svg>
      ) : (
        // Brazil Flag
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" className={styles.flagIcon}>
            <circle cx="30" cy="30" r="30" fill="#009c3b" />
            <path fill="#ffdf00" d="M30,9.5L52.5,30L30,50.5L7.5,30L30,9.5z" />
            <circle cx="30" cy="30" r="10.5" fill="#002776" />
            <path fill="none" stroke="#fff" strokeWidth="1" d="M22,32c3-3,8-3,16,0" />
        </svg>
      )}
    </button>
  );
}
