import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="container main-content" style={{ textAlign: 'center', padding: '4rem 0' }}>
      <h2>404 - Página no encontrada</h2>
      <p style={{ margin: '1rem 0', color: '#64748b' }}>La dirección a la que intentas acceder no existe.</p>
      <Link to="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Regresar al inicio</Link>
    </main>
  );
}