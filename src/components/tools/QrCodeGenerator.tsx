import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('QRCodeGenerator component mounted');
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">QR Code Generator</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL"
        className="w-full p-2 border rounded mb-4"
      />
      {text && (
        <div className="flex justify-center">
          <QRCodeSVG value={text} size={256} />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;