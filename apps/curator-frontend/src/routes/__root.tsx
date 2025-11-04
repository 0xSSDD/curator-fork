import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Header } from '@/components/header';
import { AppSidebar, SidebarProvider } from '@/components/sidebar';

const Root = () => {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        {/* Main content area */}
        <main className="flex-1 relative">
          <Header />
          <div className="sm:pt-16 md:pt-32 sm:px-4 md:px-8 lg:px-32">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export const Route = createRootRoute({
  component: Root,
});
