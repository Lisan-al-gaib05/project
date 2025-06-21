import { supabase } from '../lib/supabase';
import { LeaderboardEntry } from '../types';

export const leaderboardService = {
  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .order('points', { ascending: false })
      .limit(100);

    if (error) throw error;

    // Get badge counts for each user
    const leaderboard = await Promise.all(
      profiles.map(async (profile, index) => {
        const { data: userBadges, error: badgesError } = await supabase
          .from('user_badges')
          .select('id')
          .eq('user_id', profile.id);

        if (badgesError) throw badgesError;

        return {
          rank: index + 1,
          user: profile,
          points: profile.points,
          level: profile.level,
          badges: userBadges.length,
          quizzes_completed: profile.completed_quizzes.length
        };
      })
    );

    return leaderboard;
  }
};