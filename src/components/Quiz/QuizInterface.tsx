import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Quiz, Question } from '../../types';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Trophy,
  Star,
  Target,
  AlertTriangle
} from 'lucide-react';

interface QuizInterfaceProps {
  quiz: Quiz;
  onBack: () => void;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({ quiz, onBack }) => {
  const { user, updateUser } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string | number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizStarted, timeLeft, showResults]);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerSelect = (questionId: string, answer: string | number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    
    return Math.round((correct / quiz.questions.length) * 100);
  };

  const submitQuiz = () => {
    setShowResults(true);
    
    // Update user progress and points
    const score = calculateScore();
    const pointsEarned = Math.floor((score / 100) * quiz.points);
    
    if (user) {
      const newCompletedQuizzes = user.completedQuizzes.includes(quiz.id) 
        ? user.completedQuizzes 
        : [...user.completedQuizzes, quiz.id];
        
      updateUser({
        points: user.points + pointsEarned,
        completedQuizzes: newCompletedQuizzes
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
            <p className="text-gray-600">{quiz.category} • {quiz.difficulty}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">{formatTime(quiz.timeLimit)}</p>
              <p className="text-sm text-gray-600">Time Limit</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Trophy className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">{quiz.questions.length}</p>
              <p className="text-sm text-gray-600">Questions</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Star className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">{quiz.passingScore}%</p>
              <p className="text-sm text-gray-600">Passing Score</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                <p className="text-sm text-yellow-800 font-medium">
                  Once you start, the timer cannot be paused. Make sure you're ready!
                </p>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready to begin?</h3>
            <div className="text-left bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Answer all questions to the best of your ability</li>
                <li>• You have {formatTime(quiz.timeLimit)} to complete the quiz</li>
                <li>• You need {quiz.passingScore}% to pass</li>
                <li>• Review your answers before submitting</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button onClick={onBack} className="btn-secondary px-6 py-3">
              Back to Quiz Details
            </button>
            <button onClick={startQuiz} className="btn-primary px-6 py-3">
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const passed = score >= quiz.passingScore;
    const pointsEarned = Math.floor((score / 100) * quiz.points);
    const correctAnswers = quiz.questions.filter(q => selectedAnswers[q.id] === q.correctAnswer).length;

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card p-8 text-center">
          <div className="mb-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {passed ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <XCircle className="w-8 h-8 text-red-600" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {passed ? 'Congratulations! 🎉' : 'Keep Trying! 💪'}
            </h1>
            <p className="text-gray-600">
              {passed ? 'You passed the quiz!' : 'You can retake the quiz anytime.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600 mb-1">{score}%</p>
              <p className="text-sm text-gray-600">Your Score</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600 mb-1">
                {correctAnswers}/{quiz.questions.length}
              </p>
              <p className="text-sm text-gray-600">Correct Answers</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600 mb-1">+{pointsEarned}</p>
              <p className="text-sm text-gray-600">Points Earned</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-3xl font-bold text-yellow-600 mb-1">
                {formatTime(quiz.timeLimit - timeLeft)}
              </p>
              <p className="text-sm text-gray-600">Time Taken</p>
            </div>
          </div>

          {/* Question Review */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Your Answers</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {quiz.questions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className="text-left border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        {index + 1}. {question.question}
                      </h4>
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                    
                    {question.options && (
                      <div className="space-y-1 mb-2">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`text-sm p-2 rounded ${
                              optionIndex === question.correctAnswer
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : optionIndex === userAnswer
                                ? 'bg-red-100 text-red-800 border border-red-200'
                                : 'bg-gray-50 text-gray-700'
                            }`}
                          >
                            {option}
                            {optionIndex === question.correctAnswer && ' ✓ Correct'}
                            {optionIndex === userAnswer && optionIndex !== question.correctAnswer && ' ✗ Your Answer'}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-600 italic bg-blue-50 p-2 rounded">
                      💡 {question.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button onClick={onBack} className="btn-secondary px-6 py-3">
              Back to Quiz Details
            </button>
            {!passed && (
              <button
                onClick={() => {
                  setShowResults(false);
                  setQuizStarted(false);
                  setCurrentQuestionIndex(0);
                  setSelectedAnswers({});
                  setTimeLeft(quiz.timeLimit);
                }}
                className="btn-primary px-6 py-3"
              >
                Retake Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center text-purple-600 hover:text-purple-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Exit Quiz
          </button>
          
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${timeLeft < 300 ? 'text-red-600' : 'text-gray-600'}`}>
              <Clock className="w-4 h-4 mr-2" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Question */}
      <div className="card p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {currentQuestion.question}
        </h2>

        <div className="space-y-3 mb-8">
          {currentQuestion.options?.map((option, index) => (
            <label
              key={index}
              className={`block p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                selectedAnswers[currentQuestion.id] === index
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200'
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={index}
                checked={selectedAnswers[currentQuestion.id] === index}
                onChange={() => handleAnswerSelect(currentQuestion.id, index)}
                className="sr-only"
              />
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                  selectedAnswers[currentQuestion.id] === index
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswers[currentQuestion.id] === index && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-gray-900">{option}</span>
              </div>
            </label>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="btn-secondary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <button
              onClick={submitQuiz}
              disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}
              className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.min(quiz.questions.length - 1, prev + 1))}
              className="btn-primary px-6 py-2"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;