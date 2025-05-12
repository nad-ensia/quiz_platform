import React, { useState } from 'react';
import RadioButtonQuestion from '../Teacher/radio_button';
import CheckboxQuestion from '../Teacher/mcq';

export default function QuizHeader({ 
  initialTitle = "Quiz Ttile",
  initialDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  initialDifficulty = "Hard",
  initialDeadline = "12/12/2025",
  initialTotalQuestions = 15,
  initialAttempts = 3,
  initialInstructions = [
    "Do this",
    "Do this nigga beautifully",
    "Nigga this is bad, don't do it again",
    "All niggas should start nagging and bragging."
  ]
}) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [deadline, setDeadline] = useState(initialDeadline);
  const [totalQuestions, setTotalQuestions] = useState(initialTotalQuestions);
  const [attempts, setAttempts] = useState(initialAttempts);
  const [instructions, setInstructions] = useState(initialInstructions);

  return (
    <div className="bg-white rounded-xl shadow-md w-full max-w-2xl mx-auto border border-softblue border-opacity-20">
      {/* Title */}
      <div className="w-full border-b border-softblue border-opacity-10 py-4 px-6">
        <h1 className="text-softblue text-xl font-semibold text-center">{title}</h1>
      </div>
      
      {/* Description & Stats Section */}
      <div className="p-6">
        {/* Description */}
        <div className="mb-6">
          <h2 className="text-softblue font-semibold underline inline mr-2">Description:</h2>
          <p className="text-oceanblue text-sm leading-relaxed inline">
            {description}
          </p>
        </div>
        
        {/* Stats Row */}
        <div className="flex flex-wrap">
          {/* Difficulty level */}
          <div className="w-1/2 mb-4 flex justify-center">
            <div className="inline-flex items-center justify-center border border-softblue rounded p-2 w-full max-w-[220px]">
              <span className="text-oceanblue text-sm mr-2">Difficulty level:</span>
              <span className="text-softblue text-sm px-2 py-1 rounded font-semibold">{difficulty}</span>
            </div>
          </div>
          
          {/* Deadline */}
          <div className="w-1/2 mb-4 flex justify-center">
            <div className="inline-flex items-center justify-center border border-softblue rounded p-2 w-full max-w-[220px]">
              <span className="text-oceanblue text-sm mr-2">Deadline:</span>
              <span className="text-softblue text-sm font-semibold">{deadline}</span>
            </div>
          </div>
          
          {/* Total Questions */}
          <div className="w-1/2 mb-4 flex justify-center">
            <div className="inline-flex items-center justify-center border border-softblue rounded p-2 w-full max-w-[220px]">
              <span className="text-oceanblue text-sm mr-2">Total Questions:</span>
              <span className="text-softblue text-sm font-semibold">{totalQuestions}</span>
            </div>
          </div>
          
          {/* Attempts */}
          <div className="w-1/2 mb-4 flex justify-center">
            <div className="inline-flex items-center justify-center border border-softblue rounded p-2 w-full max-w-[220px]">
              <span className="text-oceanblue text-sm mr-2">Attempts:</span>
              <span className="text-softblue text-sm font-semibold">{attempts}</span>
            </div>
          </div>
        </div>
                
        {/* Instructions */}
        <div>
          <h2 className="text-softblue font-semibold mb-2 underline">Instructions:</h2>
          <ul className="list-disc pl-5 text-oceanblue text-sm space-y-1">
            {instructions.map((instruction, index) => (
              <li key={index} className="marker:text-softblue">{instruction}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Questions Header */}
      <div className="w-full border-t border-b border-softblue border-opacity-10 py-4 px-6">
        <h2 className="text-softblue text-lg font-medium text-center">Questions</h2>
      </div>
      
      {/* Question Components */}
      <div className="px-6 py-4">
        {/* MCQ Question */}
        <div className="mb-6">
          <CheckboxQuestion 
            isRequired={true}
            points={1}
            isSingleAnswer={false}
          />
        </div>
        
        {/* Separator line */}
        <div className="border-t border-softblue border-opacity-20 my-4"></div>
        
        {/* Radio Button Question */}
        <div className="mb-6">
          <RadioButtonQuestion 
            isRequired={true}
            points={1}
          />
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-center py-6 border-t border-softblue border-opacity-10">
        <button className="bg-softblue text-white px-8 py-2 rounded-md hover:bg-softblue/90 transition-colors">
          Submit
        </button>
      </div>
    </div>
  );
}