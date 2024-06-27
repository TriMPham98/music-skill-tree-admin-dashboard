import React, { useState } from "react";
import SkillNode from "./SkillNode";
import ProgressBar from "./ProgressBar";

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
        <div className="flex-grow flex items-center">
          <ProgressBar progress={overallProgress} size="large" />
          <span className="ml-4 text-gray-200">
            {Math.round(overallProgress)}%
          </span>
        </div>
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
