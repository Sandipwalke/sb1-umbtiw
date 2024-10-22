import React, { useState } from 'react';

const EmailValidator: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateEmail = () => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(email));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Email Validator</h1>
      <div className="mb-4">
        <label className="block mb-2">Enter Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="example@example.com"
        />
      </div>
      <button
        onClick={validateEmail}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Validate Email
      </button>
      {isValid !== null && (
        <div className="mt-4">
          <p className={`font-bold ${isValid ? 'text-green-500' : 'text-red-500'}`}>
            {isValid ? 'Valid Email' : 'Invalid Email'}
          </p>
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Email Validation Rules:</h2>
        <ul className="list-disc pl-5">
          <li>Must contain an @ symbol</li>
          <li>Must have a domain name (e.g., example.com)</li>
          <li>No spaces allowed</li>
          <li>Must have at least one character before and after the @ symbol</li>
        </ul>
        <p className="mt-4">
          Note: This is a basic validation. For production use, consider using more comprehensive validation methods or libraries.
        </p>
      </div>
    </div>
  );
};

export default EmailValidator;