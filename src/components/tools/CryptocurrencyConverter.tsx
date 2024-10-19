import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CryptocurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('bitcoin');
  const [toCurrency, setToCurrency] = useState<string>('usd');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [cryptoCurrencies, setCryptoCurrencies] = useState<Array<{id: string, symbol: string, name: string}>>([]);
  const [fiatCurrencies] = useState<string[]>(['usd', 'eur', 'gbp', 'jpy']); // Add more as needed
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchCryptoCurrencies();
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetchExchangeRate();
    }
  }, [fromCurrency, toCurrency]);

  const fetchCryptoCurrencies = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
      setCryptoCurrencies(response.data);
    } catch (error) {
      console.error('Error fetching cryptocurrencies:', error);
      setError('Failed to fetch cryptocurrencies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchExchangeRate = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency}&vs_currencies=${toCurrency}`);
      const rate = response.data[fromCurrency]?.[toCurrency];
      if (rate === undefined) {
        throw new Error('Exchange rate not available');
      }
      setExchangeRate(rate);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      setError('Failed to fetch exchange rate. Please try again.');
      setExchangeRate(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">Cryptocurrency Converter</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-blue-500 mb-4">Loading...</p>}
      <div className="mb-4">
        <label className="block mb-2">Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="w-full p-2 border rounded"
          min="0"
          step="any"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">From Currency:</label>
        <select
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          className="w-full p-2 border rounded"
        >
          {cryptoCurrencies.map((currency) => (
            <option key={currency.id} value={currency.id}>
              {currency.name} ({currency.symbol.toUpperCase()})
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">To Currency:</label>
        <select
          value={toCurrency}
          onChange={handleToCurrencyChange}
          className="w-full p-2 border rounded"
        >
          {fiatCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      {exchangeRate !== null && (
        <div className="mb-4">
          <p className="font-semibold">
            {amount} {fromCurrency} = {(amount * exchangeRate).toFixed(8)} {toCurrency.toUpperCase()}
          </p>
          <p className="text-sm text-gray-600">
            Exchange Rate: 1 {fromCurrency} = {exchangeRate.toFixed(8)} {toCurrency.toUpperCase()}
          </p>
        </div>
      )}
    </div>
  );
};

export default CryptocurrencyConverter;