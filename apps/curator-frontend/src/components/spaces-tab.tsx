import { Button, Divider } from '@geo/design-system';
import React from 'react';

export function SpacesTab() {
  const spaces = [
    {
      imagePath: '/images/spaces-images/Health.png',
      name: 'Medicine',
      bountiesCount: 26,
    },
    {
      imagePath: '/images/spaces-images/Health.png',
      name: 'Health',
      bountiesCount: 15,
    },
    {
      imagePath: '/images/spaces-images/History.png',
      name: 'History',
      bountiesCount: 20,
    },
    {
      imagePath: '/images/spaces-images/Medicine.png',
      name: 'Medicine',
      bountiesCount: 15,
    },
    {
      imagePath: '/images/spaces-images/Podcasts.png',
      name: 'Podcasts',
      bountiesCount: 2,
    },
    {
      imagePath: '/images/spaces-images/Regions.png',
      name: 'Regions',
      bountiesCount: 2,
    },
  ];
  return (
    <div className="w-full mt-10">
      {spaces.map((space, idx) => (
        <React.Fragment key={`space_${space.name + idx + 1}`}>
          <SpaceCard imagePath={space.imagePath} name={space.name} bountiesCount={space.bountiesCount} />
          {idx !== spaces.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </div>
  );
}
interface SpaceItem {
  imagePath: string;
  name: string;
  bountiesCount: number;
}

interface SpaceCardProps extends SpaceItem {}
export function SpaceCard({ imagePath, name, bountiesCount }: SpaceCardProps) {
  return (
    <div className="flex flex-row items-center justify-between gap-5 w-full my-3">
      {/* Image */}
      <div className="w-[60px] h-[60px] rounded-[15px] relative flex-none overflow-hidden">
        <img src={imagePath} alt={name} className="object-cover object-center rounded-[15px] w-full h-full" />
      </div>

      {/* Info */}
      <div className="flex flex-col items-start gap-1 flex-grow">
        <div className="small-title text-dark-text">{name}</div>
        <div className="tag-text text-dark-text">{bountiesCount} bounties</div>
      </div>

      {/* Button */}
      <div className="flex flex-row items-center flex-none order-2">
        <Button variant="secondary">Join</Button>
      </div>
    </div>
  );
}
