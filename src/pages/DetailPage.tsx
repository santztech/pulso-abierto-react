import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCryptoPrices, CryptoApiResponse } from '../services/cryptoService';
// 1. Importamos el store de Zustand
import { useFavoriteStore } from '../store/useFavoriteStore';

export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const [cryptoData, setCryptoData] = useState<CryptoApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // 2. Traemos la lista de favoritos y la función para agregar/quitar
  const favorites = useFavoriteStore((state) => state.favorites);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  useEffect(() => {
    getCryptoPrices()
      .then((data) => {
        setCryptoData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="container" style={{ padding: '2rem' }}>Cargando detalle...</div>;

  const validCryptos = ['bitcoin', 'ethereum', 'solana'];
  if (!id || !validCryptos.includes(id) || !cryptoData) {
    return (
      <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>
        <h2>Recurso no encontrado</h2>
        <p>La criptomoneda solicitada no existe o el identificador es inválido.</p>
        <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem', textDecoration: 'none' }}>Volver al inicio</Link>
      </div>
    );
  }

  const price = cryptoData[id].usd;
  
  // 3. Verificamos si la moneda actual está guardada en favoritos
  const isFavorite = favorites.includes(id);

  return (
    <main className="container main-content" style={{ maxWidth: '600px' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ textTransform: 'capitalize', color: '#2563eb', margin: 0 }}>Detalle de: {id}</h2>
          
          {/* 4. Botón de estrella para favoritos */}
          <button
            onClick={() => toggleFavorite(id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '2rem',
              color: isFavorite ? '#fbbf24' : '#cbd5e1', // Amarillo si es favorito, gris si no
              padding: 0
            }}
            title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>

        <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Precio actual en el mercado: <strong>${price.toLocaleString('en-US')} USD</strong></p>
        <Link to="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>&larr; Volver al listado</Link>
      </div>
    </main>
  );
}