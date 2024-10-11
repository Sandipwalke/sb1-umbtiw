import React from 'react';
import { toolCategories } from '../data/toolData';

const DateTimeTools: React.FC = () => {
  const category = toolCategories.find(cat => cat.name === "Date & Time Tools");

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Date & Time Tools</h2>
      <ul className="list-disc pl-5">
        {category?.tools.map(tool => (
          <li key={tool.id} className="mb-2">{tool.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DateTimeTools;