'use client';

import { UserButton } from '@clerk/nextjs';
import LanguageSwitcher from './LanguageSwitcher';
import styles from '@/app/admin/admin.module.css';

export default function AdminHeader() {
  return (
    <div className={styles.header}>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <LanguageSwitcher />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
