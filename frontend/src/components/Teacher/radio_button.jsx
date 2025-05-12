import React, { useState } from 'react';

export default function RadioButtonQuestion({ isRequired = true, points = 1 }) {
  const [selectedOption, setSelectedOption] = useState('yes');

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md mx-auto border border-blue-100">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-oceanblue font-medium text-base">Q1: Do you love me?</h2>
        <div className="flex items-center">
          <span className="text-softblue font-medium text-sm mr-1">{points}pts</span>
          {isRequired && (
            <span className="text-softblue font-medium">*</span>
          )}
        </div>
      </div>

      <div className="space-y-4 mt-5">
        {[
          { id: 'yes', label: 'Yes' },
          { id: 'no', label: 'No' }
        ].map((option) => (
          <div
            key={option.id}
            className="flex items-center cursor-pointer"
            onClick={() => handleSelect(option.id)}
          >
            <div className="w-5 h-5 mr-3 flex-shrink-0">
              {selectedOption === option.id ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="9.5" stroke="#3F8CAA" fill="white" />
                  <circle cx="10" cy="10" r="5" fill="#3F8CAA" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="9.5" stroke="#3F8CAA" strokeOpacity="0.5" fill="white" />
                </svg>
              )}
            </div>
            <span className="text-oceanblue text-base">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
