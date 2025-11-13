import { CloseCircleIcon, TickCircleIcon, TimeIcon } from '@/icons/icons';

export interface StatusItem {
  id: number;
  name: string;
  icon: React.ReactNode;
}

export const statusItems: StatusItem[] = [
  {
    id: 0,
    name: 'Accepted',
    icon: <TickCircleIcon />,
  },
  {
    id: 1,
    name: 'In review',
    icon: <TimeIcon />,
  },
  {
    id: 2,
    name: 'Rejected',
    icon: <CloseCircleIcon />,
  },
];
