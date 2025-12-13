'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, ShoppingBag, Settings, Layers, DownloadCloud, Plug } from 'lucide-react';
import styles from './Sidebar.module.css';
import { clsx } from 'clsx';
import { useAtom } from 'jotai';
import { languageAtom } from '@/atoms/languageAtom';
import { translations } from '@/locales/translations';

const menuItems = [
  { icon: LayoutDashboard, key: 'dashboard', href: '/admin' },
  { icon: DownloadCloud, key: 'store', href: '/admin/store' },
  { icon: Plug, key: 'plugins', href: '/admin/plugins' },
  { icon: Layers, key: 'templates', href: '/admin/templates' },
  { icon: Settings, key: 'settings', href: '/admin/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [language] = useAtom(languageAtom);
  const t = translations[language].sidebar;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>Atomic Builder</div>
      <nav className={styles.nav}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(styles.link, isActive && styles.active)}
            >
              <Icon size={20} />
              <span>{t[item.key]}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
