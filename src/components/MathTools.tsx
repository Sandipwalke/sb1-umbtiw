import React from 'react';
import { Route, Routes, useLocation, Link } from 'react-router-dom';
import { toolCategories } from '../data/toolData';
import SimpleCalculator from './tools/SimpleCalculator';
import PercentageCalculator from './tools/PercentageCalculator';
import FractionToDecimalConverter from './tools/FractionToDecimalConverter';
import ScientificCalculator from './tools/ScientificCalculator';
import AlgebraSolver from './tools/AlgebraSolver';
import MatrixCalculator from './tools/MatrixCalculator';
import QuadraticEquationSolver from './tools/QuadraticEquationSolver';
import UnitCircleCalculator from './tools/UnitCircleCalculator';
import ProbabilityCalculator from './tools/ProbabilityCalculator';

const MathTools: React.FC = () => {
  const category = toolCategories.find(cat => cat.name === "Math Tools");
  const location = useLocation();

  const renderTool = () => {
    const path = location.pathname.split('/').pop();
    switch (path) {
      case 'simple-calculator':
        return <SimpleCalculator />;
      case 'percentage-calculator':
        return <PercentageCalculator />;
      case 'fraction-to-decimal-converter':
        return <FractionToDecimalConverter />;
      case 'scientific-calculator':
        return <ScientificCalculator />;
      case 'algebra-solver':
        return <AlgebraSolver />;
      case 'matrix-calculator':
        return <MatrixCalculator />;
      case 'quadratic-equation-solver':
        return <QuadraticEquationSolver />;
      case 'unit-circle-calculator':
        return <UnitCircleCalculator />;
      case 'probability-calculator':
        return <ProbabilityCalculator />;
      default:
        return <div className="text-center text-gray-500 mt-8">Select a tool from the list to get started</div>;
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Math Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold mb-2">Select a Tool</h3>
          <ul className="space-y-2">
            {category?.tools.map(tool => (
              <li key={tool.id}>
                <Link
                  to={`/math-tools/${tool.name.toLowerCase().replace(/ /g, '-')}`}
                  className={`block p-2 rounded ${
                    location.pathname.includes(tool.name.toLowerCase().replace(/ /g, '-'))
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          {renderTool()}
        </div>
      </div>
    </div>
  );
};

export default MathTools;