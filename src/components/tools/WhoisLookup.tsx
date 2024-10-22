import React, { useState } from 'react';
import axios from 'axios';

interface WhoisData {
  domainName: string;
  registrar: string;
  creationDate: string;
  expirationDate: string;
  nameServers: string[];
}

const WhoisLookup: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [whoisData, setWhoisData] = useState<WhoisData | null>(null);
  const [error, setError] = useState('');

  const performWhoisLookup = async () => {
    setError('');
    setWhoisData(null);

    if (!domain) {
      setError('Please enter a domain name');
      return;
    }

    try {
      // Note: This is a placeholder API call. You'll need to replace this with a real WHOIS API service.
      const response = await axios.get(`https://api.example.com/whois?domain=${domain}`);
      setWhoisData(response.data);
    } catch (err) {
      setError('Error performing WHOIS lookup. Please try again.');
      console.error('Error performing WHOIS lookup:', err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">WHOIS Lookup</h1>
      <div className="mb-4">
        <label className="block mb-2">Enter Domain Name:</label>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="example.com"
        />
      </div>
      <button
        onClick={performWhoisLookup}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Perform WHOIS Lookup
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {whoisData && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">WHOIS Information:</h2>
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border">
                <td className="font-bold p-2">Domain Name:</td>
                <td className="p-2">{whoisData.domainName}</td>
              </tr>
              <tr className="border">
                <td className="font-bold p-2">Registrar:</td>
                <td className="p-2">{whoisData.registrar}</td>
              </tr>
              <tr className="border">
                <td className="font-bold p-2">Creation Date:</td>
                <td className="p-2">{whoisData.creationDate}</td>
              </tr>
              <tr className="border">
                <td className="font-bold p-2">Expiration Date:</td>
                <td className="p-2">{whoisData.expirationDate}</td>
              </tr>
              <tr className="border">
                <td className="font-bold p-2">Name Servers:</td>
                <td className="p-2">{whoisData.nameServers.join(', ')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Note:</h2>
        <p>
          This is a simulated WHOIS lookup tool. In a real-world application, you would need to integrate
          with a WHOIS API service to fetch accurate and up-to-date domain registration information.
          Many WHOIS API services are available, both free and paid, with varying levels of detail and
          query limits.
        </p>
      </div>
    </div>
  );
};

export default WhoisLookup;