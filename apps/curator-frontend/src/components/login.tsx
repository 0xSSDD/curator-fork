import { Button } from '@geo/design-system';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Login = () => {
  const { ready: privyReady, login: privyLogin, authenticated: privyAuthenticated } = usePrivy();
  const { navigate } = useRouter();

  useEffect(() => {
    if (privyAuthenticated) {
      navigate({ to: '/' });
    }
  }, [privyAuthenticated, navigate]);

  return (
    <Button
      disabled={!privyReady || privyAuthenticated}
      onClick={() => {
        privyLogin();
      }}
    >
      Sign in
    </Button>
  );
};
