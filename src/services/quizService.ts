import { supabase } from '../lib/supabase';
import { Quiz, Question, QuizAttempt } from '../types';

export const quizService = {
  async getQuizzes(): Promise<Quiz[]> {
    const { data: quizzes, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Get questions for each quiz
    const quizzesWithQuestions = await Promise.all(
      quizzes.map(async (quiz) => {
        const { data: questions, error: questionsError } = await supabase
          .from('questions')
          .select('*')
          .eq('quiz_id', quiz.id)
          .order('order_index');

        if (questionsError) throw questionsError;

        return {
          ...quiz,
          questions: questions.map(q => ({
            ...q,
            options: q.options as string[] || []
          }))
        };
      })
    );

    return quizzesWithQuestions;
  },

  async getQuizById(id: string): Promise<Quiz | null> {
    const { data: quiz, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('*')
      .eq('quiz_id', id)
      .order('order_index');

    if (questionsError) throw questionsError;

    return {
      ...quiz,
      questions: questions.map(q => ({
        ...q,
        options: q.options as string[] || []
      }))
    };
  },

  async createQuiz(quiz: Omit<Quiz, 'id' | 'created_at' | 'updated_at' | 'attempts' | 'average_score'>) {
    const { data: newQuiz, error } = await supabase
      .from('quizzes')
      .insert({
        title: quiz.title,
        description: quiz.description,
        category: quiz.category,
        difficulty: quiz.difficulty,
        time_limit: quiz.time_limit,
        passing_score: quiz.passing_score,
        points: quiz.points,
        created_by: quiz.created_by,
        is_active: quiz.is_active
      })
      .select()
      .single();

    if (error) throw error;

    // Insert questions
    if (quiz.questions.length > 0) {
      const questionsToInsert = quiz.questions.map((question, index) => ({
        quiz_id: newQuiz.id,
        question: question.question,
        type: question.type,
        options: question.options,
        correct_answer: question.correct_answer,
        explanation: question.explanation,
        points: question.points,
        order_index: index
      }));

      const { error: questionsError } = await supabase
        .from('questions')
        .insert(questionsToInsert);

      if (questionsError) throw questionsError;
    }

    return newQuiz;
  },

  async updateQuiz(id: string, updates: Partial<Quiz>) {
    const { data, error } = await supabase
      .from('quizzes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteQuiz(id: string) {
    const { error } = await supabase
      .from('quizzes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async submitQuizAttempt(attempt: Omit<QuizAttempt, 'id' | 'completed_at'>) {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .upsert({
        quiz_id: attempt.quiz_id,
        user_id: attempt.user_id,
        score: attempt.score,
        answers: attempt.answers,
        time_spent: attempt.time_spent
      })
      .select()
      .single();

    if (error) throw error;

    // Update quiz statistics
    await this.updateQuizStats(attempt.quiz_id);

    // Update user progress
    await this.updateUserProgress(attempt.user_id, attempt.quiz_id, attempt.score);

    return data;
  },

  async updateQuizStats(quizId: string) {
    const { data: attempts, error } = await supabase
      .from('quiz_attempts')
      .select('score')
      .eq('quiz_id', quizId);

    if (error) throw error;

    const totalAttempts = attempts.length;
    const averageScore = totalAttempts > 0 
      ? attempts.reduce((sum, attempt) => sum + attempt.score, 0) / totalAttempts 
      : 0;

    await supabase
      .from('quizzes')
      .update({
        attempts: totalAttempts,
        average_score: averageScore
      })
      .eq('id', quizId);
  },

  async updateUserProgress(userId: string, quizId: string, score: number) {
    const { data: user, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError) throw userError;

    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('points, passing_score')
      .eq('id', quizId)
      .single();

    if (quizError) throw quizError;

    // Calculate points earned
    const pointsEarned = score >= quiz.passing_score 
      ? Math.floor((score / 100) * quiz.points)
      : 0;

    // Update completed quizzes if not already completed
    const completedQuizzes = user.completed_quizzes || [];
    const newCompletedQuizzes = completedQuizzes.includes(quizId)
      ? completedQuizzes
      : [...completedQuizzes, quizId];

    // Calculate new level
    const newPoints = user.points + pointsEarned;
    const newLevel = Math.floor(newPoints / 500) + 1;

    await supabase
      .from('profiles')
      .update({
        points: newPoints,
        level: newLevel,
        completed_quizzes: newCompletedQuizzes
      })
      .eq('id', userId);
  },

  async getUserAttempts(userId: string): Promise<QuizAttempt[]> {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};