import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockBadges, mockCourses } from '../../data/mockData';
import { 
  User, 
  Trophy, 
  Award, 
  BookOpen, 
  Calendar,
  Target,
  TrendingUp,
  Star,
  Edit,
  Mail,
  MapPin
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const completedCourses = mockCourses.filter(course => 
    user?.completedCourses.includes(course.id)
  );

  const earnedBadges = mockBadges.slice(0, 8); // Mock earned badges

  const stats = [
    { label: 'Total Points', value: user?.points || 0, icon: Trophy, color: 'text-yellow-600' },
    { label: 'Level', value: user?.level || 1, icon: Target, color: 'text-blue-600' },
    { label: 'Badges Earned', value: earnedBadges.length, icon: Award, color: 'text-purple-600' },
    { label: 'Courses Completed', value: completedCourses.length, icon: BookOpen, color: 'text-green-600' }
  ];

  const handleSaveProfile = () => {
    if (user) {
      updateUser(editForm);
      setIsEditing(false);
    }
  };

  const getBadgeRarityColor = (rarity: string) => {
    const colors = {
      common: 'bg-gray-100 border-gray-300',
      rare: 'bg-blue-100 border-blue-300',
      epic: 'bg-purple-100 border-purple-300',
      legendary: 'bg-yellow-100 border-yellow-300'
    };
    return colors[rarity as keyof typeof colors] || colors.common;
  };

  const getNextLevelPoints = () => {
    return (user?.level || 1) * 500;
  };

  const getLevelProgress = () => {
    const currentLevelPoints = ((user?.level || 1) - 1) * 500;
    const nextLevelPoints = getNextLevelPoints();
    const progressPoints = (user?.points || 0) - currentLevelPoints;
    const levelRange = nextLevelPoints - currentLevelPoints;
    return Math.min((progressPoints / levelRange) * 100, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-1">
          <div className="card p-6 mb-6">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                    <User className="w-12 h-12 text-white" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    (user?.level || 1) >= 10 ? 'bg-purple-600' : 
                    (user?.level || 1) >= 5 ? 'bg-blue-600' : 'bg-green-600'
                  }`}>
                    {user?.level || 1}
                  </div>
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Full Name"
                  />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveProfile}
                      className="btn-primary flex-1 py-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn-secondary flex-1 py-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{user?.name}</h2>
                  <p className="text-gray-600 mb-4">{user?.email}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-secondary text-sm px-4 py-2 flex items-center mx-auto"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                Joined {new Date(user?.joinedDate || '').toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {user?.email}
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Level Progress
            </h3>
            
            <div className="text-center mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Level {user?.level || 1}</span>
                <span>Level {(user?.level || 1) + 1}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${getLevelProgress()}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {Math.max(0, getNextLevelPoints() - (user?.points || 0))} points to next level
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="card p-4 text-center">
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Badges */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Badges ({earnedBadges.length})
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg text-center border-2 ${getBadgeRarityColor(badge.rarity)} hover:scale-105 transform transition-all duration-200`}
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h4 className="font-medium text-gray-900 text-sm mb-1">{badge.name}</h4>
                  <p className="text-xs text-gray-600">{badge.description}</p>
                  <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                    badge.rarity === 'legendary' ? 'bg-yellow-200 text-yellow-800' :
                    badge.rarity === 'epic' ? 'bg-purple-200 text-purple-800' :
                    badge.rarity === 'rare' ? 'bg-blue-200 text-blue-800' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {badge.rarity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Courses */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Completed Courses ({completedCourses.length})
            </h3>
            
            <div className="space-y-4">
              {completedCourses.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start space-x-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-medium text-gray-900 mb-1">{course.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{course.category}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                          {course.rating}
                        </div>
                        <div>Completed</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mb-2">
                        Completed
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        +{course.modules.reduce((sum, module) => sum + module.points, 0)} pts
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {completedCourses.length === 0 && (
              <div className="text-center py-8">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No completed courses yet</h4>
                <p className="text-gray-600">Start learning to see your progress here!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;