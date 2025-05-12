import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ⬅️ for navigation
import QMark from '../../assets/images/qmark_login.svg';
import AttachFile from '../../assets/attach_file.svg';

export default function QuizLoginPage() {
  const [role, setRole] = useState('');
  const [idCard, setIdCard] = useState('');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // ⬅️ use navigation hook
  const roles = ['Student', 'Teacher'];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdCard(file.name);
    }
  };

  const handleLogin = () => {
    if (!role || !idCard) {
      alert('Please select a role and upload your ID card.');
      return;
    }

    if (role === 'Student') {
      navigate('/student');
    } else if (role === 'Teacher') {
      navigate('/teacher');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Main content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-2/3 h-full">
          <img src={QMark} alt="Question marks pattern" className="object-cover w-full h-full" />
        </div>

        {/* Blue triangle */}
        <div
          className="absolute bottom-0 left-0 w-full h-full shadow-2xl"
          style={{
            clipPath: 'polygon(0 0, 0% 100%, 100% 100%)',
            backgroundImage: 'linear-gradient(to bottom right, #3F8CAA, #193844)',
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center pt-16 w-full">
          {/* Title */}
          <h1 className="text-title text-oceanblue font-bold mb-8">
            Online Quizzes Platform
          </h1>

          {/* Login card */}
          <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
            <h2 className="text-subtitle text-softblue text-center mb-4">Login</h2>

            <p className="text-center text-softblue mb-8">
              You must choose your <span className="font-semibold text-oceanblue">role</span> and
              insert your <span className="font-semibold text-oceanblue">ID card</span> so you can
              access the online quizzes platform!
            </p>

            <div className="border-t border-softblue/30 my-6"></div>

            {/* Role selector */}
            <div className="mb-6 relative">
              <button
                className="w-full p-4 bg-softblue/10 rounded flex items-center justify-between text-oceanblue border border-softblue"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              >
                <span>{role || 'Role'}</span>
                <svg
                  className={`w-4 h-4 transform ${isRoleDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-softblue/15 rounded shadow-lg z-20">
                  {roles.map((r) => (
                    <div
                      key={r}
                      className="p-3 hover:bg-softblue/15 cursor-pointer"
                      onClick={() => {
                        setRole(r);
                        setIsRoleDropdownOpen(false);
                      }}
                    >
                      {r}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ID Card file input */}
            <div className="mb-8">
              <div
                className="w-full p-4 bg-softblue/5 rounded flex items-center text-oceanblue border border-softblue cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              >
                <img src={AttachFile} alt="Attach file" className="w-5 h-5 mr-2" />
                <span className="text-sm truncate">{idCard || 'Insert card'}</span>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Login button */}
            <div className="flex justify-center">
              <button
                onClick={handleLogin}
                className="px-6 py-3 bg-transparent hover:bg-softblue/15 text-softblue rounded-md hover:bg-opacity-90 transition-colors border-softblue border-solid border-[1px]"
              >
                Login Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
