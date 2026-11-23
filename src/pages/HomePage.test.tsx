import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from './HomePage';
import * as cryptoService from '../services/cryptoService';

// Mockeamos el servicio para controlar cómo responde la API en las pruebas
vi.mock('../services/cryptoService', () => ({
  getCryptoPrices: vi.fn(),
}));

describe('Componente HomePage - Estados de Carga y Error', () => {
  it('debe mostrar el mensaje de carga al iniciar la petición', () => {
    vi.mocked(cryptoService.getCryptoPrices).mockImplementation(() => new Promise(() => {}));

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Usamos toBeDefined() que es estándar y TypeScript lo acepta perfectamente
    expect(screen.getByText(/Cargando información del mercado/i)).toBeDefined();
  });

  it('debe mostrar un mensaje de error si la petición a la API falla', async () => {
    vi.mocked(cryptoService.getCryptoPrices).mockRejectedValue(new Error('Error de conexión'));

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const mensajeError = await screen.findByText(/No se pudo completar la solicitud/i);
    expect(mensajeError).toBeDefined();
  });
});