import { Tag } from '@geo/design-system';
import { BountyFilledIcon, DifficultyStarIcon } from '@/icons/icons';
import TagCard from './tag-card';

export function BountiesTab() {
  const bounties: BountyItem[] = [
    {
      category: { name: 'World affairs', image: '/images/world_affairs_icon.png' },
      points: '+3K',
      title: 'Fix errors and issues',
      description: 'Add golf players including information such as name, description, years active, tournaments played',
      maxContributors: '10',
      difficulty: 'Moderate',
    },
    {
      category: { name: 'Education', image: '/images/education_icon.png' },
      points: '+5K',
      title: 'Optimize API performance',
      description: 'Improve response times by 20% using caching and query tuning.',
      maxContributors: 'Unlimited',
      difficulty: 'Hard',
    },
    {
      category: { name: 'Health', image: '/images/health_icon.png' },
      points: '+2K',
      title: 'Redesign landing page',
      description: 'Modernize layout and improve accessibility compliance.',
      maxContributors: '5',
      difficulty: 'Easy',
    },
    {
      category: { name: 'Crypto', image: '/images/crypto_icon.png' },
      points: '+2K',
      title: 'Redesign landing page',
      description: 'Modernize layout and improve accessibility compliance.',
      maxContributors: '5',
      difficulty: 'Easy',
    },
    {
      category: { name: 'World affairs', image: '/images/world_affairs_icon.png' },
      points: '+3K',
      title: 'Fix errors and issues',
      description: 'Add golf players including information such as name, description, years active, tournaments played',
      maxContributors: '10',
      difficulty: 'Moderate',
    },
    {
      category: { name: 'Education', image: '/images/education_icon.png' },
      points: '+5K',
      title: 'Optimize API performance',
      description: 'Improve response times by 20% using caching and query tuning.',
      maxContributors: 'Unlimited',
      difficulty: 'Hard',
    },
    {
      category: { name: 'Health', image: '/images/health_icon.png' },
      points: '+2K',
      title: 'Redesign landing page',
      description: 'Modernize layout and improve accessibility compliance.',
      maxContributors: '5',
      difficulty: 'Easy',
    },
    {
      category: { name: 'Crypto', image: '/images/crypto_icon.png' },
      points: '+2K',
      title: 'Redesign landing page',
      description: 'Modernize layout and improve accessibility compliance.',
      maxContributors: '5',
      difficulty: 'Easy',
    },
    {
      category: { name: 'World affairs', image: '/images/world_affairs_icon.png' },
      points: '+3K',
      title: 'Fix errors and issues',
      description: 'Add golf players including information such as name, description, years active, tournaments played',
      maxContributors: '10',
      difficulty: 'Moderate',
    },
    {
      category: { name: 'Education', image: '/images/education_icon.png' },
      points: '+5K',
      title: 'Optimize API performance',
      description: 'Improve response times by 20% using caching and query tuning.',
      maxContributors: 'Unlimited',
      difficulty: 'Hard',
    },
    {
      category: { name: 'Health', image: '/images/health_icon.png' },
      points: '+2K',
      title: 'Redesign landing page',
      description: 'Modernize layout and improve accessibility compliance.',
      maxContributors: '5',
      difficulty: 'Easy',
    },
    {
      category: { name: 'Crypto', image: '/images/crypto_icon.png' },
      points: '+2K',
      title: 'Redesign landing page',
      description: 'Modernize layout and improve accessibility compliance.',
      maxContributors: '5',
      difficulty: 'Easy',
    },
    {
      category: { name: 'World affairs', image: '/images/world_affairs_icon.png' },
      points: '+3K',
      title: 'Fix errors and issues',
      description: 'Add golf players including information such as name, description, years active, tournaments played',
      maxContributors: '10',
      difficulty: 'Moderate',
    },
    {
      category: { name: 'Education', image: '/images/education_icon.png' },
      points: '+5K',
      title: 'Optimize API performance',
      description: 'Improve response times by 20% using caching and query tuning.',
      maxContributors: 'Unlimited',
      difficulty: 'Hard',
    },
    {
      category: { name: 'Health', image: '/images/health_icon.png' },
      points: '+2K',
      title: 'Redesign landing page',
      description: 'Modernize layout and improve accessibility compliance.',
      maxContributors: '5',
      difficulty: 'Easy',
    },
    {
      category: { name: 'Crypto', image: '/images/crypto_icon.png' },
      points: '+2K',
      title: 'Redesign landing page',
      description: 'Modernize layout and improve accessibility compliance.',
      maxContributors: '5',
      difficulty: 'Easy',
    },
    {
      category: { name: 'World affairs', image: '/images/world_affairs_icon.png' },
      points: '+3K',
      title: 'Fix errors and issues',
      description: 'Add golf players including information such as name, description, years active, tournaments played',
      maxContributors: '10',
      difficulty: 'Moderate',
    },
    {
      category: { name: 'Education', image: '/images/education_icon.png' },
      points: '+5K',
      title: 'Optimize API performance',
      description: 'Improve response times by 20% using caching and query tuning.',
      maxContributors: 'Unlimited',
      difficulty: 'Hard',
    },
    {
      category: { name: 'Health', image: '/images/health_icon.png' },
      points: '+2K',
      title: 'Redesign landing page',
      description: 'Modernize layout and improve accessibility compliance.',
      maxContributors: '5',
      difficulty: 'Easy',
    },
    {
      category: { name: 'Crypto', image: '/images/crypto_icon.png' },
      points: '+2K',
      title: 'Redesign landing page',
      description: 'Modernize layout and improve accessibility compliance.',
      maxContributors: '5',
      difficulty: 'Easy',
    },
    {
      category: { name: 'World affairs', image: '/images/world_affairs_icon.png' },
      points: '+3K',
      title: 'Fix errors and issues',
      description: 'Add golf players including information such as name, description, years active, tournaments played',
      maxContributors: '10',
      difficulty: 'Moderate',
    },
    {
      category: { name: 'Education', image: '/images/education_icon.png' },
      points: '+5K',
      title: 'Optimize API performance',
      description: 'Improve response times by 20% using caching and query tuning.',
      maxContributors: 'Unlimited',
      difficulty: 'Hard',
    },
    {
      category: { name: 'Health', image: '/images/health_icon.png' },
      points: '+2K',
      title: 'Redesign landing page',
      description: 'Modernize layout and improve accessibility compliance.',
      maxContributors: '5',
      difficulty: 'Easy',
    },
    {
      category: { name: 'Crypto', image: '/images/crypto_icon.png' },
      points: '+2K',
      title: 'Redesign landing page',
      description: 'Modernize layout and improve accessibility compliance.',
      maxContributors: '5',
      difficulty: 'Easy',
    },
    {
      category: { name: 'World affairs', image: '/images/world_affairs_icon.png' },
      points: '+3K',
      title: 'Fix errors and issues',
      description: 'Add golf players including information such as name, description, years active, tournaments played',
      maxContributors: '10',
      difficulty: 'Moderate',
    },
    {
      category: { name: 'Education', image: '/images/education_icon.png' },
      points: '+5K',
      title: 'Optimize API performance',
      description: 'Improve response times by 20% using caching and query tuning.',
      maxContributors: 'Unlimited',
      difficulty: 'Hard',
    },
    {
      category: { name: 'Health', image: '/images/health_icon.png' },
      points: '+2K',
      title: 'Redesign landing page',
      description: 'Modernize layout and improve accessibility compliance.',
      maxContributors: '5',
      difficulty: 'Easy',
    },
    {
      category: { name: 'Crypto', image: '/images/crypto_icon.png' },
      points: '+2K',
      title: 'Redesign landing page',
      description: 'Modernize layout and improve accessibility compliance.',
      maxContributors: '5',
      difficulty: 'Easy',
    },
  ];

  return (
    <div className="grid gap-4 py-4 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
      {bounties.map((item, index) => (
        <BountyCard key={`card_${index + 1}`} item={item} />
      ))}
    </div>
  );
}
interface BountyItem {
  category: {
    name: string;
    image: string;
  };
  points: string;
  title: string;
  description: string;
  maxContributors: string;
  difficulty: string;
}
interface BountyCardProps {
  item: BountyItem;
}

export function BountyCard({ item }: BountyCardProps) {
  return (
    <div
      className="flex flex-col justify-between items-start 
                 bg-white border border-grey-light rounded-2xl
                 p-5 gap-10
                 w-full max-w-sm
                 box-border relative"
    >
      <div className="flex flex-col items-start gap-5 w-full">
        <div className="flex flex-row justify-between items-center gap-6 w-full">
          <TagCard image={item.category.image} tag={item.category.name} action="" hasBackground={false} />
          <Tag variant="points" icon={<BountyFilledIcon />} text={item.points} />
        </div>

        <div className="flex flex-col items-start gap-2">
          <div className="w-full small-title">{item.title}</div>
          <div className="w-full body-copy text-gray-600">{item.description}</div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 w-full">
        <div className="flex flex-row justify-between items-start gap-1 w-full">
          <div className="tag-text flex items-center text-dark-text">Max contributors</div>
          <div className="flex flex-row items-center gap-1.5 tag-text text-dark-text">{item.maxContributors}</div>
        </div>

        <div className="flex flex-row justify-between items-start gap-1 w-full">
          <div className="tag-text text-dark-text">Difficulty</div>
          <div className="flex flex-row items-center gap-1.5">
            <DifficultyStarIcon /> {item.difficulty}
          </div>
        </div>
      </div>
    </div>
  );
}
