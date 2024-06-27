// InstrumentSelection.js
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import SkillTree from "./SkillTree";
import { instrumentData } from "./instrumentData";

const InstrumentSelection = () => {
  const [selectedInstrument, setSelectedInstrument] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Music Master: Choose Your Instrument
        </h1>
        {!selectedInstrument ? (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.entries(instrumentData).map(([instrument, data]) => (
              <button
                key={instrument}
                className="p-4 bg-gradient-to-br from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 rounded-lg flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg w-48"
                onClick={() => setSelectedInstrument(instrument)}>
                <span className="text-5xl mb-2">{data.icon}</span>
                <span className="text-xl font-semibold text-blue-300">
                  {instrument}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div>
            <button
              className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-300 flex items-center"
              onClick={() => setSelectedInstrument(null)}>
              <ArrowLeft size={20} className="mr-2" />
              Back to Instrument Selection
            </button>
            <h2 className="text-3xl font-semibold mb-6 text-center">
              <span className="mr-4">
                {instrumentData[selectedInstrument].icon}
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                {selectedInstrument} Learning Roadmap
              </span>
            </h2>
            <SkillTree skills={instrumentData[selectedInstrument].skills} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InstrumentSelection;
