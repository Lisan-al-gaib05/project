export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar?: string;
  points: number;
  level: number;
  badges: Badge[];
  completedQuizzes: string[];
  joinedDate: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: Question[];
  timeLimit: number;
  passingScore: number;
  points: number;
  createdBy: string;
  createdAt: string;
  attempts: number;
  averageScore: number;
  isActive: boolean;
}

export interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  points: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  answers: Record<string, string | number>;
  completedAt: string;
  timeSpent: number;
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

export interface LeaderboardEntry {
  rank: number;
  user: User;
  points: number;
  level: number;
  badges: number;
  quizzesCompleted: number;
}