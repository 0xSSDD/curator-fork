import AddToCalenederIcon from '../icons/add_to_calender.svg?react';
import BountyIcon from '../icons/bounty.svg?react';
import BountyFilledIcon from '../icons/bounty_filled.svg?react';
import BurgerMenuIcon from '../icons/burger_menu.svg?react';
import CloseIcon from '../icons/close_icon.svg?react';
import CloseSidebarIcon from '../icons/close_sidebar.svg?react';
import CompletedIcon from '../icons/completed.svg?react';
import DifficultyStarIcon from '../icons/difficulty_star.svg?react';
import GoingArrowIcon from '../icons/going_arrow.svg?react';
import GrayCircleIcon from '../icons/gray_circle.svg?react';
import HoriDotsIcon from '../icons/hori_dots_icon.svg?react';
import IdProfileIcon from '../icons/id_profile.svg?react';
import LogoIcon from '../icons/logo.svg?react';
import OpenSidebarIcon from '../icons/open_sidebar.svg?react';
import DashboardIcon from '../icons/overview.svg?react';
import RecurringIcon from '../icons/recurring_icon.svg?react';
import UnComletedIcon from '../icons/uncompleted.svg?react';

function CheckIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg fill="currentcolor" width="10" height="10" viewBox="0 0 10 10" {...props}>
      <title>check</title>
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}
function ChevronDownIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {' '}
      <title>down</title>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
function ClearIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>clear</title>
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

export {
  HoriDotsIcon,
  RecurringIcon,
  IdProfileIcon,
  CompletedIcon,
  GrayCircleIcon,
  CloseSidebarIcon,
  BountyFilledIcon,
  BurgerMenuIcon,
  LogoIcon,
  OpenSidebarIcon,
  DashboardIcon,
  UnComletedIcon,
  BountyIcon,
  DifficultyStarIcon,
  AddToCalenederIcon,
  GoingArrowIcon,
  CloseIcon,
  ClearIcon,
  ChevronDownIcon,
  CheckIcon,
};
