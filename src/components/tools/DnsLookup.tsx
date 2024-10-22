import React, { useState } from 'react';
import axios from 'axios';

interface DnsRecord {
  type: string;
  name: string;
  value: string;
  ttl: number;
}

const DnsLookup: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [dnsRecords, setDnsRecords] = useState<DnsRecord[]>([]);
  const [error, setError] = useState('');

  const performDnsLookup = async () => {
    setError('');
    setDnsRecords([]);

    if (!domain) {
      setError('Please enter a domain name');
      return;
    }

    try {
      const response = await axios.get(`https://dns.google/resolve?name=${domain}&type=ANY`);
      if (response.data.Answer) {
        const records = response.data.Answer.map((record: any) => ({
          type: record.type,
          name: record.name,
          value: record.data,
          ttl: record.TTL,
        }));
        setDnsRecords(records);
      } else {
        setError('No DNS records found for this domain');
      }
    } catch (err) {
      setError('Error performing DNS lookup. Please try again.');
      console.error('Error performing DNS lookup:', err);
    }
  };

  const getRecordTypeName = (type: number): string => {
    const types: { [key: number]: string } = {
      1: 'A',
      2: 'NS',
      5: 'CNAME',
      15: 'MX',
      16: 'TXT',
      28: 'AAAA',
    };
    return types[type] || `Type ${type}`;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">DNS Lookup</h1>
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
        onClick={performDnsLookup}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Perform DNS Lookup
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {dnsRecords.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">DNS Records:</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Type</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Value</th>
                <th className="border p-2">TTL</th>
              </tr>
            </thead>
            <tbody>
              {dnsRecords.map((record, index) => (
                <tr key={index} className="border">
                  <td className="border p-2">{getRecordTypeName(parseInt(record.type))}</td>
                  <td className="border p-2">{record.name}</td>
                  <td className="border p-2">{record.value}</td>
                  <td className="border p-2">{record.ttl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DnsLookup;