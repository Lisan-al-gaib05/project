import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Navbar from './components/Layout/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import QuizList from './components/Quiz/QuizList';
import QuizDetail from './components/Quiz/QuizDetail';
import QuizInterface from './components/Quiz/QuizInterface';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Profile from './components/Profile/Profile';
import AdminPanel from './components/Admin/AdminPanel';
import { Quiz } from './types';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentPage('quiz-detail');
  };

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentPage('quiz-interface');
  };

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
    setCurrentPage('quizzes');
  };

  const handleBackToQuizDetail = () => {
    setCurrentPage('quiz-detail');
  };

  if (!isAuthenticated) {
    return authMode === 'login' ? (
      <LoginForm onToggleMode={() => setAuthMode('register')} />
    ) : (
      <RegisterForm onToggleMode={() => setAuthMode('login')} />
    );
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onPageChange={setCurrentPage} />;
      case 'quizzes':
        return <QuizList onQuizSelect={handleQuizSelect} />;
      case 'quiz-detail':
        return selectedQuiz ? (
          <QuizDetail
            quiz={selectedQuiz}
            onBack={handleBackToQuizzes}
            onStartQuiz={handleStartQuiz}
          />
        ) : null;
      case 'quiz-interface':
        return selectedQuiz ? (
          <QuizInterface
            quiz={selectedQuiz}
            onBack={handleBackToQuizDetail}
          />
        ) : null;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <Profile />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <Dashboard onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main>
        {renderCurrentPage()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;