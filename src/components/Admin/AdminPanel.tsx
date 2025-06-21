import React, { useState, useEffect } from 'react';
import { Quiz, Question } from '../../types';
import { quizService } from '../../services/quizService';
import { leaderboardService } from '../../services/leaderboardService';
import { 
  Users, 
  Brain, 
  BarChart3, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Trophy,
  TrendingUp,
  Save,
  X
} from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'quizzes' | 'users' | 'analytics'>('overview');
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quizForm, setQuizForm] = useState({
    title: '',
    description: '',
    category: 'Programming',
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    timeLimit: 900,
    passingScore: 70,
    points: 100,
    questions: [] as Question[]
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [quizzesData, leaderboardData] = await Promise.all([
        quizService.getAllQuizzes(),
        leaderboardService.getLeaderboard()
      ]);
      setQuizzes(quizzesData);
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'quizzes', label: 'Quizzes', icon: Brain },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  const totalUsers = leaderboard.length;
  const totalQuizzes = quizzes.length;
  const totalAttempts = quizzes.reduce((sum, quiz) => sum + (quiz.attempts || 0), 0);
  const avgScore = quizzes.length > 0 ? Math.round(quizzes.reduce((sum, quiz) => sum + (quiz.averageScore || 0), 0) / quizzes.length) : 0;

  const stats = [
    { label: 'Total Users', value: totalUsers, icon: Users, color: 'blue', change: '+12%' },
    { label: 'Active Quizzes', value: totalQuizzes, icon: Brain, color: 'green', change: '+3%' },
    { label: 'Total Attempts', value: totalAttempts, icon: Trophy, color: 'purple', change: '+8%' },
    { label: 'Avg Score', value: `${avgScore}%`, icon: TrendingUp, color: 'yellow', change: '+2%' }
  ];

  const handleCreateQuiz = () => {
    setShowCreateQuiz(true);
    setQuizForm({
      title: '',
      description: '',
      category: 'Programming',
      difficulty: 'beginner',
      timeLimit: 900,
      passingScore: 70,
      points: 100,
      questions: []
    });
  };

  const handleEditQuiz = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setQuizForm({
      title: quiz.title,
      description: quiz.description,
      category: quiz.category,
      difficulty: quiz.difficulty,
      timeLimit: quiz.timeLimit,
      passingScore: quiz.passingScore,
      points: quiz.points,
      questions: quiz.questions
    });
    setShowCreateQuiz(true);
  };

  const handleSaveQuiz = async () => {
    try {
      if (editingQuiz) {
        await quizService.updateQuiz(editingQuiz.id, quizForm);
      } else {
        await quizService.createQuiz(quizForm);
      }
      setShowCreateQuiz(false);
      setEditingQuiz(null);
      loadData(); // Reload data
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await quizService.deleteQuiz(quizId);
        loadData(); // Reload data
      } catch (error) {
        console.error('Error deleting quiz:', error);
      }
    }
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      points: 10
    };
    setQuizForm(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    setQuizForm(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const removeQuestion = (index: number) => {
    setQuizForm(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Quiz Attempts</h3>
          <div className="space-y-3">
            {leaderboard.slice(0, 5).map((entry, index) => (
              <div key={index} className="flex items-center space-x-3">
                <img
                  src={entry.user?.avatar || `https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400`}
                  alt={entry.user?.name || 'User'}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{entry.user?.name || 'Anonymous'}</p>
                  <p className="text-xs text-gray-600">Completed a quiz</p>
                </div>
                <span className="text-xs text-gray-500">Recent</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Quizzes</h3>
          <div className="space-y-3">
            {quizzes.slice(0, 5).map((quiz) => (
              <div key={quiz.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{quiz.title}</p>
                  <p className="text-xs text-gray-600">{quiz.attempts || 0} attempts</p>
                </div>
                <span className="text-sm font-medium text-gray-900">{quiz.averageScore || 0}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuizzes = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Quiz Management</h3>
        <button onClick={handleCreateQuiz} className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create Quiz
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quiz
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attempts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quizzes.map((quiz) => (
                <tr key={quiz.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
                      <div className="text-sm text-gray-600">{quiz.questions?.length || 0} questions</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge bg-blue-100 text-blue-800">{quiz.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`badge ${
                      quiz.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      quiz.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {quiz.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(quiz.attempts || 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quiz.averageScore || 0}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditQuiz(quiz)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteQuiz(quiz.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quizzes Completed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboard.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={entry.user?.avatar || `https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400`}
                        alt={entry.user?.name || 'User'}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{entry.user?.name || 'Anonymous'}</div>
                        <div className="text-sm text-gray-600">{entry.user?.email || 'No email'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`badge ${
                      entry.user?.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {entry.user?.role || 'student'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(entry.points || 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.quizzesCompleted || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.user?.joinedDate ? new Date(entry.user.joinedDate).toLocaleDateString() : 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Analytics Dashboard</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Quiz Completion Trends</h4>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Quiz completion over time</p>
          </div>
        </div>
        
        <div className="card p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Score Distribution</h4>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Score distribution across quizzes</p>
          </div>
        </div>
        
        <div className="card p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Category Performance</h4>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Performance by category</p>
          </div>
        </div>
        
        <div className="card p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">User Engagement</h4>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder - Daily/weekly active users</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuizForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingQuiz ? 'Edit Quiz' : 'Create New Quiz'}
            </h2>
            <button
              onClick={() => setShowCreateQuiz(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={quizForm.title}
                onChange={(e) => setQuizForm(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Quiz title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={quizForm.category}
                onChange={(e) => setQuizForm(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Programming">Programming</option>
                <option value="Frontend Development">Frontend Development</option>
                <option value="Backend Development">Backend Development</option>
                <option value="Security">Security</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={quizForm.description}
              onChange={(e) => setQuizForm(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Quiz description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={quizForm.difficulty}
                onChange={(e) => setQuizForm(prev => ({ ...prev, difficulty: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Limit (minutes)</label>
              <input
                type="number"
                value={Math.floor(quizForm.timeLimit / 60)}
                onChange={(e) => setQuizForm(prev => ({ ...prev, timeLimit: parseInt(e.target.value) * 60 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Passing Score (%)</label>
              <input
                type="number"
                value={quizForm.passingScore}
                onChange={(e) => setQuizForm(prev => ({ ...prev, passingScore: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
              <input
                type="number"
                value={quizForm.points}
                onChange={(e) => setQuizForm(prev => ({ ...prev, points: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Questions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Questions</h3>
              <button
                onClick={addQuestion}
                className="btn-primary text-sm flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Question
              </button>
            </div>

            <div className="space-y-4">
              {quizForm.questions.map((question, index) => (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Question {index + 1}</h4>
                    <button
                      onClick={() => removeQuestion(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                      <input
                        type="text"
                        value={question.question}
                        onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter question"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {question.options?.map((option, optionIndex) => (
                        <div key={optionIndex}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Option {optionIndex + 1} {optionIndex === question.correctAnswer && '(Correct)'}
                          </label>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...(question.options || [])];
                                newOptions[optionIndex] = e.target.value;
                                updateQuestion(index, 'options', newOptions);
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder={`Option ${optionIndex + 1}`}
                            />
                            <button
                              onClick={() => updateQuestion(index, 'correctAnswer', optionIndex)}
                              className={`px-3 py-2 rounded-lg text-sm ${
                                optionIndex === question.correctAnswer
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              ✓
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Explanation</label>
                      <textarea
                        value={question.explanation}
                        onChange={(e) => updateQuestion(index, 'explanation', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Explain the correct answer"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => setShowCreateQuiz(false)}
            className="btn-secondary px-6 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveQuiz}
            className="btn-primary px-6 py-2 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {editingQuiz ? 'Update Quiz' : 'Create Quiz'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'quizzes':
        return renderQuizzes();
      case 'users':
        return renderUsers();
      case 'analytics':
        return renderAnalytics();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-600">
          Manage quizzes, users, and monitor platform analytics.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="card p-1 mb-8">
        <nav className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      {renderContent()}

      {/* Quiz Form Modal */}
      {showCreateQuiz && renderQuizForm()}
    </div>
  );
};

export default AdminPanel;