import type { JSX } from 'react';
import { DashboardIcon } from '@/icons/icons';

// Define the type for better IntelliSense and safety
export interface MenuItem {
  title: string;
  url: string;
  icon: JSX.Element;
}

export const menuItems: MenuItem[] = [
  {
    title: 'Bounties',
    url: '/bounties',
    icon: <DashboardIcon />,
  },
];
