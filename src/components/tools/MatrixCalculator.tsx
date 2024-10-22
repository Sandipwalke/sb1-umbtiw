import React, { useState } from 'react';
import * as math from 'mathjs';

const MatrixCalculator: React.FC = () => {
  const [matrixA, setMatrixA] = useState<number[][]>([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState<number[][]>([[0, 0], [0, 0]]);
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState<number[][] | number | null>(null);

  const updateMatrix = (matrix: number[][], row: number, col: number, value: string) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = parseFloat(value) || 0;
    return newMatrix;
  };

  const performOperation = () => {
    try {
      switch (operation) {
        case 'add':
          setResult(math.add(matrixA, matrixB) as number[][]);
          break;
        case 'subtract':
          setResult(math.subtract(matrixA, matrixB) as number[][]);
          break;
        case 'multiply':
          setResult(math.multiply(matrixA, matrixB) as number[][]);
          break;
        case 'determinantA':
          setResult(math.det(matrixA));
          break;
        case 'determinantB':
          setResult(math.det(matrixB));
          break;
        case 'inverseA':
          setResult(math.inv(matrixA) as number[][]);
          break;
        case 'inverseB':
          setResult(math.inv(matrixB) as number[][]);
          break;
        default:
          setResult(null);
      }
    } catch (error) {
      setResult(null);
      alert('Error: Invalid operation or matrices');
    }
  };

  const renderMatrix = (matrix: number[][], setMatrix: React.Dispatch<React.SetStateAction<number[][]>>, label: string) => (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">{label}</h2>
      {matrix.map((row, i) => (
        <div key={i} className="flex mb-2">
          {row.map((cell, j) => (
            <input
              key={j}
              type="number"
              value={cell}
              onChange={(e) => setMatrix(updateMatrix(matrix, i, j, e.target.value))}
              className="w-16 p-1 mr-2 border rounded"
            />
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Matrix Calculator</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {renderMatrix(matrixA, setMatrixA, 'Matrix A')}
        {renderMatrix(matrixB, setMatrixB, 'Matrix B')}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="operation">
            Operation:
          </label>
          <select
            id="operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="add">Addition (A + B)</option>
            <option value="subtract">Subtraction (A - B)</option>
            <option value="multiply">Multiplication (A * B)</option>
            <option value="determinantA">Determinant of A</option>
            <option value="determinantB">Determinant of B</option>
            <option value="inverseA">Inverse of A</option>
            <option value="inverseB">Inverse of B</option>
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={performOperation}
        >
          Calculate
        </button>
        {result !== null && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Result:</h2>
            {Array.isArray(result) ? (
              result.map((row, i) => (
                <div key={i} className="flex">
                  {row.map((cell, j) => (
                    <span key={j} className="w-16 p-1 mr-2 border rounded">
                      {cell.toFixed(2)}
                    </span>
                  ))}
                </div>
              ))
            ) : (
              <p className="text-lg">{result.toFixed(4)}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatrixCalculator;