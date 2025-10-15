import { usePrivy } from '@privy-io/react-auth';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { Login } from '@/components/login';
import { Logout } from '@/components/logout';

const Root = () => {
  const { authenticated: privyAuthenticated } = usePrivy();

  return (
    <>
      <header className="flex justify-between items-center p-4">
        <h1>
          <Link to="/" className="text-2xl hover:text-blue-600">
            Curator
          </Link>
        </h1>
        {privyAuthenticated ? <Logout /> : <Login />}
      </header>
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </>
  );
};

export const Route = createRootRoute({
  component: Root,
});
