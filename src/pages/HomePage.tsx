import { useState, useEffect } from 'react';
import { z } from 'zod';
import { getCryptoPrices, CryptoApiResponse } from '../services/cryptoService';
import { CryptoCard } from '../components/CryptoCard';
import { StatusMessage } from '../components/StatusMessage';

// Esquema de validación con Zod (Consigna 5)
const filterSchema = z.object({
  searchText: z.string().trim().min(2, 'El término de búsqueda debe tener al menos 2 caracteres.'),
  selectedCrypto: z.enum(['all', 'bitcoin', 'ethereum', 'solana'], {
    errorMap: () => ({ message: 'Debe seleccionar una opción válida del listado.' }),
  }),
});

export function HomePage() {
  const [cryptoData, setCryptoData] = useState<CryptoApiResponse | null>(null);
  const [status, setStatus] = useState<'initial' | 'loading' | 'success' | 'error'>('initial');
  const [errorMessage, setErrorMessage] = useState('');

  // Estados del formulario controlado
  const [searchText, setSearchText] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('all');
  const [formErrors, setFormErrors] = useState<{ searchText?: string; selectedCrypto?: string }>({});

  const loadData = async () => {
    setStatus('loading');
    setErrorMessage('');
    try {
      const data = await getCryptoPrices();
      setCryptoData(data);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage('No se pudo completar la solicitud. Verifique su conexión e intente nuevamente.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Manejo del formulario controlado y validación con Zod
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = filterSchema.safeParse({ searchText, selectedCrypto });

    if (!result.success) {
      const errors = result.error.format();
      setFormErrors({
        searchText: errors.searchText?._errors[0],
        selectedCrypto: errors.selectedCrypto?._errors[0],
      });
      return;
    }

    setFormErrors({});
  };

  // Datos derivados (Consigna 3)
  const cryptosList = cryptoData
    ? [
        { id: 'bitcoin', name: 'Bitcoin', price: cryptoData.bitcoin.usd },
        { id: 'ethereum', name: 'Ethereum', price: cryptoData.ethereum.usd },
        { id: 'solana', name: 'Solana', price: cryptoData.solana.usd },
      ]
    : [];

  const filteredCryptos = cryptosList.filter((crypto) => {
    const matchesSearch = crypto.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesSelect = selectedCrypto === 'all' || crypto.id === selectedCrypto;
    return matchesSearch && matchesSelect;
  });

  // Función auxiliar para mejorar la legibilidad y mantenibilidad
  const getStatusMessage = () => {
    if (status === 'loading') return 'Cargando información del mercado...';
    if (status === 'success') return 'Datos actualizados correctamente.';
    if (status === 'error') return errorMessage;
    return 'Estado inicial.';
  };

  return (
    <main className="container main-content">
      <section className="control-section">
        <h2>Panel de Control y Filtrado</h2>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <div style={{ width: '100%', maxWidth: '400px', textAlign: 'left' }}>
            <label htmlFor="searchText" style={{ display: 'block', fontWeight: 500, marginBottom: '0.3rem' }}>
              Buscar criptomoneda:
            </label>
            <input
              id="searchText"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Ej. Bit..."
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
            {formErrors.searchText && <span style={{ color: '#991b1b', fontSize: '0.85rem' }}>{formErrors.searchText}</span>}
          </div>

          <div style={{ width: '100%', maxWidth: '400px', textAlign: 'left' }}>
            <label htmlFor="selectedCrypto" style={{ display: 'block', fontWeight: 500, marginBottom: '0.3rem' }}>
              Filtrar por opción:
            </label>
            <select
              id="selectedCrypto"
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            >
              <option value="all">Todas las opciones</option>
              <option value="bitcoin">Bitcoin</option>
              <option value="ethereum">Ethereum</option>
              <option value="solana">Solana</option>
            </select>
            {formErrors.selectedCrypto && <span style={{ color: '#991b1b', fontSize: '0.85rem' }}>{formErrors.selectedCrypto}</span>}
          </div>

          <button type="submit" className="btn-primary">Aplicar Filtro</button>
        </form>
      </section>

      <section className="status-section">
        <StatusMessage
          status={status}
          message={getStatusMessage()}
          onRetry={loadData}
        />
      </section>

      <section className="results-section">
        <h2>Resultados del Mercado ({filteredCryptos.length})</h2>
        {status === 'success' && filteredCryptos.length === 0 && (
          <p style={{ textAlign: 'center', color: '#64748b' }}>No se encontraron resultados para los filtros aplicados.</p>
        )}
        <div className="crypto-grid">
          {filteredCryptos.map((crypto) => (
            <CryptoCard key={crypto.id} id={crypto.id} name={crypto.name} price={crypto.price} />
          ))}
        </div>
      </section>
    </main>
  );
}