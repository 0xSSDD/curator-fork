'use client';

import { Dialog } from '@base-ui-components/react/dialog';
import { Tooltip } from '@base-ui-components/react/tooltip';
import { cn } from '@geo/design-system';
import { useMatchRoute } from '@tanstack/react-router';
import * as React from 'react';
import { menuItems } from '@/data/menuItems';
import { useIsMobile } from '@/hooks/use-mobile';
import { BurgerMenuIcon, CloseSidebarIcon, LogoIcon, OpenSidebarIcon } from '@/icons/icons';

const SIDEBAR_COOKIE_NAME = 'curator_sidebar_state';
//const _SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '12rem';
const SIDEBAR_WIDTH_MOBILE = '14rem';
const SIDEBAR_WIDTH_ICON = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

type SidebarContextProps = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    async (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      try {
        await cookieStore.set(SIDEBAR_COOKIE_NAME, `${openState}`);
      } catch (error) {
        console.log(`Error setting cookie1: ${error}`);
      }
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? 'expanded' : 'collapsed';

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delay={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn('group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full', className)}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      {...props}
    />
  );
}
export function getSidebarMenuButtonClasses({
  variant = 'default',
  size = 'default',
}: {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}) {
  const base = 'sidebar-menu-button';

  const variantClasses: Record<string, string> = {
    default: 'variant-default',
    outline: 'variant-outline',
  };

  const sizeClasses: Record<string, string> = {
    default: 'size-default',
    sm: 'size-sm',
    lg: 'size-lg',
  };

  return [base, variantClasses[variant], sizeClasses[size]].join(' ');
}

function TooltipProvider({ delay = 0, ...props }: React.ComponentProps<typeof Tooltip.Root>) {
  return <Tooltip.Root data-slot="tooltip-provider" delay={delay} {...props} />;
}

export function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === 'none') {
    return (
      <div
        data-slot="sidebar"
        className={cn('bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
  if (isMobile) {
    return (
      <Dialog.Root open={openMobile} onOpenChange={setOpenMobile}>
        {/* Trigger can be your hamburger button somewhere else */}

        <Dialog.Portal>
          {/* Backdrop (dark overlay) */}
          <Dialog.Backdrop className="fixed inset-0 bg-black/50 z-40" />

          {/* Sidebar drawer popup */}
          <Dialog.Popup
            data-sidebar="sidebar"
            data-mobile="true"
            className={`Popup fixed top-0 left-0 h-full sidebar  bg-sidebar text-sidebar-foreground p-0 w-[var(--sidebar-width)] [&>button]:hidden z-40 shadow-lg transform transition-transform duration-700 ease-in-out ${
              openMobile ? 'translate-x-0' : '-translate-x-full'
            }`}
            style={{ '--sidebar-width': SIDEBAR_WIDTH_MOBILE } as React.CSSProperties}
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
  return (
    <div
      className="group peer hidden md:block "
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          // Adjust the padding for floating and inset variants.
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="sidebar-container group-variant-floating bg-sidebar"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn('w-full', className)}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn('flex w-full min-w-0 flex-col gap-1', className)}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn('group/menu-item relative', className)}
      {...props}
    />
  );
}

export function AppSidebar() {
  const matchRoute = useMatchRoute();
  const { state, isMobile } = useSidebar();
  const isExpanded = state === 'expanded';
  return (
    <Sidebar collapsible="icon">
      <CustomSidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = !!matchRoute({ to: item.url, fuzzy: false });
                return (
                  <SidebarMenuItem key={item.title} data-active={isActive}>
                    <a
                      data-active={isActive}
                      className={cn(
                        getSidebarMenuButtonClasses({ variant: 'default', size: 'default' }),
                        {
                          collapsed: !(isExpanded || isMobile),
                        },
                        'nav-link',
                      )}
                      href={item.url}
                    >
                      {item.icon}
                      {(isExpanded || isMobile) && <span className="nav-link">{item.title}</span>}
                    </a>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

interface CustomSidebarTriggerProps {
  className?: string;
}
export function CustomSidebarTrigger({ className }: CustomSidebarTriggerProps) {
  const { state, isMobile, toggleSidebar } = useSidebar();
  const isExpanded = state === 'expanded';

  return (
    <button
      onClick={toggleSidebar}
      type="button"
      className={cn(
        // Default internal styles
        'flex items-center justify-center rounded-xl transition-all hover:bg-muted',
        isMobile || isExpanded ? 'size-5' : 'size-8',
        // Merge user-defined styles
        className,
      )}
    >
      {isMobile ? <BurgerMenuIcon /> : isExpanded ? <CloseSidebarIcon /> : <OpenSidebarIcon />}
    </button>
  );
}
export function CustomSidebarHeader() {
  const { state, isMobile } = useSidebar(); // get "expanded" | "collapsed"

  const isExpanded = state === 'expanded';
  return (
    <SidebarHeader className="border-b border-gray-300 md:border-b-0 ">
      {(isExpanded || isMobile) && (
        <div className="flex justify-between items-center w-full relative ">
          {/* Logo / Icon */}
          {(isExpanded || isMobile) && (
            <div className="relative flex-none transition-all duration-200">
              <LogoIcon />
            </div>
          )}

          {/* Button */}
          <CustomSidebarTrigger className="relative h-[22px] p-0 flex-none" />
        </div>
      )}
      {!isExpanded && !isMobile && <CustomSidebarTrigger className="relative h-[22px] p-0 " />}
    </SidebarHeader>
  );
}
