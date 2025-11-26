import React from 'react';
import { GamifiedHeader } from '../components/referral/GamifiedHeader';
import { QuestPath } from '../components/referral/QuestPath';
import { AbilityCards } from '../components/referral/AbilityCards';
import { RewardChests } from '../components/referral/RewardChests';
import { ProgressLevels } from '../components/referral/ProgressLevels';
import { MissionsPanel } from '../components/referral/MissionsPanel';
import { AchievementWall } from '../components/referral/AchievementWall';
import { StreakTracker } from '../components/referral/StreakTracker';
import { Leaderboard } from '../components/referral/Leaderboard';
interface ReferralDashboardPageProps {
  onMenuClick: () => void;
}
export function ReferralDashboardPage({
  onMenuClick
}: ReferralDashboardPageProps) {
  return <div className="min-h-screen bg-gradient-to-b from-[#0a1a1f] via-[#0f2027] to-[#0a1a1f]">
      <GamifiedHeader onMenuClick={onMenuClick} />

      <main className="max-w-md mx-auto pb-8">
        <QuestPath />
        <AbilityCards />
        <RewardChests />
        <ProgressLevels />
        <MissionsPanel />
        <AchievementWall />
        <StreakTracker />
        <Leaderboard />
      </main>
    </div>;
}