import { CompleteProfileCard, CompleteTrainingCard, JoinSpaceCard } from './complete-profile-card';
import OnboardingChecklist from './onboarding-checklist';
import SectionTitle from './section-title';
import TitleWithSubtitle from './title-with-subtitle';

export default function OnBoardingDashboard() {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <SectionTitle number={0} />
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <CompleteProfileCard />
              <JoinSpaceCard />
              <CompleteTrainingCard />
            </div>
            <TitleWithSubtitle
              title={'My bounties'}
              subtitle={
                'Bounties are space tasks like adding, editing, or fixing data. Unlock bounties by joining a space.'
              }
            />
          </div>
          <div className="flex flex-col gap-6">
            <OnboardingChecklist />

            <TitleWithSubtitle title={'Community calls'} subtitle={'Join any space to see all upcoming calls'} />
          </div>
        </div>
      </div>
    </div>
  );
}
