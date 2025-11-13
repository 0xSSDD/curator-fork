import { Tag } from '@geo/design-system';
import { createFileRoute } from '@tanstack/react-router';
import { DescriptionCard, InfoCard, SubmissionsTable } from '@/components/bounty-details';
import SectionTitle from '@/components/section-title';
import TagCard from '@/components/tag-card';
import { spaceItems } from '@/data/spaces';
import { statusItems } from '@/data/statusItems';
import {
  BountyFilledIcon,
  CalenderIcon,
  CreatorIcon,
  DifficultyStarIcon,
  EffortIcon,
  SkillIcon,
  SpaceIcon,
} from '@/icons/icons';

export const Route = createFileRoute('/bounty-details')({
  component: RouteComponent,
});

function RouteComponent() {
  const data = [
    {
      proposalName: 'Added 30 unique crypto projects, Added 30 unique crypto projects, Added 30 unique crypto projects',
      creator: 'Alice',
      status: statusItems[0],
      payout: '$5,000',
    },
    {
      proposalName: 'Added 19 projects',
      creator: 'Bob',
      status: statusItems[1],
      payout: '$3,200',
    },
    {
      proposalName: 'Added 1 project',
      creator: 'Charlie',
      status: statusItems[0],
      payout: '$0',
    },
    {
      proposalName: 'Added 1 project',
      creator: 'Charlie',
      status: statusItems[2],
      payout: '$11,000',
    },
  ];
  return (
    <div className="flex flex-col gap-6 px-8 md:px-16 lg:px-32">
      <SectionTitle content={<span className="main-title">Publish unique crypto projects</span>} />
      <Tag variant="active" text="Active" />
      <InfoCard
        items={[
          { label: 'Reward', value: '20,000', icon: <BountyFilledIcon /> },
          { label: 'Active until', value: 'Nov 30, 2025', icon: <CalenderIcon /> },
          { label: 'Difficulty', value: 'Medium', icon: <DifficultyStarIcon /> },
          { label: 'Effort', value: 'Moderate', icon: <EffortIcon /> },
          {
            label: 'Skills',
            value: (
              <div className="flex flex-row gap-1">
                <Tag variant="skill" text="Scraping" />
                <Tag variant="skill" text="Publishing" />
              </div>
            ),
            spanRows: 3,
            icon: <SkillIcon />,
          },
          {
            label: 'Space',
            value: (
              <TagCard
                image={spaceItems?.[1]?.imagePath}
                imgSize={4}
                tag={spaceItems?.[1]?.name}
                action=""
                hasBackground={false}
              />
            ),
            icon: <SpaceIcon />,
          },
          {
            label: 'Created by',
            value: (
              <TagCard image={'/images/mini_profile.png'} imgSize={4} tag={'Nik'} action="" hasBackground={false} />
            ),
            icon: <CreatorIcon />,
          },
          { label: 'Max contributors', description: 'Max contributors description', value: '3' },
          { label: 'Interested', description: 'Interested description', value: '486' },
          { label: 'Allocated', description: 'Allocated description', value: '2' },
          { label: 'Submissions', description: 'Submissions description', value: '1' },
        ]}
      />
      <DescriptionCard />
      <SubmissionsTable submissions={data} />
    </div>
  );
}
