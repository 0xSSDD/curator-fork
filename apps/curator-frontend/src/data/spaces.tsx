export interface SpaceItem {
  id: string;
  name: string;
  imagePath: string;
  bountiesCount: number;
}

export const spaceItems: SpaceItem[] = [
  {
    id: '0',
    imagePath: '/images/spaces-images/all_spaces.png',
    name: 'All Spaces',
    bountiesCount: 26,
  },
  {
    id: '1',
    imagePath: '/images/spaces-images/Medicine.png',
    name: 'Medicine',
    bountiesCount: 26,
  },
  {
    id: '2',
    imagePath: '/images/spaces-images/Health.png',
    name: 'Health',
    bountiesCount: 15,
  },
  {
    id: '3',
    imagePath: '/images/spaces-images/History.png',
    name: 'History',
    bountiesCount: 20,
  },
  {
    id: '4',
    imagePath: '/images/spaces-images/Medicine.png',
    name: 'Medicine',
    bountiesCount: 15,
  },
  {
    id: '5',
    imagePath: '/images/spaces-images/Podcasts.png',
    name: 'Podcasts',
    bountiesCount: 2,
  },
  {
    id: '6',
    imagePath: '/images/spaces-images/Regions.png',
    name: 'Regions',
    bountiesCount: 2,
  },
];
