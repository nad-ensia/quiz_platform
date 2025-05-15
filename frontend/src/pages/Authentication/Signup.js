import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QMark from '../../assets/images/qmark_login.svg';
import axios from 'axios';

export default function QuizSignUpPage() {
  const [userEmail, setUserEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [rfidCode, setRfidCode] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [apiError, setApiError] = useState('');  // Dedicated state for API errors

  const navigate = useNavigate();
  const availableRoles = ['Student', 'Teacher'];

  const validateForm = () => {
    const newErrors = {};

    if (!userEmail) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(userEmail)) newErrors.email = 'Email is invalid.';

    if (!fullName) newErrors.name = 'Name is required.';
    if (!userRole) newErrors.role = 'Role is required.';
    if (!rfidCode) newErrors.idCard = 'ID Card is required.';
    if (!userPassword) newErrors.password = 'Password is required.';
    if (userPassword.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (userPassword !== repeatPassword) newErrors.confirmPassword = 'Passwords do not match.';

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    
    // Clear previous API errors
    setApiError('');

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
        email: userEmail,
        full_name: fullName,
        role: userRole.toLowerCase(),
        rfid: rfidCode,
        password: userPassword,
        confirm_password: repeatPassword,
      });

      console.log('Sign up successful:', res.data);
      navigate('/login');

    } catch (err) {
      console.error('Sign up failed:', err.response?.data || err.message);
      
      // Handle specific error messages from backend
      if (err.response?.data) {
        const errorData = err.response.data;
        
        // Set specific error messages based on error type
        if (errorData.error === 'RFID not found') {
          setApiError('This RFID card is not registered in our system. Please contact an administrator.');
        } 
        else if (errorData.error === 'Role mismatch') {
          setApiError(`The selected role doesn't match the role assigned to this RFID card.`);
        }
        else if (errorData.error === 'User already signed up') {
          setApiError('This RFID card is already associated with an account. Please login instead.');
        }
        else if (errorData.error === 'Passwords do not match') {
          setApiError('The password confirmation does not match your password.');
        }
        else if (errorData.error === 'Missing fields') {
          setApiError(`Please fill in all required fields: ${errorData.missing?.join(', ')}`);
        }
        else if (errorData.error?.includes('Database error')) {
          setApiError('A database error occurred. Please try again later.');
        }
        else if (errorData.error === 'Email already exists') {
          setApiError('This email address is already registered. Please use a different email or login to your existing account.');
        }
        else {
          // Fall back to the error message from the server if available
          setApiError(errorData.error || 'Signup failed. Please try again.');
        }
      } else {
        // Network or other errors
        setApiError('Connection error. Please check your internet connection and try again.');
      }
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
          <h1 className="text-title text-oceanblue font-bold mb-8">Online Quizzes Platform</h1>

          <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
            <h2 className="text-subtitle text-softblue text-center mb-4">Sign Up</h2>

            <p className="text-center text-softblue mb-8">
              Please fill in your <span className="font-semibold text-oceanblue">details</span> to
              create an account and access the quizzes platform.
            </p>

            <div className="border-t border-softblue/30 my-6"></div>

            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                <p>{apiError}</p>
              </div>
            )}

            <div className="mb-6">
              <input
                type="email"
                placeholder="Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full p-4 bg-softblue/10 rounded text-oceanblue border border-softblue"
              />
              {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-4 bg-softblue/10 rounded text-oceanblue border border-softblue"
              />
              {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
            </div>

            <div className="mb-6 relative">
              <button
                className="w-full p-4 bg-softblue/10 rounded flex items-center justify-between text-oceanblue border border-softblue"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{userRole || 'Role'}</span>
                <svg
                  className={`w-4 h-4 transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-softblue/15 rounded shadow-lg z-20">
                  {availableRoles.map((r) => (
                    <div
                      key={r}
                      className="p-3 hover:bg-softblue/15 cursor-pointer"
                      onClick={() => {
                        setUserRole(r);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {r}
                    </div>
                  ))}
                </div>
              )}
              {formErrors.role && <p className="text-red-500 text-sm mt-1">{formErrors.role}</p>}
            </div>

            <div className="mb-6 relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                className="w-full p-4 pr-10 bg-softblue/10 rounded text-oceanblue border border-softblue"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                className="absolute right-3 top-4 text-softblue select-none"
                tabIndex={-1}
              >
                {isPasswordVisible ? 'Hide' : 'Show'}
              </button>
              {formErrors.password && <p className="text-red-500 text-sm -mt-2 mb-2">{formErrors.password}</p>}
            </div>

            <div className="mb-6 relative">
              <input
                type={isConfirmVisible ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="w-full p-4 pr-10 bg-softblue/10 rounded text-oceanblue border border-softblue"
              />
              <button
                type="button"
                onClick={() => setIsConfirmVisible((prev) => !prev)}
                className="absolute right-3 top-4 text-softblue select-none"
                tabIndex={-1}
              >
                {isConfirmVisible ? 'Hide' : 'Show'}
              </button>
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
              )}
            </div>

            <div className="mb-6">
              <input
                type="password"
                placeholder="RFID"
                value={rfidCode}
                onChange={(e) => setRfidCode(e.target.value)}
                className="w-full p-4 bg-softblue/10 rounded text-oceanblue border border-softblue"
              />
              {formErrors.idCard && <p className="text-red-500 text-sm mt-1">{formErrors.idCard}</p>}
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