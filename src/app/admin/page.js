import styles from './admin.module.css';

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3>Total de Páginas</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>12</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3>Produtos Ativos</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>45</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3>Vendas Hoje</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>R$ 1.250,00</p>
        </div>
      </div>
    </div>
  );
}
