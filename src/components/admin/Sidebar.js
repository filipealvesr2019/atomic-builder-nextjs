'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, ShoppingBag, Settings, Layers } from 'lucide-react';
import styles from './Sidebar.module.css';
import { clsx } from 'clsx';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: FileText, label: 'Páginas', href: '/admin/pages' },
  { icon: Layers, label: 'Templates', href: '/admin/templates' },
  { icon: ShoppingBag, label: 'Produtos', href: '/admin/products' },
  { icon: Settings, label: 'Configurações', href: '/admin/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>CMS Nextjs</div>
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
