const API_KEY = process.env.NEXT_PUBLIC_CRYPTO_PANIC_API_KEY;
const BASE_URL = 'https://cryptopanic.com/api/v1';

const suggestion_de_requetes = [
    'BTC',      // Bitcoin
    'ETH',      // Ethereum
    'XRP',      // Ripple
    'DOGE',     // Dogecoin ( Elon 🐶)
    'ADA',      // Cardano
    'SOL',      // Solana
    'USDT',     // Tether
    'USDC',     // USD Coin
    'BNB',      // Binance Coin
    'LINK',     // Chainlink
    'MATIC',    // Polygon
    'DOT',      // Polkadot
    'LTC',      // Litecoin
    'TRX',      // TRON
    'AVAX'      // Avalanche
];

export const getsuggestion_de_requetes = (query) => {
    if (!query) return [];
    return suggestion_de_requetes.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
    );
};

export const searchCryptoNews = async (query) => {
    try {
        const response = await fetch(`/API/crypto?q=${query}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        return [];
    }
};