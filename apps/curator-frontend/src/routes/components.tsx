import { createFileRoute } from '@tanstack/react-router';
import { InfoCard } from '@/components/bounty-details';
import { EditProfile } from '@/components/edit-profile';
import OnBoardingDashboard from '@/components/onboarding-dashboard';
import RsvpToNonRecurringDashboard from '@/components/rsvp-to-nonrecurring-dashboard';
import {
  BountyFilledIcon,
  CalenderIcon,
  CreatorIcon,
  DifficultyStarIcon,
  EffortIcon,
  SkillIcon,
  SpaceIcon,
} from '@/icons/icons';

export const Route = createFileRoute('/components')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <article className="flex flex-col gap-8">
      <h1>Component test page</h1>
      <section>
        <InfoCard
          items={[
            { label: 'Reward', value: '20,000', icon: <BountyFilledIcon /> },
            { label: 'Active until', value: 'Nov 30, 2025', icon: <CalenderIcon /> },
            { label: 'Difficulty', value: 'Medium', icon: <DifficultyStarIcon /> },
            { label: 'Effort', value: 'Moderate', icon: <EffortIcon /> },
            { label: 'Skills', value: 'UX Design, Research', spanRows: 3, icon: <SkillIcon /> },
            { label: 'Space', value: 'Design Department', icon: <SpaceIcon /> },
            { label: 'Created by', value: 'John Doe', icon: <CreatorIcon /> },
            { label: 'Max contributors', description: 'Max contributors description', value: '3' },
            { label: 'Interested', description: 'Interested description', value: '486' },
            { label: 'Allocated', description: 'Allocated description', value: '2' },
            { label: 'Submissions', description: 'Submissions description', value: '1' },
          ]}
        />
      </section>
      <section>
        <RsvpToNonRecurringDashboard />
      </section>
      <section>
        <OnBoardingDashboard />
      </section>
      <section className="box">
        <EditProfile
          onSubmit={(data) => {
            console.log('Form submitted:', data);
          }}
        />
      </section>
    </article>
  );
}
