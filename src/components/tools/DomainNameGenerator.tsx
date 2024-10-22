import React, { useState } from 'react';

const DomainNameGenerator: React.FC = () => {
  const [keywords, setKeywords] = useState('');
  const [domains, setDomains] = useState<string[]>([]);

  const generateDomains = () => {
    const keywordList = keywords.split(',').map(k => k.trim().toLowerCase());
    const tlds = ['.com', '.net', '.org', '.io'];
    const prefixes = ['get', 'my', 'the', 'best', 'top'];
    const suffixes = ['app', 'site', 'hub', 'spot', 'zone'];

    const generatedDomains: string[] = [];

    keywordList.forEach(keyword => {
      // Basic combinations
      tlds.forEach(tld => {
        generatedDomains.push(`${keyword}${tld}`);
      });

      // Prefix combinations
      prefixes.forEach(prefix => {
        tlds.forEach(tld => {
          generatedDomains.push(`${prefix}${keyword}${tld}`);
        });
      });

      // Suffix combinations
      suffixes.forEach(suffix => {
        tlds.forEach(tld => {
          generatedDomains.push(`${keyword}${suffix}${tld}`);
        });
      });
    });

    setDomains(generatedDomains);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Domain Name Generator</h1>
      <div className="mb-4">
        <label className="block mb-2">Enter Keywords (comma-separated):</label>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="e.g., blog, tech, news"
        />
      </div>
      <button
        onClick={generateDomains}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Generate Domain Names
      </button>
      {domains.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Generated Domain Names:</h2>
          <ul className="list-disc pl-5">
            {domains.map((domain, index) => (
              <li key={index}>{domain}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">How it works:</h2>
        <ul className="list-disc pl-5">
          <li>Enter one or more keywords separated by commas</li>
          <li>The generator will create combinations using common TLDs, prefixes, and suffixes</li>
          <li>The generated domain names are suggestions and may not be available for registration</li>
          <li>Always check domain availability before making a purchase decision</li>
        </ul>
      </div>
    </div>
  );
};

export default DomainNameGenerator;