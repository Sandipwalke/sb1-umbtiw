import React, { useState } from 'react';

const MortgageCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const calculateMortgage = () => {
    const p = parseFloat(principal);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;

    if (isNaN(p) || isNaN(r) || isNaN(n)) {
      alert('Please enter valid numbers for all fields');
      return;
    }

    const monthlyPaymentValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaymentValue = monthlyPaymentValue * n;
    const totalInterestValue = totalPaymentValue - p;

    setMonthlyPayment(monthlyPaymentValue);
    setTotalPayment(totalPaymentValue);
    setTotalInterest(totalInterestValue);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mortgage Calculator</h1>
      <div className="mb-4">
        <label className="block mb-2">Loan Amount ($):</label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Annual Interest Rate (%):</label>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Loan Term (years):</label>
        <input
          type="number"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={calculateMortgage}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Calculate Mortgage
      </button>
      {monthlyPayment !== null && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Results:</h2>
          <p>Monthly Payment: ${monthlyPayment.toFixed(2)}</p>
          <p>Total Payment: ${totalPayment?.toFixed(2)}</p>
          <p>Total Interest: ${totalInterest?.toFixed(2)}</p>
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">How it works:</h2>
        <ul className="list-disc pl-5">
          <li>Enter the loan amount (principal)</li>
          <li>Enter the annual interest rate (as a percentage)</li>
          <li>Enter the loan term in years</li>
          <li>Click "Calculate Mortgage" to see the results</li>
          <li>The calculator uses the standard mortgage payment formula</li>
        </ul>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Note: This calculator provides an estimate and does not account for property taxes,
          insurance, or other fees that may be part of your actual mortgage payment.
        </p>
      </div>
    </div>
  );
};

export default MortgageCalculator;