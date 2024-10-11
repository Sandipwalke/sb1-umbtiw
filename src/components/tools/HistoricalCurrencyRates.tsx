import React, { useState } from 'react';
import axios from 'axios';

const HistoricalCurrencyRates: React.FC = () => {
  const [baseCurrency, setBaseCurrency] = useState<string>('USD');
  const [targetCurrency, setTargetCurrency] = useState<string>('EUR');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [historicalRates, setHistoricalRates] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchHistoricalRates = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(
        `https://api.exchangerate.host/timeseries?base=${baseCurrency}&symbols=${targetCurrency}&start_date=${startDate}&end_date=${endDate}`
      );
      if (response.data && response.data.rates) {
        setHistoricalRates(response.data.rates);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching historical rates:', error);
      setError('Failed to fetch historical rates. Please try again later.');
      setHistoricalRates(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchHistoricalRates();
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">Historical Currency Rates</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block mb-2">Base Currency:</label>
          <input
            type="text"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Target Currency:</label>
          <input
            type="text"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch Historical Rates'}
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-blue-500 mb-4">Loading...</p>}
      {historicalRates && (
        <div>
          <h4 className="text-lg font-semibold mb-2">Historical Rates:</h4>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(historicalRates).map(([date, rates]: [string, any]) => (
                <tr key={date}>
                  <td className="border p-2">{date}</td>
                  <td className="border p-2">{rates[targetCurrency]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoricalCurrencyRates;