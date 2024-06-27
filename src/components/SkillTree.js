import React, { useState } from "react";
import { ChevronDown, ChevronRight, CheckCircle } from "lucide-react";

const SkillNode = ({ node, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(level === 0);
  const [isCompleted, setIsCompleted] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  const toggleOpen = () => setIsOpen(!isOpen);
  const toggleComplete = (e) => {
    e.stopPropagation();
    setIsCompleted(!isCompleted);
  };

  return (
    <div className="mb-4">
      <div
        className={`flex items-center p-3 cursor-pointer rounded-md transition-all duration-300 ${
          isCompleted ? "bg-green-900" : "bg-gray-800 hover:bg-gray-700"
        }`}
        onClick={toggleOpen}>
        {hasChildren ? (
          isOpen ? (
            <ChevronDown size={20} className="text-blue-400 mr-2" />
          ) : (
            <ChevronRight size={20} className="text-blue-400 mr-2" />
          )
        ) : (
          <span className="w-5 mr-2" />
        )}
        <span className="text-lg font-semibold text-gray-200">{node.name}</span>
        <CheckCircle
          size={20}
          className={`ml-auto cursor-pointer transition-all duration-300 ${
            isCompleted ? "text-green-400" : "text-gray-600"
          }`}
          onClick={toggleComplete}
        />
      </div>
      {isOpen && hasChildren && (
        <div className="ml-6 mt-2 space-y-2">
          {node.children.map((child, index) =>
            typeof child === "string" ? (
              <div
                key={index}
                className="flex items-center p-2 bg-gray-800 rounded">
                <span className="w-4 h-4 mr-3 bg-blue-500 rounded-full"></span>
                <span className="text-gray-300">{child}</span>
              </div>
            ) : (
              <SkillNode key={index} node={child} level={level + 1} />
            )
          )}
        </div>
      )}
    </div>
  );
};

const SkillTree = ({ skills }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
      {skills.map((skill, index) => (
        <SkillNode key={index} node={skill} />
      ))}
    </div>
  );
};

export default SkillTree;
