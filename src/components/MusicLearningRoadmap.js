import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

const instrumentData = {
  Guitar: {
    icon: "🎸",
    skills: [
      {
        name: "Beginner",
        children: [
          "Basic Chords (A, D, G, C, Em)",
          "Strumming Patterns",
          "Reading Tablature",
          "Tuning Your Guitar",
          "Basic Music Theory",
        ],
      },
      {
        name: "Intermediate",
        children: [
          "Barre Chords",
          "Fingerpicking Techniques",
          "Scales (Major, Minor, Pentatonic)",
          "Improvisation Basics",
          "Intro to Guitar Effects",
        ],
      },
      {
        name: "Advanced",
        children: [
          "Advanced Chord Voicings",
          "Solo Techniques (Tapping, Sweep Picking)",
          "Music Theory for Guitar",
          "Composition and Songwriting",
          "Recording Techniques",
        ],
      },
    ],
  },
  Piano: {
    icon: "🎹",
    skills: [
      {
        name: "Beginner",
        children: [
          "Hand Positioning and Posture",
          "Basic Scales and Chords",
          "Reading Sheet Music",
          "Simple Songs and Melodies",
          "Intro to Music Theory",
        ],
      },
      {
        name: "Intermediate",
        children: [
          "Intermediate Scales and Arpeggios",
          "Chord Progressions and Inversions",
          "Sight Reading Practice",
          "Pedal Techniques",
          "Classical and Contemporary Repertoire",
        ],
      },
      {
        name: "Advanced",
        children: [
          "Advanced Harmonization",
          "Improvisation and Jazz Techniques",
          "Composing for Piano",
          "Performance Techniques",
          "Advanced Music Theory",
        ],
      },
    ],
  },
  Drums: {
    icon: "🥁",
    skills: [
      {
        name: "Beginner",
        children: [
          "Drum Kit Setup and Maintenance",
          "Basic Beats and Rhythms",
          "Proper Stick Grip and Technique",
          "Reading Drum Notation",
          "Introduction to Rudiments",
        ],
      },
      {
        name: "Intermediate",
        children: [
          "Complex Time Signatures",
          "Groove Development",
          "Fills and Transitions",
          "Drum Tuning",
          "Playing with a Metronome",
        ],
      },
      {
        name: "Advanced",
        children: [
          "Polyrhythms and Odd Time Signatures",
          "Advanced Rudiments and Sticking Patterns",
          "Improvisation and Soloing",
          "Studio Recording Techniques",
          "World Percussion Styles",
        ],
      },
    ],
  },
  Bass: {
    icon: "🎸",
    skills: [
      {
        name: "Beginner",
        children: [
          "Proper Hand Positioning",
          "Basic Scales and Arpeggios",
          "Reading Bass Tablature and Notation",
          "Playing with Fingers vs. Pick",
          "Understanding Bass Role in a Band",
        ],
      },
      {
        name: "Intermediate",
        children: [
          "Slap and Pop Technique",
          "Walking Bass Lines",
          "Groove and Pocket Playing",
          "Chord Progressions for Bass",
          "Fretboard Knowledge",
        ],
      },
      {
        name: "Advanced",
        children: [
          "Advanced Slap Techniques",
          "Tapping and Chords on Bass",
          "Improvisation and Soloing",
          "Fretless Bass Techniques",
          "Advanced Music Theory for Bassists",
        ],
      },
    ],
  },
};

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
          {node.children.map((child, index) => (
            <div
              key={index}
              className="flex items-center p-2 bg-gray-800 rounded">
              <span className="w-4 h-4 mr-3 bg-blue-500 rounded-full"></span>
              <span className="text-gray-300">{child}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MusicLearningRoadmap = () => {
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
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
              {instrumentData[selectedInstrument].skills.map((skill, index) => (
                <SkillNode key={index} node={skill} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicLearningRoadmap;
