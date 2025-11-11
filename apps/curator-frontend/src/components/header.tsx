import { ActionPopover } from '@geo/design-system';
import { Tag } from '@geo/design-system/components/tag';
import { usePrivy } from '@privy-io/react-auth';
import { BountyFilledIcon } from '@/icons/icons';
import { Login } from './login';
import { CustomSidebarTrigger, useSidebar } from './sidebar';
export const Header = () => {
  const { authenticated: privyAuthenticated, logout: privyLogout } = usePrivy();
  const { isMobile } = useSidebar();

  const handleLogout = async () => {
    await privyLogout();
    window.location.href = '/';
  };
  const items = [
    {
      label: 'View profile',
      icon: null,
      onClick: () => alert('Profile Clicked'),
    },
    {
      label: 'Sign out',
      icon: null,
      onClick: () => handleLogout(),
    },
  ];
  return (
    <header
      className="bg-white absolute w-full top-0 left-0 flex items-center px-2 py-2  md:px-5 md:py-2 justify-start sm:justify-between
    border-b border-gray-300 md:border-b-0"
    >
      {isMobile && <CustomSidebarTrigger />}
      <div className="flex items-center gap-1 md:gap-2 text-sm md:text-base text-gray-500 ml-2 sm:ml-0">
        <span>Section</span>
        <span>/</span>
        <span className="text-gray-900">First Level</span>
      </div>
      {privyAuthenticated ? (
        <div className="flex items-center gap-2 md:gap-2 ml-auto sm:ml-0">
          <Tag variant="profile-points" icon={<BountyFilledIcon />} text="10,000" />
          <ActionPopover
            trigger={
              <div className="w-6 h-6 md:w-6 md:h-6 bg-white rounded-full">
                <img
                  src="/images/no_avatar_set.svg"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            }
            items={items}
          />
        </div>
      ) : (
        <div className="ml-auto sm:ml-2">
          <Login />
        </div>
      )}
    </header>
  );
};
