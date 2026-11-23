export interface CryptoDetail {
  usd: number;
}

export interface CryptoApiResponse {
  bitcoin: CryptoDetail;
  ethereum: CryptoDetail;
  solana: CryptoDetail;
  [key: string]: CryptoDetail;
}

const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd';

// Variable para rastrear si ya hay una solicitud en curso (Estrategia de comprobación)
let currentRequest: Promise<CryptoApiResponse> | null = null;

export async function getCryptoPrices(): Promise<CryptoApiResponse> {
  // Si ya existe una petición ejecutándose, retornamos esa misma para evitar duplicados
  if (currentRequest) {
    return currentRequest;
  }

  // Si no hay ninguna, iniciamos una nueva y la guardamos en la variable
  currentRequest = fetch(API_URL)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} (${response.statusText})`);
      }
      const data: CryptoApiResponse = await response.json();
      return data;
    })
    .finally(() => {
      // Sin importar si falla o tiene éxito, limpiamos la variable al terminar
      currentRequest = null;
    });

  return currentRequest;
}