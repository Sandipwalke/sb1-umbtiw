import React, { useState } from 'react';
import moment from 'moment';

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [referenceDate, setReferenceDate] = useState(moment().format('YYYY-MM-DD'));
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!birthDate) {
      alert('Please enter a birth date');
      return;
    }

    const birth = moment(birthDate);
    const reference = moment(referenceDate);

    if (birth.isAfter(reference)) {
      alert('Birth date cannot be in the future');
      return;
    }

    const years = reference.diff(birth, 'years');
    birth.add(years, 'years');

    const months = reference.diff(birth, 'months');
    birth.add(months, 'months');

    const days = reference.diff(birth, 'days');

    setAge({ years, months, days });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Age Calculator</h1>
      <div className="mb-4">
        <label className="block mb-2">Birth Date:</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Reference Date:</label>
        <input
          type="date"
          value={referenceDate}
          onChange={(e) => setReferenceDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={calculateAge}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Calculate Age
      </button>
      {age && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Calculated Age:</h2>
          <p className="text-lg">
            {age.years} years, {age.months} months, and {age.days} days
          </p>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;