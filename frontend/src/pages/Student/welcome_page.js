import { Link } from 'react-router-dom';  // Import Link for navigation
import QMark from "../../assets/images/qmark_login.svg";

export default function StudentHome() {
  return (
    <div className="h-screen w-full bg-white relative">
      {/* Main content */}
      <div className="flex flex-col flex-grow h-full">
        {/* Diagonal section */}
        <div className="relative flex-grow w-full">
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-2/3 h-full">
            <img
              src={QMark}
              alt="Question marks pattern"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Blue triangle */}
          <div
            className="absolute bottom-0 left-0 w-full h-full shadow-2xl"
            style={{
              clipPath: "polygon(0 0, 0% 100%, 100% 100%)",
              backgroundImage:
                "linear-gradient(to bottom right, #3F8CAA, #193844)",
            }}
          ></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row justify-center md:justify-between items-center h-full px-8 md:px-16 text-center md:text-left">
            {/* Wrapper for text and buttons */}
            <div className="flex flex-col items-center md:items-start gap-8">
              {/* Left side text */}
              <div className="text-white">
                <h2 className="text-3xl md:text-4xl font-normal md:text-white text-oceanblue">
                  Answer & Receive
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-700 mb-2">
                  Secure Quizzes
                </h3>
                <h2 className="text-3xl md:text-4xl md:text-white text-oceanblue">
                  from your teachers !
                </h2>
              </div>

              {/* Links with OR */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                {/* Link to "New received quizzes" */}
                <Link
                  to="/student/new-quizzes"  // Navigate to the new quizzes page
                  className="bg-[#3791b4] hover:bg-[#2d7a96] text-white font-medium py-2 px-6 rounded transition-colors"
                >
                  New received quizzes
                </Link>

                <div className="font-medium text-white px-2">OR</div>

                {/* Link to "Quizzes answers results" */}
                <Link
                  to="/student_view_quizzes"  // Navigate to the quizzes results page
                  className="bg-[#273e4c] hover:bg-[#1a2a33] text-white font-medium py-2 px-6 rounded transition-colors"
                >
                  Quizzes answers results
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
