import React, { useState, useEffect } from 'react';
import QrScanner from 'qr-scanner';

const QRCodeDecoder: React.FC = () => {
  const [result, setResult] = useState('');

  useEffect(() => {
    console.log('QRCodeDecoder component mounted');
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const result = await QrScanner.scanImage(file);
        setResult(result);
      } catch (error) {
        console.error('QR code scanning failed:', error);
        setResult('Failed to scan QR code');
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">QR Code Decoder</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="mb-4"
      />
      {result && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Result:</h3>
          <p className="mt-2">{result}</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeDecoder;