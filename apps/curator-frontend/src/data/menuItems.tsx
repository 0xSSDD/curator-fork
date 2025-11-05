import type { JSX } from 'react';
import BountyIcon from '../icons/bounty.svg?react';
import DashboardIcon from '../icons/overview.svg?react';

// Define the type for better IntelliSense and safety
export interface MenuItem {
  title: string;
  url: string;
  icon: JSX.Element;
}

export const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    url: '/',
    icon: <BountyIcon />,
  },
  {
    title: 'Bounties',
    url: '#',
    icon: <DashboardIcon />,
  },
  {
    title: 'Design Demo',
    url: '/design-system',
    icon: <DashboardIcon />,
  },
];
