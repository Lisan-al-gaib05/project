import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Navbar from './components/Layout/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import CourseList from './components/Courses/CourseList';
import CourseDetail from './components/Courses/CourseDetail';
import QuizInterface from './components/Quiz/QuizInterface';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Profile from './components/Profile/Profile';
import AdminPanel from './components/Admin/AdminPanel';
import { Course, Module } from './types';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setCurrentPage('course-detail');
  };

  const handleModuleSelect = (module: Module) => {
    setSelectedModule(module);
    setCurrentPage('quiz');
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setCurrentPage('courses');
  };

  const handleBackToCourseDetail = () => {
    setSelectedModule(null);
    setCurrentPage('course-detail');
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
      case 'courses':
        return <CourseList onCourseSelect={handleCourseSelect} />;
      case 'course-detail':
        return selectedCourse ? (
          <CourseDetail
            course={selectedCourse}
            onBack={handleBackToCourses}
            onModuleSelect={handleModuleSelect}
          />
        ) : null;
      case 'quiz':
        return selectedModule ? (
          <QuizInterface
            module={selectedModule}
            onBack={handleBackToCourseDetail}
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