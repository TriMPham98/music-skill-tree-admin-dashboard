import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, CheckCircle } from "lucide-react";

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
    setCompletedSkills((prev) => {
      const newCompletedSkills = { ...prev, [skillName]: !prev[skillName] };
      return newCompletedSkills;
    });
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
            <div className="w-20 bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}></div>
            </div>
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

const SkillTree = ({ skills }) => {
  const [overallProgress, setOverallProgress] = useState(0);

  const calculateOverallProgress = (skillName, progress) => {
    const skillIndex = skills.findIndex((skill) => skill.name === skillName);
    if (skillIndex !== -1) {
      skills[skillIndex].progress = progress;
    }
    const newOverall =
      skills.reduce((sum, skill) => sum + (skill.progress || 0), 0) /
      skills.length;
    setOverallProgress(Math.min(newOverall, 100));
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
      <div className="mb-6 flex items-center">
        <span className="text-lg font-semibold text-gray-200 mr-4">
          Overall Progress:
        </span>
        <div className="flex-grow bg-gray-700 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${overallProgress}%` }}></div>
        </div>
        <span className="ml-4 text-gray-200">
          {Math.round(overallProgress)}%
        </span>
      </div>
      {skills.map((skill, index) => (
        <SkillNode
          key={index}
          node={skill}
          onComplete={calculateOverallProgress}
        />
      ))}
    </div>
  );
};

export default SkillTree;
