import AdminHeader from '@/components/admin/AdminHeader';
import Sidebar from '@/components/admin/Sidebar';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <AdminHeader />
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
