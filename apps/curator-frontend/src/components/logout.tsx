import { Button } from '@geo/design-system';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from '@tanstack/react-router';

export function Logout() {
  const { logout: privyLogout } = usePrivy();
  const router = useRouter();

  const handleLogout = () => {
    privyLogout();
    router.navigate({
      to: '/',
    });
  };

  return (
    <Button type="button" onClick={handleLogout}>
      Logout
    </Button>
  );
}
