'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, ShoppingBag, Settings, Layers, DownloadCloud, Plug } from 'lucide-react';
import styles from './Sidebar.module.css';
import { clsx } from 'clsx';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: DownloadCloud, label: 'Store', href: '/admin/store' },
  { icon: Plug, label: 'Plugins', href: '/admin/plugins' },
  { icon: Layers, label: 'Templates', href: '/admin/templates' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

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
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
