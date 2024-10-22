import React, { useState } from 'react';
import axios from 'axios';

const UrlShortener: React.FC = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const shortenUrl = async () => {
    setError('');
    setShortUrl('');

    if (!longUrl) {
      setError('Please enter a URL');
      return;
    }

    try {
      const response = await axios.post('https://api-ssl.bitly.com/v4/shorten', {
        long_url: longUrl,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_BITLY_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      setShortUrl(response.data.link);
    } catch (error) {
      setError('Error shortening URL. Please try again.');
      console.error('Error shortening URL:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
      <div className="mb-4">
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={shortenUrl}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Shorten URL
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {shortUrl && (
        <div className="mt-4">
          <p className="font-bold">Shortened URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;