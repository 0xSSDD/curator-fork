import { Button } from '@geo/design-system';
import { usePrivy } from '@privy-io/react-auth';

export function Logout() {
  const { logout: privyLogout } = usePrivy();

  const handleLogout = async () => {
    await privyLogout();
    window.location.href = '/';
  };

  return (
    <Button type="button" onClick={handleLogout}>
      Logout
    </Button>
  );
}
