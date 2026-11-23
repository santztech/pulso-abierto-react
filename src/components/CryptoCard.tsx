import { Link } from 'react-router-dom';
// 1. Importamos el store de Zustand
import { useFavoriteStore } from '../store/useFavoriteStore';

interface CryptoCardProps {
  id: string;
  name: string;
  price: number;
}

export function CryptoCard({ id, name, price }: CryptoCardProps) {
  // 2. Traemos la lista de favoritos y la función para agregar/quitar
  const favorites = useFavoriteStore((state) => state.favorites);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  // 3. Verificamos si la moneda actual está guardada en favoritos
  const isFavorite = favorites.includes(id);

  return (
    <article className="crypto-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>{name}</h3>
        
        {/* 4. Botón de estrella para favoritos */}
        <button
          onClick={() => toggleFavorite(id)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
            color: isFavorite ? '#fbbf24' : '#cbd5e1', // Amarillo si es favorito, gris si no
            padding: 0
          }}
          title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      
      <div className="crypto-price" style={{ marginTop: '0.5rem' }}>
        ${price.toLocaleString('en-US')} USD
      </div>
      
      <Link to={`/criptomonedas/${id}`} className="btn-detail" style={{ display: 'inline-block', marginTop: '1rem', color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>
        Ver detalle &rarr;
      </Link>
    </article>
  );
}