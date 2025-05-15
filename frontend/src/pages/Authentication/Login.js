import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import QMark from '../../assets/images/qmark_login.svg';
import AttachFile from '../../assets/attach_file.svg';

export default function QuizLoginPage() {
  const [role, setRole] = useState('');
  const [rfid, setrfid] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({ role: '', rfid: '', password: '', backend: '' });

  const navigate = useNavigate();
  const roles = ['Student', 'Teacher'];

  const validateForm = () => {
    const newErrors = {
      role: role.toLowerCase() ? '' : 'Role is required.',
      rfid: rfid ? '' : 'ID card is required.',
      password: password ? '' : 'Password is required.',
      backend: ''
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === '');
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          role: role.toLowerCase(),
          rfid,
          password
        })
      });

      if (!response.ok) {
        // Try to parse error message from backend
        const data = await response.json();

        // Example backend error messages you might receive:
        // "incorrect password", "account/rfid does not exist", "no match between roles and credentials"
        const backendMessage = data.message || 'Login failed. Please check your credentials.';

        setErrors((prev) => ({
          ...prev,
          backend: backendMessage
        }));
        return;
      }

      // Clear any previous backend errors
      setErrors((prev) => ({ ...prev, backend: '' }));

      // If successful login, navigate based on role
      if (role === 'Student') {
        navigate('/student');
      } else if (role === 'Teacher') {
        navigate('/teacher');
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        backend: 'An error occurred during login. Please try again later.'
      }));
      console.error('Login error:', error);
    }
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
          <h1 className="text-title text-oceanblue font-bold mb-8">
            Online Quizzes Platform
          </h1>

          <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
            <h2 className="text-subtitle text-softblue text-center mb-4">Login</h2>

            <p className="text-center text-softblue mb-8">
              You must choose your <span className="font-semibold text-oceanblue">role</span>,
              insert your <span className="font-semibold text-oceanblue">ID card</span>, and enter
              your <span className="font-semibold text-oceanblue">password</span> to access the
              online quizzes platform!
            </p>

            <div className="border-t border-softblue/30 my-6"></div>

            {/* Role selector */}
            <div className="mb-6 relative">
              <button
                className={`w-full p-4 bg-softblue/10 rounded flex items-center justify-between text-oceanblue border ${
                  errors.role ? 'border-red-500' : 'border-softblue'
                }`}
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
                        setErrors((prev) => ({ ...prev, role: '' }));
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

            {/* ID card input */}
            <div className="mb-6">
              <input
                type="password"
                placeholder="RFID"
                value={rfid}
                onChange={(e) => {
                  setrfid(e.target.value);
                  if (e.target.value) {
                    setErrors((prev) => ({ ...prev, rfid: '' }));
                  }
                }}
                className={`w-full p-4 bg-softblue/5 rounded text-oceanblue border placeholder-softblue/60 ${
                  errors.rfid ? 'border-red-500' : 'border-softblue'
                }`}
              />
              {errors.rfid && <p className="text-red-500 text-sm mt-1">{errors.rfid}</p>}
            </div>

            {/* Password input with show/hide */}
            <div className="mb-8 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value) {
                    setErrors((prev) => ({ ...prev, password: '' }));
                  }
                }}
                placeholder="Enter your password"
                className={`w-full p-4 pr-12 bg-softblue/5 rounded text-oceanblue border placeholder-softblue/60 ${
                  errors.password ? 'border-red-500' : 'border-softblue'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-oceanblue text-sm"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Backend error message */}
            {errors.backend && (
              <p className="text-red-600 text-center text-sm mb-4 font-semibold">
                {errors.backend}
              </p>
            )}

            {/* Login button */}
            <div className="flex justify-center mb-4">
              <button
                onClick={handleLogin}
                className="px-6 py-3 bg-transparent hover:bg-softblue/15 text-softblue rounded-md border-softblue border-[1px] transition-colors"
              >
                Login Now
              </button>
            </div>

            {/* Sign up link */}
            <p className="text-center text-sm text-softblue">
              Don't have an account?{' '}
              <Link to="/" className="text-oceanblue hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
