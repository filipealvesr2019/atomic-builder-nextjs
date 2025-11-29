import { UserButton } from '@clerk/nextjs';
import Sidebar from '@/components/admin/Sidebar';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <header className={styles.header}>
          <UserButton afterSignOutUrl="/" />
        </header>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
