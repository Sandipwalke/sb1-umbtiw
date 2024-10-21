import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

const QrBarcodeTool: React.FC = () => {
  useEffect(() => {
    console.log('QrBarcodeTool component mounted');
  }, []);

  const tools = [
    { name: 'QR Code Generator', path: 'qr-code-generator' },
    { name: 'Barcode Generator', path: 'barcode-generator' },
    { name: 'QR Code Decoder', path: 'qr-code-decoder' },
    { name: 'Barcode Scanner', path: 'barcode-scanner' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">QR Code & Barcode Tools</h2>
      <ul className="list-disc pl-5 mb-4">
        {tools.map(tool => (
          <li key={tool.path} className="mb-2">
            <Link to={tool.path} className="text-blue-500 hover:underline">
              {tool.name}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};

export default QrBarcodeTool;