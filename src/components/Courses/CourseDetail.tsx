import React, { useState } from 'react';
import { Course, Module } from '../../types';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  Clock, 
  Users, 
  Star, 
  Trophy,
  BookOpen,
  Award
} from 'lucide-react';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
  onModuleSelect: (module: Module) => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack, onModuleSelect }) => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const handleModuleClick = (module: Module) => {
    setSelectedModule(module);
    onModuleSelect(module);
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    return colors[difficulty as keyof typeof colors] || colors.beginner;
  };

  const totalPoints = course.modules.reduce((sum, module) => sum + module.points, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Info */}
        <div className="lg:col-span-2">
          <div className="card overflow-hidden">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-64 object-cover"
            />
            
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-sm text-blue-600 font-medium">{course.category}</span>
                <span className={`badge ${getDifficultyColor(course.difficulty)}`}>
                  {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {course.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">{course.duration}</p>
                  <p className="text-xs text-gray-600">Duration</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">{course.enrolledStudents.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Students</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">{course.rating}</p>
                  <p className="text-xs text-gray-600">Rating</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Trophy className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">{totalPoints}</p>
                  <p className="text-xs text-gray-600">Points</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {course.instructor.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{course.instructor}</p>
                    <p className="text-xs text-gray-600">Course Instructor</p>
                  </div>
                </div>
              </div>

              <button className="w-full btn-primary py-3 text-lg font-medium">
                Enroll Now
              </button>
            </div>
          </div>
        </div>

        {/* Course Modules */}
        <div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Course Modules ({course.modules.length})
            </h3>

            <div className="space-y-3">
              {course.modules.map((module, index) => (
                <div
                  key={module.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                    module.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
                  }`}
                  onClick={() => handleModuleClick(module)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-medium text-gray-500 mr-3">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {module.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        ) : (
                          <Play className="w-4 h-4 text-blue-600 mr-2" />
                        )}
                      </div>
                      
                      <h4 className="font-medium text-gray-900 mb-1">{module.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {module.duration}
                        </div>
                        <div className="flex items-center">
                          <Award className="w-3 h-3 mr-1" />
                          {module.points} pts
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900">Course Progress</span>
                <span className="text-sm text-blue-700">
                  {Math.floor(Math.random() * 60 + 20)}%
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.floor(Math.random() * 60 + 20)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;