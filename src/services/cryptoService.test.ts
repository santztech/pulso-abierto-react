import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCryptoPrices } from './cryptoService';

globalThis.fetch = vi.fn() as any;

describe('Servicio de Criptomonedas (cryptoService)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe procesar una respuesta HTTP exitosa y devolver los datos', async () => {
    const mockData = { bitcoin: { usd: 50000 } };
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await getCryptoPrices();
    expect(data).toEqual(mockData);
  });

  it('debe lanzar un error cuando la respuesta tiene ok: false', async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(getCryptoPrices()).rejects.toThrow('Error HTTP: 404 (Not Found)');
  });
});