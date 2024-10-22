import React, { useState } from 'react';

const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const time = parseFloat(loanTerm) * 12;

    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
      alert('Please enter valid numbers for all fields');
      return;
    }

    const x = Math.pow(1 + rate, time);
    const monthly = (principal * x * rate) / (x - 1);

    setMonthlyPayment(monthly);
    setTotalPayment(monthly * time);
    setTotalInterest((monthly * time) - principal);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Loan Calculator</h1>
      <div className="mb-4">
        <label className="block mb-2">Loan Amount ($):</label>
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
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
        onClick={calculateLoan}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Calculate Loan
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
          <li>Enter the loan amount</li>
          <li>Enter the annual interest rate (as a percentage)</li>
          <li>Enter the loan term in years</li>
          <li>Click "Calculate Loan" to see the results</li>
          <li>The calculator uses the standard loan payment formula</li>
        </ul>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Note: This calculator provides an estimate and does not account for fees,
          additional charges, or variable interest rates that may apply to your actual loan.
        </p>
      </div>
    </div>
  );
};

export default LoanCalculator;