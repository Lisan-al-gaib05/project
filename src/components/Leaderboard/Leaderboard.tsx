import React, { useState } from 'react';
import { mockLeaderboard } from '../../data/mockData';
import { Trophy, Medal, Award, Crown, TrendingUp, Users, Brain } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'all'>('week');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-500" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
        <p className="text-gray-600">
          See how you rank against other quiz masters in the QuizMaster community.
        </p>
      </div>

      {/* Time Frame Selector */}
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-900">Top Performers</h2>
          </div>
          
          <div className="flex space-x-2">
            {(['week', 'month', 'all'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimeFrame(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  timeFrame === period
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period === 'all' ? 'All Time' : `This ${period.charAt(0).toUpperCase() + period.slice(1)}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {mockLeaderboard.slice(0, 3).map((entry) => (
          <div
            key={entry.user.id}
            className={`card p-6 text-center relative overflow-hidden ${
              entry.rank === 1 ? 'ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50' : ''
            }`}
          >
            {entry.rank === 1 && (
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse-slow">
                <Crown className="w-8 h-8 text-white" />
              </div>
            )}
            
            <div className="relative">
              <div className={`w-16 h-16 rounded-full mx-auto mb-4 p-1 ${getRankBadgeColor(entry.rank)}`}>
                <img
                  src={entry.user.avatar}
                  alt={entry.user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              
              <div className="flex items-center justify-center mb-2">
                {getRankIcon(entry.rank)}
                <span className="ml-2 text-2xl font-bold text-gray-900">#{entry.rank}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {entry.user.name}
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Trophy className="w-4 h-4 mr-1 text-yellow-500" />
                  {entry.points.toLocaleString()} points
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 mr-1 text-blue-500" />
                  Level {entry.level}
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Brain className="w-4 h-4 mr-1 text-purple-500" />
                  {entry.quizzesCompleted} quizzes
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Award className="w-4 h-4 mr-1 text-green-500" />
                  {entry.badges} badges
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              All Rankings
            </h3>
            <span className="text-sm text-gray-600">
              {mockLeaderboard.length} quiz masters
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {mockLeaderboard.map((entry) => (
            <div
              key={entry.user.id}
              className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${
                entry.rank <= 3 ? 'bg-gradient-to-r from-purple-50 to-blue-50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(entry.rank)}
                  </div>
                  
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={entry.user.avatar}
                      alt={entry.user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {entry.user.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Joined {new Date(entry.user.joinedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-8 text-sm">
                  <div className="text-center">
                    <div className="flex items-center text-yellow-600 mb-1">
                      <Trophy className="w-4 h-4 mr-1" />
                      <span className="font-semibold">{entry.points.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500">Points</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center text-blue-600 mb-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="font-semibold">{entry.level}</span>
                    </div>
                    <p className="text-xs text-gray-500">Level</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center text-purple-600 mb-1">
                      <Brain className="w-4 h-4 mr-1" />
                      <span className="font-semibold">{entry.quizzesCompleted}</span>
                    </div>
                    <p className="text-xs text-gray-500">Quizzes</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center text-green-600 mb-1">
                      <Award className="w-4 h-4 mr-1" />
                      <span className="font-semibold">{entry.badges}</span>
                    </div>
                    <p className="text-xs text-gray-500">Badges</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Callout */}
      <div className="mt-8 card p-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="text-center">
          <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <h3 className="text-xl font-semibold mb-2">Climb the Leaderboard!</h3>
          <p className="text-purple-100 mb-4">
            Complete quizzes, earn points, and unlock badges to improve your ranking.
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">+100</div>
              <div className="text-purple-100">Points per quiz</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">+50</div>
              <div className="text-purple-100">Bonus for perfect score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">+500</div>
              <div className="text-purple-100">Points per badge</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;