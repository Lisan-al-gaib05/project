import React, { useState } from 'react';
import { mockQuizzes } from '../../data/mockData';
import { 
  Brain, 
  Clock, 
  Users, 
  Star, 
  Filter,
  Search,
  Play,
  Trophy,
  Target
} from 'lucide-react';
import { Quiz } from '../../types';

interface QuizListProps {
  onQuizSelect: (quiz: Quiz) => void;
}

const QuizList: React.FC<QuizListProps> = ({ onQuizSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const categories = ['all', 'Programming', 'Frontend Development', 'Backend Development', 'Security'];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  const filteredQuizzes = mockQuizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || quiz.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty && quiz.isActive;
  });

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Quizzes</h1>
        <p className="text-gray-600">
          Test your knowledge and challenge yourself with our comprehensive quiz collection.
        </p>
      </div>

      {/* Filters */}
      <div className="card p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Difficulty Filter */}
            <div className="relative">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="card overflow-hidden hover:scale-105 transform transition-all duration-200 cursor-pointer"
            onClick={() => onQuizSelect(quiz)}
          >
            <div className="relative bg-gradient-to-br from-purple-500 to-blue-600 p-6 text-white">
              <div className="absolute top-4 left-4">
                <span className="text-2xl">{getCategoryIcon(quiz.category)}</span>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`badge ${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                </span>
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="bg-white bg-opacity-20 rounded-full p-2 backdrop-blur-sm">
                  <Play className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                  {quiz.title}
                </h3>
                <p className="text-purple-100 text-sm">
                  {quiz.category}
                </p>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {quiz.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {Math.floor(quiz.timeLimit / 60)} min
                </div>
                <div className="flex items-center">
                  <Brain className="w-4 h-4 mr-1" />
                  {quiz.questions.length} questions
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {quiz.attempts} attempts
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                  {quiz.averageScore}% avg
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <Trophy className="w-4 h-4 mr-1 text-purple-500" />
                  <span>{quiz.points} points</span>
                </div>
                
                <button className="btn-primary text-sm px-4 py-2">
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredQuizzes.length === 0 && (
        <div className="text-center py-12">
          <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or filters to find more quizzes.
          </p>
        </div>
      )}

      {/* Stats Section */}
      <div className="mt-12 card p-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="text-center">
          <Target className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <h3 className="text-2xl font-semibold mb-2">Challenge Yourself!</h3>
          <p className="text-purple-100 mb-6">
            Test your knowledge across different categories and difficulty levels.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-1">{mockQuizzes.length}</div>
              <div className="text-purple-100">Total Quizzes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-1">{categories.length - 1}</div>
              <div className="text-purple-100">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-1">
                {mockQuizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0)}
              </div>
              <div className="text-purple-100">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-1">
                {mockQuizzes.reduce((sum, quiz) => sum + quiz.points, 0)}
              </div>
              <div className="text-purple-100">Total Points</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizList;