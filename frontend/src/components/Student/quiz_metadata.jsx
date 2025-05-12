import { useState } from 'react';
import { Trash2, Plus, ChevronDown } from 'lucide-react';

export default function QuizMetadataForm() {
  const [instructions, setInstructions] = useState([
    "Do not borrow supplies from your classmates",
    "Do not share your answers with others",
    "Do not use any unauthorized materials",
    "Do not leave the exam room without permission"
  ]);
  const [showDifficultyDropdown, setShowDifficultyDropdown] = useState(false);
  const [showDeadlineDropdown, setShowDeadlineDropdown] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('Difficulty level');
  const [selectedDeadline, setSelectedDeadline] = useState('Deadline');
  const [attempts, setAttempts] = useState(1);

  const difficultyLevels = ['Easy', 'Medium', 'Hard', 'Expert'];
  const deadlineOptions = ['1 day', '3 days', '1 week', '2 weeks'];

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const removeInstruction = (index) => {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  };

  const updateInstruction = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  return (
    <div className="max-w-[600px] mx-auto bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden font-sans">
      <div className="flex justify-center items-center py-4 px-6 border-b border-gray-200">
        <h2 className="text-[30px] font-medium text-[#3F8CAA] text-center">Quiz Metadata</h2>
      </div>
      
      <div className="p-6">
        {/* Quiz Title */}
        <div className="mb-6">
          <label className="block text-[18px] font-medium text-[#3F8CAA] mb-2">Quiz title</label>
          <div className="w-full pr-6">
            <input
              type="text"
              placeholder="example: full.name@ensia.edu.dz"
              className="w-full p-2 border border-[#3F8CAA] rounded-md text-sm"
            />
          </div>
        </div>

        {/* Quiz Description */}
        <div className="mb-6">
          <label className="block text-[18px] font-medium text-[#3F8CAA] mb-2">Quiz Description</label>
          <div className="w-full pr-6">
            <textarea
              placeholder="Please don't exceed 500 characters"
              className="w-full p-2 border border-[#3F8CAA] rounded-md text-[#3F8CAA] min-h-[120px] text-sm resize-y"
            />
          </div>
        </div>

        {/* Attempts, Difficulty, Deadline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pr-6">
          <div className="relative">
            <label className="block text-[18px] font-medium text-[#3F8CAA] mb-2">Attempts</label>
            <input
              type="number"
              min="1"
              max="10"
              placeholder="eg: 5"
              className="w-full p-2 border border-[#3F8CAA] rounded-md text-sm"
              onKeyDown={(e) => {
                if (e.key === 'e' || e.key === 'E' || e.key === '-' || e.key === '+') {
                  e.preventDefault();
                }
              }}
            />
          </div>

          <div className="relative">
            <label className="block text-[18px] font-medium text-[#3F8CAA] mb-2">Difficulty level</label>
            <div 
              className="p-2 border border-[#3F8CAA] rounded-md flex justify-between items-center cursor-pointer bg-[#3F8CAA]/10 text-sm"
              onClick={() => {
                setShowDifficultyDropdown(!showDifficultyDropdown);
                setShowDeadlineDropdown(false);
              }}
            >
              <span>{selectedDifficulty}</span>
              <ChevronDown size={16} className="text-[#3F8CAA]" />
            </div>
            {showDifficultyDropdown && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-md z-10 mt-1">
                {difficultyLevels.map((level) => (
                  <div 
                    key={level}
                    className="p-2 cursor-pointer text-sm hover:bg-gray-100"
                    onClick={() => {
                      setSelectedDifficulty(level);
                      setShowDifficultyDropdown(false);
                    }}
                  >
                    {level}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <label className="block text-[18px] font-medium text-[#3F8CAA] mb-2">Deadline</label>
            <div 
              className="p-2 border border-[#3F8CAA] rounded-md flex justify-between items-center cursor-pointer bg-[#3F8CAA]/10 text-sm"
              onClick={() => {
                setShowDeadlineDropdown(!showDeadlineDropdown);
                setShowDifficultyDropdown(false);
              }}
            >
              <span>{selectedDeadline}</span>
              <ChevronDown size={16} className="text-[#3F8CAA]" />
            </div>
            {showDeadlineDropdown && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-md z-10 mt-1">
                {deadlineOptions.map((option) => (
                  <div 
                    key={option}
                    className="p-2 cursor-pointer text-sm hover:bg-gray-100"
                    onClick={() => {
                      setSelectedDeadline(option);
                      setShowDeadlineDropdown(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <label className="block text-[18px] font-medium text-[#3F8CAA] mb-2">Instructions</label>
          <div className="pr-6">
            <button 
              onClick={addInstruction}
              className="w-full p-2 flex items-center justify-center border border-[#3F8CAA] rounded-md text-[#30393D] bg-[#3F8CAA]/10 cursor-pointer mb-3 text-sm"
            >
              <Plus size={16} className="mr-2" />
              Add instruction
            </button>

            {instructions.map((instruction, index) => (
              <div key={index} className="relative mb-2">
                <input
                  type="text"
                  value={instruction}
                  onChange={(e) => updateInstruction(index, e.target.value)}
                  className="w-full p-2 pr-10 border border-gray-300 rounded-md text-sm"
                />
                <button
                  onClick={() => removeInstruction(index)}
                  className="absolute right-3 top-2 bg-transparent border-none cursor-pointer text-[#3F8CAA]"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-center">
          <button className="bg-transparent text-[#3F8CAA] border border-[#3F8CAA] rounded px-8 py-2 text-base font-semibold cursor-pointer mt-4">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}