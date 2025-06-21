/*
  # Insert Sample Data for QuizMaster Platform

  1. Sample Badges
  2. Sample Quizzes with Questions
  3. Sample Admin User Profile

  Note: This is for development/demo purposes
*/

-- Insert sample badges
INSERT INTO badges (name, description, icon, criteria, rarity) VALUES
  ('First Quiz', 'Complete your first quiz', '🌟', 'Complete 1 quiz', 'common'),
  ('Quiz Master', 'Score 100% on 5 quizzes', '🏆', 'Perfect score on 5 quizzes', 'rare'),
  ('Knowledge Seeker', 'Complete 10 quizzes', '📚', 'Complete 10 quizzes', 'epic'),
  ('Programming Expert', 'Excel in programming quizzes', '💻', 'Score 90%+ on 3 programming quizzes', 'legendary'),
  ('Speed Demon', 'Complete a quiz in record time', '⚡', 'Complete quiz in under 50% of time limit', 'rare'),
  ('Perfectionist', 'Achieve perfect scores', '💎', 'Score 100% on any quiz', 'epic')
ON CONFLICT (name) DO NOTHING;

-- Insert sample quizzes (these will be created by admin users)
-- Note: The actual quiz insertion will be done through the admin interface
-- This is just to show the structure