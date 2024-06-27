import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, CheckCircle } from "lucide-react";
import ProgressBar from "./ProgressBar";

const SkillNode = ({ node, level = 0, onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedSkills, setCompletedSkills] = useState({});

  const hasChildren = node.children && node.children.length > 0;

  const toggleOpen = () => setIsOpen(!isOpen);

  const updateProgress = () => {
    if (hasChildren) {
      const childrenProgress = node.children.map((child) =>
        typeof child === "string"
          ? completedSkills[child]
            ? 100
            : 0
          : child.progress || 0
      );
      const newProgress =
        childrenProgress.reduce((a, b) => a + b, 0) / node.children.length;
      setProgress(newProgress);
      onComplete(node.name, newProgress);
    }
  };

  const toggleSkill = (skillName) => {
    setCompletedSkills((prev) => ({
      ...prev,
      [skillName]: !prev[skillName],
    }));
  };

  useEffect(() => {
    updateProgress();
  }, [completedSkills]);

  return (
    <div className="mb-4">
      <div
        className={`flex items-center p-3 cursor-pointer rounded-md transition-all duration-300 ${
          progress === 100 ? "bg-green-900" : "bg-gray-800 hover:bg-gray-700"
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
        {hasChildren && (
          <div className="ml-auto flex items-center">
            <span className="text-sm text-gray-400 mr-2">
              {Math.round(progress)}%
            </span>
            <ProgressBar progress={progress} />
          </div>
        )}
      </div>
      {isOpen && hasChildren && (
        <div className="ml-6 mt-2 space-y-2">
          {node.children.map((child, index) =>
            typeof child === "string" ? (
              <div
                key={index}
                className="flex items-center p-2 bg-gray-800 rounded">
                <CheckCircle
                  size={20}
                  className={`mr-3 cursor-pointer ${
                    completedSkills[child] ? "text-green-400" : "text-gray-600"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSkill(child);
                  }}
                />
                <span className="text-gray-300">{child}</span>
              </div>
            ) : (
              <SkillNode
                key={index}
                node={child}
                level={level + 1}
                onComplete={(childName, childProgress) => {
                  child.progress = childProgress;
                  updateProgress();
                }}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SkillNode;
