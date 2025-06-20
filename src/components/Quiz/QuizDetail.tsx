import React from 'react';
import { Quiz } from '../../types';
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  Users, 
  Star, 
  Trophy,
  Brain,
  Target,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface QuizDetailProps {
  quiz: Quiz;
  onBack: () => void;
  onStartQuiz: (quiz: Quiz) => void;
}

const QuizDetail: React.FC<QuizDetailProps> = ({ quiz, onBack, onStartQuiz }) => {
  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800 border-green-200',
      intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      advanced: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[difficulty as keyof typeof colors] || colors.beginner;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming':
        return '💻';
      case 'Frontend Development':
        return '🎨';
      case 'Backend Development':
        return '⚙️';
      case 'Security':
        return '🔒';
      default:
        return '📚';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} minute${mins !== 1 ? 's' : ''}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-purple-600 hover:text-purple-800 mb-4 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Quizzes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quiz Info */}
        <div className="lg:col-span-2">
          <div className="card overflow-hidden">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 p-8 text-white">
              <div className="absolute top-6 left-6">
                <span className="text-3xl">{getCategoryIcon(quiz.category)}</span>
              </div>
              <div className="absolute top-6 right-6">
                <span className={`badge border ${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                </span>
              </div>
              
              <div className="mt-12">
                <div className="mb-4">
                  <span className="text-purple-200 text-sm font-medium">{quiz.category}</span>
                </div>
                <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
                <p className="text-purple-100 text-lg leading-relaxed">
                  {quiz.description}
                </p>
              </div>
            </div>
            
            <div className="p-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">{formatTime(quiz.timeLimit)}</p>
                  <p className="text-xs text-gray-600">Time Limit</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Brain className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">{quiz.questions.length}</p>
                  <p className="text-xs text-gray-600">Questions</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">{quiz.attempts.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Attempts</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">{quiz.averageScore}%</p>
                  <p className="text-xs text-gray-600">Avg Score</p>
                </div>
              </div>

              {/* Quiz Instructions */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
                  Quiz Instructions
                </h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Answer all {quiz.questions.length} questions to the best of your ability</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>You have {formatTime(quiz.timeLimit)} to complete the quiz</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>You need {quiz.passingScore}% or higher to pass</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Once started, the timer cannot be paused</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span>Review your answers before submitting</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Question Types */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Question Types</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Multiple Choice</h4>
                    <p className="text-sm text-gray-600">Select the best answer from the given options</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">True/False</h4>
                    <p className="text-sm text-gray-600">Determine if the statement is true or false</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => onStartQuiz(quiz)}
                className="w-full btn-primary py-4 text-lg font-medium flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Quiz
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Points & Rewards */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
              Rewards
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <Trophy className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="text-sm font-medium text-gray-900">Points</span>
                </div>
                <span className="text-lg font-bold text-yellow-600">+{quiz.points}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <Target className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-sm font-medium text-gray-900">Passing Score</span>
                </div>
                <span className="text-lg font-bold text-purple-600">{quiz.passingScore}%</span>
              </div>
            </div>
          </div>

          {/* Quiz Stats */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiz Statistics</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Average Score</span>
                  <span>{quiz.averageScore}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill bg-gradient-to-r from-purple-500 to-blue-500" 
                    style={{ width: `${quiz.averageScore}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{quiz.attempts}</div>
                  <div className="text-sm text-gray-600">Total Attempts</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="card p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Tips for Success</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Read each question carefully</li>
              <li>• Manage your time wisely</li>
              <li>• Don't second-guess yourself too much</li>
              <li>• Review your answers if time permits</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;