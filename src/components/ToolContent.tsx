import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ToolContentProps {
  isSidebarCollapsed: boolean;
}

const ToolContent: React.FC<ToolContentProps> = ({ isSidebarCollapsed }) => {
  const location = useLocation();
  const contentClass = `flex-1 p-8 transition-all duration-300 ${
    isSidebarCollapsed ? 'ml-16' : 'ml-64'
  }`;

  useEffect(() => {
    console.log('ToolContent component rendered');
    console.log('Current path:', location.pathname);
  }, [location.pathname]);

  if (location.pathname === '/') {
    return (
      <div className={contentClass}>
        <h2 className="text-2xl font-semibold mb-4">Welcome to Web Toolbox</h2>
        <p>Select a tool category from the sidebar to get started.</p>
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