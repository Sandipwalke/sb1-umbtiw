import React, { useState } from 'react';

const TaxCalculator: React.FC = () => {
  const [income, setIncome] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [taxAmount, setTaxAmount] = useState<number | null>(null);
  const [netIncome, setNetIncome] = useState<number | null>(null);

  const calculateTax = () => {
    const incomeValue = parseFloat(income);
    const rateValue = parseFloat(taxRate);

    if (isNaN(incomeValue) || isNaN(rateValue)) {
      alert('Please enter valid numbers for income and tax rate');
      return;
    }

    const calculatedTax = (incomeValue * rateValue) / 100;
    const calculatedNetIncome = incomeValue - calculatedTax;

    setTaxAmount(calculatedTax);
    setNetIncome(calculatedNetIncome);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tax Calculator</h1>
      <div className="mb-4">
        <label className="block mb-2">Annual Income ($):</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Tax Rate (%):</label>
        <input
          type="number"
          value={taxRate}
          onChange={(e) => setTaxRate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={calculateTax}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Calculate Tax
      </button>
      {taxAmount !== null && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Results:</h2>
          <p>Tax Amount: ${taxAmount.toFixed(2)}</p>
          <p>Net Income: ${netIncome?.toFixed(2)}</p>
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">How it works:</h2>
        <ul className="list-disc pl-5">
          <li>Enter your annual income</li>
          <li>Enter the tax rate as a percentage</li>
          <li>Click "Calculate Tax" to see the results</li>
          <li>The calculator applies a flat tax rate to your income</li>
        </ul>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Note: This is a simplified tax calculator and does not account for progressive tax brackets,
          deductions, credits, or other complexities of actual tax systems. For accurate tax calculations,
          please consult a tax professional or refer to your local tax authority.
        </p>
      </div>
    </div>
  );
};

export default TaxCalculator;