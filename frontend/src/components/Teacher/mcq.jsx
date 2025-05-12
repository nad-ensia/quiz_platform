import React, { useState } from 'react';

export default function CheckboxQuestion({
  isRequired = true,
  points = 1,
  isSingleAnswer = false
}) {
  const [selectedOptions, setSelectedOptions] = useState({
    bread: false,
    kessra: false,
    banana: false,
    apple: false
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleToggle = (option) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [option]: !selectedOptions[option],
    };

    const selectedCount = Object.values(newSelectedOptions).filter(Boolean).length;

    // Single answer error
    if (isSingleAnswer && selectedCount > 1) {
      setErrorMessage('You should only select one answer.');
    }
    // Required question error
    else if (isRequired && selectedCount === 0) {
      setErrorMessage('This question is required.');
    }
    // No error
    else {
      setErrorMessage('');
    }

    setSelectedOptions(newSelectedOptions);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md mx-auto">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-oceanblue font-medium text-base">
          Q1: What did you eat lyoum zin?
        </h2>
        <div className="flex items-center">
          <span className="text-softblue font-medium text-sm mr-1">{points}pts</span>
          {isRequired && (
            <span className="text-softblue font-medium">*</span>
          )}
        </div>
      </div>

      <div className="space-y-4 mt-5">
        {Object.entries(selectedOptions).map(([id, isSelected]) => (
          <div
            key={id}
            className="flex items-center cursor-pointer"
            onClick={() => handleToggle(id)}
          >
            <div className="w-5 h-5 mr-3 flex-shrink-0">
              {isSelected ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="19" height="19" rx="3.5"
                        fill="white" stroke="#3F8CAA"/>
                  <path d="M5 10L8.5 13.5L15 7" stroke="#3F8CAA" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="19" height="19" rx="3.5"
                        fill="white" stroke="#3F8CAA" strokeOpacity="0.5"/>
                </svg>
              )}
            </div>
            <span className="text-oceanblue text-base capitalize">{id}</span>
          </div>
        ))}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-4 text-red-500 text-sm font-medium">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
