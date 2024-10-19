import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import RealTimeCurrencyConverter from './tools/RealTimeCurrencyConverter';
import HistoricalCurrencyRates from './tools/HistoricalCurrencyRates';
import CryptocurrencyConverter from './tools/CryptocurrencyConverter';

const CurrencyConverter: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();

  let content;
  switch (currentPath) {
    case 'real-time-currency-converter':
      content = <RealTimeCurrencyConverter />;
      break;
    case 'historical-currency-rates':
      content = <HistoricalCurrencyRates />;
      break;
    case 'cryptocurrency-converter':
      content = <CryptocurrencyConverter />;
      break;
    default:
      content = <p>Please select a currency converter tool from the sidebar.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Currency Converter</h2>
      {content}
    </div>
  );
};

export default CurrencyConverter;