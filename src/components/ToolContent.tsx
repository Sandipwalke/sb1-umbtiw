import React from 'react';
import { useLocation } from 'react-router-dom';
import UnitConverters from './UnitConverters';

interface ToolContentProps {
  isSidebarCollapsed: boolean;
}

const ToolContent: React.FC<ToolContentProps> = ({ isSidebarCollapsed }) => {
  const location = useLocation();
  const contentClass = `flex-1 p-8 transition-all duration-300 ${
    isSidebarCollapsed ? 'ml-16' : 'ml-64'
  }`;

  if (location.pathname === '/') {
    return (
      <div className={contentClass}>
        <h2 className="text-2xl font-semibold mb-4">Welcome to Web Toolbox</h2>
        <p>Select a tool category from the sidebar to get started.</p>
      </div>
    );
  }

  if (location.pathname === '/unit-converters') {
    return (
      <div className={contentClass}>
        <UnitConverters />
      </div>
    );
  }

  return (
    <div className={contentClass}>
      <h2 className="text-2xl font-semibold mb-4">Tool Content</h2>
      <p>Content for the selected tool category will be displayed here.</p>
    </div>
  );
};

export default ToolContent;