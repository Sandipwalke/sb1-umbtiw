import React from 'react';

interface Tool {
  id: number;
  name: string;
}

interface ToolContentProps {
  selectedTool: Tool | null;
  isSidebarCollapsed: boolean;
}

const ToolContent: React.FC<ToolContentProps> = ({ selectedTool, isSidebarCollapsed }) => {
  const contentClass = `flex-1 p-8 transition-all duration-300 ${
    isSidebarCollapsed ? 'ml-16' : 'ml-64'
  }`;

  if (!selectedTool) {
    return (
      <div className={contentClass}>
        <h2 className="text-2xl font-semibold mb-4">Welcome to Web Toolbox</h2>
        <p>Select a tool from the sidebar to get started.</p>
      </div>
    );
  }

  return (
    <div className={contentClass}>
      <h2 className="text-2xl font-semibold mb-4">{selectedTool.name}</h2>
      <p>Tool content for {selectedTool.name} goes here.</p>
    </div>
  );
};

export default ToolContent;