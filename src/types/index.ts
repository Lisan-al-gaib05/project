export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar?: string;
  points: number;
  level: number;
  badges: Badge[];
  progress: Record<string, number>;
  completedCourses: string[];
  joinedDate: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  modules: Module[];
  enrolledStudents: number;
  rating: number;
  image: string;
  instructor: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: string;
  duration: string;
  quizId?: string;
  completed?: boolean;
  points: number;
}

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  questions: Question[];
  timeLimit: number;
  passingScore: number;
}

export interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  points: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  badge?: Badge;
  completedAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  points: number;
  level: number;
  badges: number;
}