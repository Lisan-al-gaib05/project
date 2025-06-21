export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar?: string;
  points: number;
  level: number;
  completed_quizzes: string[];
  created_at: string;
  updated_at: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: Question[];
  time_limit: number;
  passing_score: number;
  points: number;
  created_by: string;
  is_active: boolean;
  attempts: number;
  average_score: number;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  quiz_id: string;
  question: string;
  type: 'multiple-choice' | 'true-false';
  options?: string[];
  correct_answer: number;
  explanation: string;
  points: number;
  order_index: number;
  created_at: string;
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  user_id: string;
  score: number;
  answers: Record<string, string | number>;
  time_spent: number;
  completed_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  created_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  badge: Badge;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  points: number;
  level: number;
  badges: number;
  quizzes_completed: number;
}