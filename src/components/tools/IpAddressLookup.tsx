import React, { useState } from 'react';
import axios from 'axios';

interface IpInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}

const IpAddressLookup: React.FC = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [error, setError] = useState('');

  const lookupIp = async () => {
    setError('');
    setIpInfo(null);

    if (!ipAddress) {
      setError('Please enter an IP address');
      return;
    }

    try {
      const response = await axios.get(`https://ipinfo.io/${ipAddress}/json`);
      setIpInfo(response.data);
    } catch (err) {
      setError('Error looking up IP address. Please try again.');
      console.error('Error looking up IP:', err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">IP Address Lookup</h1>
      <div className="mb-4">
        <label className="block mb-2">Enter IP Address:</label>
        <input
          type="text"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="e.g., 8.8.8.8"
        />
      </div>
      <button
        onClick={lookupIp}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Lookup IP
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {ipInfo && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">IP Information:</h2>
          <ul className="bg-gray-100 p-4 rounded">
            <li><strong>IP:</strong> {ipInfo.ip}</li>
            <li><strong>City:</strong> {ipInfo.city}</li>
            <li><strong>Region:</strong> {ipInfo.region}</li>
            <li><strong>Country:</strong> {ipInfo.country}</li>
            <li><strong>Location:</strong> {ipInfo.loc}</li>
            <li><strong>Organization:</strong> {ipInfo.org}</li>
            <li><strong>Postal:</strong> {ipInfo.postal}</li>
            <li><strong>Timezone:</strong> {ipInfo.timezone}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default IpAddressLookup;