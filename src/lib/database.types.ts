export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          email: string
          role: 'student' | 'admin'
          avatar: string | null
          points: number
          level: number
          completed_quizzes: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          role?: 'student' | 'admin'
          avatar?: string | null
          points?: number
          level?: number
          completed_quizzes?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: 'student' | 'admin'
          avatar?: string | null
          points?: number
          level?: number
          completed_quizzes?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      quizzes: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          time_limit: number
          passing_score: number
          points: number
          created_by: string
          is_active: boolean
          attempts: number
          average_score: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          time_limit?: number
          passing_score?: number
          points?: number
          created_by: string
          is_active?: boolean
          attempts?: number
          average_score?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
          time_limit?: number
          passing_score?: number
          points?: number
          created_by?: string
          is_active?: boolean
          attempts?: number
          average_score?: number
          created_at?: string
          updated_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          quiz_id: string
          question: string
          type: 'multiple-choice' | 'true-false'
          options: Json | null
          correct_answer: number
          explanation: string
          points: number
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          quiz_id: string
          question: string
          type: 'multiple-choice' | 'true-false'
          options?: Json | null
          correct_answer: number
          explanation: string
          points?: number
          order_index: number
          created_at?: string
        }
        Update: {
          id?: string
          quiz_id?: string
          question?: string
          type?: 'multiple-choice' | 'true-false'
          options?: Json | null
          correct_answer?: number
          explanation?: string
          points?: number
          order_index?: number
          created_at?: string
        }
      }
      quiz_attempts: {
        Row: {
          id: string
          quiz_id: string
          user_id: string
          score: number
          answers: Json
          time_spent: number
          completed_at: string
        }
        Insert: {
          id?: string
          quiz_id: string
          user_id: string
          score: number
          answers: Json
          time_spent: number
          completed_at?: string
        }
        Update: {
          id?: string
          quiz_id?: string
          user_id?: string
          score?: number
          answers?: Json
          time_spent?: number
          completed_at?: string
        }
      }
      badges: {
        Row: {
          id: string
          name: string
          description: string
          icon: string
          criteria: string
          rarity: 'common' | 'rare' | 'epic' | 'legendary'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon: string
          criteria: string
          rarity: 'common' | 'rare' | 'epic' | 'legendary'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon?: string
          criteria?: string
          rarity?: 'common' | 'rare' | 'epic' | 'legendary'
          created_at?: string
        }
      }
      user_badges: {
        Row: {
          id: string
          user_id: string
          badge_id: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          badge_id: string
          earned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          badge_id?: string
          earned_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}