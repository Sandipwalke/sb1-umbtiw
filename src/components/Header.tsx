import React from 'react';
import { Box } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <Box className="text-blue-500 mr-2" size={24} />
        <h1 className="text-2xl font-semibold text-gray-900">Web Toolbox</h1>
      </div>
    </header>
  );
};

export default Header;