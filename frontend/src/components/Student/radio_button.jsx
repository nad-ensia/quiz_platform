import React from 'react';

export default function RadioButtonQuestion({
  question = "Q1: Do you love me?",
  options = [
    { id: 'yes', label: 'Yes' },
    { id: 'no', label: 'No' }
  ],
  isRequired = true,
  points = 1,
  studentAnswer = 'no',  // ID of the option selected by student
  correctAnswer = 'yes'   // ID of the correct option
}) {
  const renderRadioButton = (option) => {
    const id = option.id;
    const label = option.label;
    const isSelected = studentAnswer === id;
    const isCorrect = correctAnswer === id;
    
    // Determine the text style based on student answer and correctness
    let textStyle = "text-base ";
    
    if (isSelected) {
      // Student selected this option
      if (isCorrect) {
        // Selected correctly
        textStyle += "text-green-600 font-medium";
      } else {
        // Selected incorrectly
        textStyle += "text-red-600 font-medium";
      }
    } else {
      // Student didn't select this option
      if (isCorrect) {
        // Should have been selected
        textStyle += "text-green-600";
      } else {
        // Correctly not selected
        textStyle += "text-gray-600";
      }
    }

    // Determine circle colors
    const outerStrokeColor = isSelected 
      ? (isCorrect ? "#22C55E" : "#EF4444") 
      : (isCorrect ? "#22C55E" : "#3F8CAA");
    
    const innerFillColor = isSelected 
      ? (isCorrect ? "#22C55E" : "#EF4444") 
      : "none";

    const strokeOpacity = (!isSelected && !isCorrect) ? "0.5" : "1";

    return (
      <div key={id} className="flex items-center">
        <div className="w-5 h-5 mr-3 flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <circle 
              cx="10" cy="10" r="9.5" 
              stroke={outerStrokeColor} 
              strokeOpacity={strokeOpacity}
              fill="white" 
            />
            {(isSelected || (isCorrect && !isSelected)) && (
              <circle 
                cx="10" cy="10" 
                r={isCorrect && !isSelected ? "3" : "5"} 
                fill={innerFillColor || outerStrokeColor} 
                fillOpacity={isCorrect && !isSelected ? "0.5" : "1"}
              />
            )}
          </svg>
        </div>
        <span className={textStyle}>
          {label}
          {isCorrect && !isSelected && (
            <span className="ml-2 text-green-600 text-sm">(correct answer)</span>
          )}
        </span>
      </div>
    );
  };

  // Calculate the student's score
  const calculateScore = () => {
    return studentAnswer === correctAnswer ? points : 0;
  };

  // Get labels for correct answer and student answer
  const getCorrectAnswerLabel = () => {
    const correctOption = options.find(option => option.id === correctAnswer);
    return correctOption ? correctOption.label : 'None';
  };
  
  const getStudentAnswerLabel = () => {
    const studentOption = options.find(option => option.id === studentAnswer);
    return studentOption ? studentOption.label : 'None';
  };

  const scoreValue = calculateScore();
  const studentAnswerLabel = getStudentAnswerLabel();
  const correctAnswerLabel = getCorrectAnswerLabel();
  const isStudentCorrect = studentAnswer === correctAnswer;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md mx-auto border border-blue-100">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-oceanblue font-medium text-base">
          {question}
        </h2>
        <div className="flex items-center">
          <span className="text-softblue font-medium text-sm mr-1">
            {scoreValue}/{points}pts
          </span>
          {isRequired && (
            <span className="text-softblue font-medium">*</span>
          )}
        </div>
      </div>

      <div className="space-y-4 mt-5">
        {options.map(renderRadioButton)}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-sm">
          <span className="font-medium">Student answered: </span>
          <span className={isStudentCorrect ? "text-green-600" : "text-red-600"}>
            {studentAnswerLabel}
          </span>
        </div>
        <div className="text-sm mt-1">
          <span className="font-medium">Correct answer: </span>
          <span className="text-green-600">
            {correctAnswerLabel}
          </span>
        </div>
      </div>
    </div>
  );
}