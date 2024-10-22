import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search } from 'lucide-react';

interface ToolContentProps {
  isSidebarCollapsed: boolean;
  toolCategories: Category[];
}

interface Tool {
  id: number;
  name: string;
}

interface Category {
  name: string;
  tools: Tool[];
}

const ToolContent: React.FC<ToolContentProps> = ({ isSidebarCollapsed, toolCategories = [] }) => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const contentClass = `flex-1 p-4 transition-all duration-300 ${
    isSidebarCollapsed ? 'ml-16' : 'ml-5'
  }`;

  const filteredCategories = toolCategories.map(category => ({
    ...category,
    tools: category.tools.filter(tool =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.tools.length > 0);

  const getToolPath = (categoryName: string, toolName: string) => {
    const category = categoryName.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
    const tool = toolName.toLowerCase().replace(/ /g, '-').replace(/[()]/g, '');
    return `/${category}/${tool}`;
  };

  if (location.pathname === '/') {
    return (
      <div className={contentClass}>
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tools..."
              className="w-full p-2 pl-10 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        <div className="space-y-8">
          {filteredCategories.map((category) => (
            <div key={category.name} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.id}
                    to={getToolPath(category.name, tool.name)}
                    className="flex items-center justify-center aspect-square bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-300 p-2"
                  >
                    <h3 className="text-sm font-medium text-center">{tool.name}</h3>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
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
      <div className="apple-card">
        <h2 className="text-2xl font-semibold mb-4">Tool Content</h2>
        <p className="text-gray-600">Content for the selected tool category will be displayed here.</p>
      </div>
    </div>
  );
};

export default ToolContent;
