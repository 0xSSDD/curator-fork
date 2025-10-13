import { useHypergraphAuth } from '@graphprotocol/hypergraph-react';
import { createRootRoute, Link, Outlet, useLayoutEffect, useRouter } from '@tanstack/react-router';

const Root = () => {
  const { authenticated } = useHypergraphAuth();
  const router = useRouter();

  useLayoutEffect(() => {
    // Don't redirect on login page
    if (router.state.location.href.startsWith('/login')) {
      return;
    }

    // Only redirect to login if not authenticated and not already on login page
    if (!authenticated) {
      router.navigate({
        to: '/login',
      });
    }
  }, [authenticated, router]);

  return (
    <>
      <header>
        <h1>
          <Link to="/" className="text-2xl font-bold hover:text-blue-600">
            Curator
          </Link>
        </h1>
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
