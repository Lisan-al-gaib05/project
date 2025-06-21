import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { quizService } from '../../services/quizService';
import { badgeService } from '../../services/badgeService';
import { leaderboardService } from '../../services/leaderboardService';
import { Quiz, UserBadge, LeaderboardEntry } from '../../types';
import {
  Brain,
  Trophy,
  Target,
  TrendingUp,
  Clock,
  Award,
  Star,
  ChevronRight,
  Zap,
  CheckCircle,
  Loader
} from 'lucide-react';

interface DashboardProps {
  onPageChange: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onPageChange }) => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        const [quizzesData, badgesData, leaderboardData] = await Promise.all([
          quizService.getQuizzes(),
          user ? badgeService.getUserBadges(user.id) : Promise.resolve([]),
          leaderboardService.getLeaderboard()
        ]);

        setQuizzes(quizzesData.slice(0, 3)); // Show only first 3 quizzes
        setUserBadges(badgesData.slice(0, 4)); // Show only first 4 badges
        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      </div>
    );
  }

  const userRank = leaderboard.find(entry => entry.user.id === user?.id)?.rank || 1;

  const stats = [
    { label: 'Quizzes Completed', value: user?.completed_quizzes.length || 0, icon: CheckCircle, color: 'blue' },
    { label: 'Total Points', value: user?.points || 0, icon: Trophy, color: 'yellow' },
    { label: 'Current Level', value: user?.level || 1, icon: Target, color: 'green' },
    { label: 'Badges Earned', value: userBadges.length, icon: Award, color: 'purple' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    return colors[difficulty as keyof typeof colors] || colors.beginner;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}! 🧠
        </h1>
        <p className="text-gray-600">
          Ready to challenge your knowledge? Let's see what quizzes await you today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6 hover:scale-105 transform transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
                </div>
                <div className={`p-3 rounded-lg border ${getColorClasses(stat.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Available Quizzes */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Available Quizzes</h2>
              <button
                onClick={() => onPageChange('quizzes')}
                className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center"
              >
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="space-y-4">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{quiz.title}</h3>
                        <span className={`badge ${getDifficultyColor(quiz.difficulty)}`}>
                          {quiz.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{quiz.description}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {Math.floor(quiz.time_limit / 60)} min
                        </div>
                        <div className="flex items-center">
                          <Brain className="w-3 h-3 mr-1" />
                          {quiz.questions.length} questions
                        </div>
                        <div className="flex items-center">
                          <Trophy className="w-3 h-3 mr-1" />
                          {quiz.points} points
                        </div>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          {quiz.average_score.toFixed(0)}% avg
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => onPageChange('quizzes')}
                      className="btn-primary text-sm px-4 py-2 ml-4"
                    >
                      Start Quiz
                    </button>
                  </div>
                </div>
              ))}

              {quizzes.length === 0 && (
                <div className="text-center py-8">
                  <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No quizzes available</h4>
                  <p className="text-gray-600">Check back later for new quizzes!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Achievements & Progress */}
        <div className="space-y-6">
          {/* Recent Badges */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Badges</h3>
            {userBadges.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {userBadges.map((userBadge) => (
                  <div
                    key={userBadge.id}
                    className="text-center p-3 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 hover:scale-105 transform transition-all duration-200"
                  >
                    <div className="text-2xl mb-2">{userBadge.badge.icon}</div>
                    <p className="text-xs font-medium text-gray-800">{userBadge.badge.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <Award className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-600">No badges earned yet</p>
              </div>
            )}
            <button
              onClick={() => onPageChange('profile')}
              className="w-full mt-4 text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
              View All Badges
            </button>
          </div>

          {/* Weekly Goal */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Goal</h3>
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - Math.min((user?.completed_quizzes.length || 0) / 4, 1))}`}
                    className="text-purple-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-purple-600">
                    {Math.min(Math.round(((user?.completed_quizzes.length || 0) / 4) * 100), 100)}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">Complete 4 quizzes this week</p>
              <p className="text-xs text-gray-500">
                {Math.min(user?.completed_quizzes.length || 0, 4)} of 4 completed
              </p>
            </div>
          </div>

          {/* Leaderboard Rank */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Rank</h3>
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-purple-600 mr-2" />
                <span className="text-3xl font-bold text-gray-900">#{userRank}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Global Ranking</p>
              <button
                onClick={() => onPageChange('leaderboard')}
                className="text-purple-600 hover:text-purple-800 text-sm font-medium"
              >
                View Leaderboard
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card p-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <div className="text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-xl font-semibold mb-2">Keep Going!</h3>
              <p className="text-purple-100 mb-4">
                You're on fire! Complete more quizzes to climb the leaderboard.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">{user?.completed_quizzes.length || 0}</div>
                  <div className="text-purple-100">Quizzes Done</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">{Math.max(0, quizzes.length - (user?.completed_quizzes.length || 0))}</div>
                  <div className="text-purple-100">Remaining</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;