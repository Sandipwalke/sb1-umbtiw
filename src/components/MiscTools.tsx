import React from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import { toolCategories } from '../data/toolData';
import UrlShortener from './tools/UrlShortener';
import PasswordGenerator from './tools/PasswordGenerator';
import JsonFormatter from './tools/JsonFormatter';
import Base64EncoderDecoder from './tools/Base64EncoderDecoder';
import EmailValidator from './tools/EmailValidator';
import IpAddressLookup from './tools/IpAddressLookup';
import HexToRgbConverter from './tools/HexToRgbConverter';
import RandomNumberGenerator from './tools/RandomNumberGenerator';
import ColorPicker from './tools/ColorPicker';
import DnsLookup from './tools/DnsLookup';
import DomainNameGenerator from './tools/DomainNameGenerator';
import WhoisLookup from './tools/WhoisLookup';
import BmiCalculator from './tools/BmiCalculator';
import MortgageCalculator from './tools/MortgageCalculator';
import LoanCalculator from './tools/LoanCalculator';
import TaxCalculator from './tools/TaxCalculator';

const MiscTools: React.FC = () => {
  const category = toolCategories.find(cat => cat.name === "Miscellaneous Tools");
  const location = useLocation();

  const renderTool = () => {
    const path = location.pathname.split('/').pop();
    switch (path) {
      case 'url-shortener':
        return <UrlShortener />;
      case 'password-generator':
        return <PasswordGenerator />;
      case 'json-formatter':
        return <JsonFormatter />;
      case 'base64-encoder-decoder':
        return <Base64EncoderDecoder />;
      case 'email-validator':
        return <EmailValidator />;
      case 'ip-address-lookup':
        return <IpAddressLookup />;
      case 'hex-to-rgb-converter':
        return <HexToRgbConverter />;
      case 'random-number-generator':
        return <RandomNumberGenerator />;
      case 'color-picker':
        return <ColorPicker />;
      case 'dns-lookup':
        return <DnsLookup />;
      case 'domain-name-generator':
        return <DomainNameGenerator />;
      case 'whois-lookup':
        return <WhoisLookup />;
      case 'bmi-calculator':
        return <BmiCalculator />;
      case 'mortgage-calculator':
        return <MortgageCalculator />;
      case 'loan-calculator':
        return <LoanCalculator />;
      case 'tax-calculator':
        return <TaxCalculator />;
      default:
        return <div className="text-center text-gray-500 mt-8">Select a tool from the list to get started</div>;
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Miscellaneous Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold mb-2">Select a Tool</h3>
          <ul className="space-y-2">
            {category?.tools.map(tool => (
              <li key={tool.id}>
                <Link
                  to={`/misc-tools/${tool.name.toLowerCase().replace(/ /g, '-')}`}
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

export default MiscTools;