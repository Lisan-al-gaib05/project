import { supabase } from '../lib/supabase';
import { Badge, UserBadge } from '../types';

export const badgeService = {
  async getBadges(): Promise<Badge[]> {
    const { data, error } = await supabase
      .from('badges')
      .select('*')
      .order('rarity', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getUserBadges(userId: string): Promise<UserBadge[]> {
    const { data, error } = await supabase
      .from('user_badges')
      .select(`
        *,
        badge:badges(*)
      `)
      .eq('user_id', userId)
      .order('earned_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async awardBadge(userId: string, badgeId: string) {
    const { data, error } = await supabase
      .from('user_badges')
      .insert({
        user_id: userId,
        badge_id: badgeId
      })
      .select()
      .single();

    if (error) {
      // Ignore duplicate badge awards
      if (error.code === '23505') return null;
      throw error;
    }

    return data;
  },

  async checkAndAwardBadges(userId: string) {
    // Get user stats
    const { data: user, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError) throw userError;

    const { data: attempts, error: attemptsError } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId);

    if (attemptsError) throw attemptsError;

    const { data: userBadges, error: badgesError } = await supabase
      .from('user_badges')
      .select('badge_id')
      .eq('user_id', userId);

    if (badgesError) throw badgesError;

    const earnedBadgeIds = userBadges.map(ub => ub.badge_id);

    // Check badge criteria
    const badges = await this.getBadges();
    const newBadges = [];

    for (const badge of badges) {
      if (earnedBadgeIds.includes(badge.id)) continue;

      let shouldAward = false;

      switch (badge.name) {
        case 'First Quiz':
          shouldAward = attempts.length >= 1;
          break;
        case 'Quiz Master':
          shouldAward = attempts.filter(a => a.score === 100).length >= 5;
          break;
        case 'Knowledge Seeker':
          shouldAward = attempts.length >= 10;
          break;
        case 'Perfectionist':
          shouldAward = attempts.some(a => a.score === 100);
          break;
        case 'Speed Demon':
          // Check if any quiz was completed in under 50% of time limit
          shouldAward = attempts.some(attempt => {
            // This would require quiz time_limit data in the attempt
            return attempt.time_spent < 450; // Assuming 15min quiz completed in under 7.5min
          });
          break;
      }

      if (shouldAward) {
        await this.awardBadge(userId, badge.id);
        newBadges.push(badge);
      }
    }

    return newBadges;
  }
};