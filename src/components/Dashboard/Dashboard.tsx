import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockCourses, mockBadges } from '../../data/mockData';
import {
  BookOpen,
  Trophy,
  Target,
  TrendingUp,
  Clock,
  Award,
  Star,
  ChevronRight
} from 'lucide-react';

interface DashboardProps {
  onPageChange: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onPageChange }) => {
  const { user } = useAuth();

  const recentCourses = mockCourses.slice(0, 3);
  const unlockedBadges = mockBadges.slice(0, 4);

  const stats = [
    { label: 'Courses Completed', value: user?.completedCourses.length || 2, icon: BookOpen, color: 'blue' },
    { label: 'Total Points', value: user?.points || 2450, icon: Trophy, color: 'yellow' },
    { label: 'Current Level', value: user?.level || 8, icon: Target, color: 'green' },
    { label: 'Badges Earned', value: unlockedBadges.length, icon: Award, color: 'purple' }
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600">
          Ready to continue your learning journey? Let's see what's new today.
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
        {/* Continue Learning */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Continue Learning</h2>
              <button
                onClick={() => onPageChange('courses')}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
              >
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start space-x-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{course.category}</p>
                      
                      {/* Progress Bar */}
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex-1 progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${Math.random() * 80 + 20}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {Math.floor(Math.random() * 80 + 20)}%
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          {course.rating}
                        </div>
                      </div>
                    </div>
                    
                    <button className="btn-primary text-sm px-4 py-2">
                      Continue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements & Progress */}
        <div className="space-y-6">
          {/* Recent Badges */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Badges</h3>
            <div className="grid grid-cols-2 gap-3">
              {unlockedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="text-center p-3 rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 hover:scale-105 transform transition-all duration-200"
                >
                  <div className="text-2xl mb-2">{badge.icon}</div>
                  <p className="text-xs font-medium text-gray-800">{badge.name}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => onPageChange('profile')}
              className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
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
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.65)}`}
                    className="text-green-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-green-600">65%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">Complete 5 modules this week</p>
              <p className="text-xs text-gray-500">3 of 5 completed</p>
            </div>
          </div>

          {/* Leaderboard Rank */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Rank</h3>
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-blue-600 mr-2" />
                <span className="text-3xl font-bold text-gray-900">#1</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">This Week</p>
              <button
                onClick={() => onPageChange('leaderboard')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Leaderboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;