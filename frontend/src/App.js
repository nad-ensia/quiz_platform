import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/Authentication/Login';
import AccessPopup from './components/PopUp';
import TeacherHome from './pages/Teacher/welcome_page';
import StudentHome from './pages/Student/welcome_page';
import CheckboxQuestion from './components/Student/mcq';
import RadioButtonQuestion from './components/Student/radio_button';
import TeacherViewQuizzes from './pages/Teacher/view_quizzes';
import StudentViewQuizzes from './pages/Student/view_quizzes';
import Submissions from './pages/Teacher/quiz_submissions';
import Quiz_Createion from './components/Teacher/quizz_creator'
import MetaData from './components/Teacher/quiz_metadata';
import QuizHeader from './components/Teacher/quiz_header';
import ViewQuizResults from './pages/Student/view_quiz_results';
import ViewNewQuizzes from './pages/Student/view_new_quizzes';
import QuizAnswers from './pages/Teacher/quiz_answers';

import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/teacher" element={<TeacherHome />} />
        <Route path="/student" element={<StudentHome />} />
        <Route path="/teacher_view_quizzes" element={<TeacherViewQuizzes />} />
        <Route path="/student_view_quizzes" element={<StudentViewQuizzes />} />
        <Route path="/quiz_submissions" element={<Submissions />} />
        <Route path="/second_quiz_creator" element={<Quiz_Createion />} />
        <Route path="/quiz_metadata" element={<MetaData />} />
        <Route path="/quiz" element={<QuizHeader />} />
        <Route path="/popup" element={<AccessPopup />} />
        <Route path="/mcq" element={<CheckboxQuestion />} />
        <Route path="/radio" element={<RadioButtonQuestion />} />
        <Route path="/quiz/quiz-results" element={<ViewQuizResults />} />
        <Route path="/student/new-quizzes" element={<ViewNewQuizzes />} />
        <Route path="/teacher/quiz-answers" element={<QuizAnswers />} />


      </Routes>
    </Router>
  );
}

export default App;
