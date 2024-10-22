import React, { useState, useRef, useEffect } from 'react';
import Quagga from 'quagga';

const BarcodeScanner: React.FC = () => {
  const [result, setResult] = useState('');
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('BarcodeScanner component mounted');
  }, []);

  const startScanner = () => {
    if (videoRef.current) {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: videoRef.current,
          },
          decoder: {
            readers: ['ean_reader', 'code_128_reader', 'code_39_reader', 'upc_reader'],
          },
        },
        (err) => {
          if (err) {
            console.error('Failed to initialize Quagga:', err);
            return;
          }
          Quagga.start();
        }
      );

      Quagga.onDetected((data) => {
        setResult(data.codeResult.code || '');
        Quagga.stop();
      });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Barcode Scanner</h2>
      <button
        onClick={startScanner}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Start Scanner
      </button>
      <div ref={videoRef} className="w-full max-w-md mx-auto"></div>
      {result && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Result:</h3>
          <p className="mt-2">{result}</p>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;