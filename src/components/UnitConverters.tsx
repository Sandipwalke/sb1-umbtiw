import React from 'react';
import { Route, Routes, useLocation, Outlet } from 'react-router-dom';
import LengthConverter from './tools/LengthConverter';
import WeightConverter from './tools/WeightConverter';
import TemperatureConverter from './tools/TemperatureConverter';
import VolumeConverter from './tools/VolumeConverter';
import AreaConverter from './tools/AreaConverter';
import SpeedConverter from './tools/SpeedConverter';
import TimeConverter from './tools/TimeConverter';
import PressureConverter from './tools/PressureConverter';
import FuelEfficiencyConverter from './tools/FuelEfficiencyConverter';
import EnergyConverter from './tools/EnergyConverter';
import DataStorageConverter from './tools/DataStorageConverter';
import RealTimeCurrencyConverter from './tools/RealTimeCurrencyConverter';
import HistoricalCurrencyRates from './tools/HistoricalCurrencyRates';
import CryptocurrencyConverter from './tools/CryptocurrencyConverter';

const UnitConverters: React.FC = () => {
  const location = useLocation();
  const currentTool = location.pathname.split('/').pop() || '';

  const getConverterTitle = (path: string) => {
    return path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {currentTool ? getConverterTitle(currentTool) : 'Unit Converters'}
      </h2>
      <div className="w-full">
        <Routes>
          <Route path="length-converter" element={<LengthConverter />} />
          <Route path="weight-converter" element={<WeightConverter />} />
          <Route path="temperature-converter" element={<TemperatureConverter />} />
          <Route path="volume-converter" element={<VolumeConverter />} />
          <Route path="area-converter" element={<AreaConverter />} />
          <Route path="speed-converter" element={<SpeedConverter />} />
          <Route path="time-converter" element={<TimeConverter />} />
          <Route path="pressure-converter" element={<PressureConverter />} />
          <Route path="fuel-efficiency-converter" element={<FuelEfficiencyConverter />} />
          <Route path="energy-converter" element={<EnergyConverter />} />
          <Route path="data-storage-converter" element={<DataStorageConverter />} />
          <Route path="currency-converter" element={<Outlet />}>
            <Route path="real-time-currency-converter" element={<RealTimeCurrencyConverter />} />
            <Route path="historical-currency-rates" element={<HistoricalCurrencyRates />} />
            <Route path="cryptocurrency-converter" element={<CryptocurrencyConverter />} />
          </Route>
          <Route path="*" element={<p>Please select a converter from the sidebar.</p>} />
        </Routes>
      </div>
    </div>
  );
};

export default UnitConverters;