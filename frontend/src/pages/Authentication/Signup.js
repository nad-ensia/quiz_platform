import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QMark from '../../assets/images/qmark_login.svg';

export default function QuizSignUpPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [idCard, setIdCard] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const roles = ['Student', 'Teacher'];

  const validateForm = () => {
    const newErrors = {};

    if (!email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid.';

    if (!name) newErrors.name = 'Name is required.';
    if (!role) newErrors.role = 'Role is required.';
    if (!idCard) newErrors.idCard = 'ID Card is required.';
    if (!password) newErrors.password = 'Password is required.';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (!validateForm()) return;

    if (role === 'Student') navigate('/student');
    else if (role === 'Teacher') navigate('/teacher');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full">
          <img src={QMark} alt="Question marks pattern" className="object-cover w-full h-full" />
        </div>

        <div
          className="absolute bottom-0 left-0 w-full h-full shadow-2xl"
          style={{
            clipPath: 'polygon(0 0, 0% 100%, 100% 100%)',
            backgroundImage: 'linear-gradient(to bottom right, #3F8CAA, #193844)',
          }}
        ></div>

        <div className="relative z-10 flex flex-col items-center pt-16 w-full">
          <h1 className="text-title text-oceanblue font-bold mb-8">Online Quizzes Platform</h1>

          <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
            <h2 className="text-subtitle text-softblue text-center mb-4">Sign Up</h2>

            <p className="text-center text-softblue mb-8">
              Please fill in your <span className="font-semibold text-oceanblue">details</span> to
              create an account and access the quizzes platform.
            </p>

            <div className="border-t border-softblue/30 my-6"></div>

            <div className="mb-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-softblue/10 rounded text-oceanblue border border-softblue"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 bg-softblue/10 rounded text-oceanblue border border-softblue"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

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
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
            </div>

            {/* Password Input with Show/Hide */}
            <div className="mb-6 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 pr-10 bg-softblue/10 rounded text-oceanblue border border-softblue"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-4 text-softblue select-none"
                tabIndex={-1}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              {errors.password && <p className="text-red-500 text-sm -mt-2 mb-2">{errors.password}</p>}
            </div>

            {/* Confirm Password Input with Show/Hide */}
            <div className="mb-6 relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-4 pr-10 bg-softblue/10 rounded text-oceanblue border border-softblue"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-4 text-softblue select-none"
                tabIndex={-1}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="mb-6">
              <input
                type="password"
                placeholder="RFID"
                value={idCard}
                onChange={(e) => setIdCard(e.target.value)}
                className="w-full p-4 bg-softblue/10 rounded text-oceanblue border border-softblue"
              />
              {errors.idCard && <p className="text-red-500 text-sm mt-1">{errors.idCard}</p>}
            </div>

            <div className="flex justify-center mb-4">
              <button
                onClick={handleSignUp}
                className="px-6 py-3 bg-transparent hover:bg-softblue/15 text-softblue rounded-md transition-colors border-softblue border"
              >
                Sign Up Now
              </button>
            </div>

            <p className="text-center text-sm text-softblue">
              Already have an account?{' '}
              <a href="/login" className="text-oceanblue font-semibold hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
