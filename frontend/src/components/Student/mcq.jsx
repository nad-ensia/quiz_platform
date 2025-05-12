import React from 'react';

export default function CheckboxQuestion({
  question = "Q1: What did you eat lyoum zin?",
  options = [
    { id: 'option1', label: "Bread" },
    { id: 'option2', label: "Aya" },
    { id: 'option3', label: "Milk" }
  ],
  isRequired = true,
  points = 1,
  isSingleAnswer = false,
  studentAnswers = { "option1": true, "option2": true, "option3": false },
  correctAnswers = { "option1": true, "option2": true, "option3": false }
}) {
  const renderCheckbox = (option) => {
    const id = option.id;
    const label = option.label;
    const isSelected = studentAnswers[id] || false;
    const isCorrect = correctAnswers[id] || false;

    let textStyle = "text-base ";

    if (isSelected) {
      textStyle += isCorrect ? "text-green-600 font-medium" : "text-red-600 font-medium";
    } else {
      textStyle += isCorrect ? "text-green-600" : "text-gray-600";
    }

    return (
      <div key={id} className="flex items-center">
        <div className="w-5 h-5 mr-3 flex-shrink-0">
          {isSelected ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="19" height="19" rx="3.5"
                fill="white"
                stroke={isCorrect ? "#22C55E" : "#EF4444"} />
              <path d="M5 10L8.5 13.5L15 7"
                stroke={isCorrect ? "#22C55E" : "#EF4444"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="19" height="19" rx="3.5"
                fill="white"
                stroke={isCorrect ? "#22C55E" : "#9CA3AF"}
                strokeOpacity={isCorrect ? "1" : "0.5"} />
            </svg>
          )}
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

  const calculateScore = () => {
    const studentSelectedIds = Object.keys(studentAnswers).filter(id => studentAnswers[id]);
    const correctAnswerIds = Object.keys(correctAnswers).filter(id => correctAnswers[id]);
  
    const isExactlyCorrect = (
      studentSelectedIds.length === correctAnswerIds.length &&
      studentSelectedIds.every(id => correctAnswers[id])
    );
  
    return {
      correct: isExactlyCorrect ? correctAnswerIds.length : 0,
      total: correctAnswerIds.length,
      score: isExactlyCorrect ? points : 0
    };
  };
  


  const getCorrectAnswerLabels = () => {
    return options
      .filter(option => correctAnswers[option.id])
      .map(option => option.label);
  };

  const getStudentAnswerLabels = () => {
    return options
      .filter(option => studentAnswers[option.id])
      .map(option => ({
        id: option.id,
        label: option.label,
        isCorrect: correctAnswers[option.id] || false
      }));
  };

  const scoreDetails = calculateScore();
  const studentAnswerLabels = getStudentAnswerLabels();
  const correctAnswerLabels = getCorrectAnswerLabels();

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md mx-auto">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-oceanblue font-medium text-base">
          {question}
        </h2>
        <div className="flex items-center">
          <span className="text-softblue font-medium text-sm mr-1">
            {scoreDetails.score.toFixed(1)}/{points}pts
          </span>
          {isRequired && (
            <span className="text-softblue font-medium">*</span>
          )}
        </div>
      </div>

      <div className="space-y-4 mt-5">
        {options.map(renderCheckbox)}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-sm">
          <span className="font-medium">Student answered: </span>
          {studentAnswerLabels.length > 0 ? (
            <span>
              {studentAnswerLabels.map((item, index) => (
                <React.Fragment key={item.id}>
                  {index > 0 && ", "}
                  <span className={item.isCorrect ? "text-green-600" : "text-red-600"}>
                    {item.label}
                  </span>
                </React.Fragment>
              ))}
            </span>
          ) : (
            <span>None</span>
          )}
        </div>
        <div className="text-sm mt-1">
          <span className="font-medium">Correct answers: </span>
          <span className="text-green-600">
            {correctAnswerLabels.join(', ') || 'None'}
          </span>
        </div>
      </div>
    </div>
  );
}
