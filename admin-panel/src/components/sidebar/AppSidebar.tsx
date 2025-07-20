// src/components/sidebar/AppSidebar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import { Home, Settings, Info, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { UserDropdown } from './UserDropdown';
import clsx from 'clsx';
import { X } from 'lucide-react';

export function AppSidebar({ onClose }: { onClose?: () => void }) {
  const location = useLocation();
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="w-64 h-screen border-r bg-background">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 md:hidden"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      <SidebarHeader className="flex justify-between p-7">
        Admin Panel
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-1 px-2 py-2">
        <SidebarMenu className="space-y-1">
          {/* Dashboard */}
          <SidebarMenuItem>
            <Link to="/">
              <SidebarMenuButton
                className={clsx(
                  'w-full px-4 py-2 rounded-md hover:bg-accent transition-all',
                  isActive('/') && 'bg-accent text-foreground font-semibold'
                )}
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          {/* About */}
          <SidebarMenuItem>
            <Link to="/about">
              <SidebarMenuButton
                className={clsx(
                  'w-full px-4 py-2 rounded-md hover:bg-accent transition-all',
                  isActive('/about') &&
                    'bg-accent text-foreground font-semibold'
                )}
              >
                <Info className="w-4 h-4 mr-2" />
                About
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          {/* Clients */}
          <SidebarMenuItem>
            <Link to="/clients">
              <SidebarMenuButton
                className={clsx(
                  'w-full px-4 py-2 rounded-md hover:bg-accent transition-all',
                  isActive('/clients') &&
                    'bg-accent text-foreground font-semibold'
                )}
              >
                <Users className="w-4 h-4 mr-2" />
                Clients
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          {/* Settings Collapsible */}
          <SidebarMenuItem>
            <Collapsible defaultOpen className="group/collapsible">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className={clsx(
                    'w-full px-4 py-2 rounded-md hover:bg-accent transition-all',
                    isActive('/settings') &&
                      'bg-accent text-foreground font-semibold'
                  )}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent className="pl-6 mt-1 space-y-1">
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <Link to="/settings/users">
                      <SidebarMenuButton
                        className={clsx(
                          'w-full px-3 py-1.5 rounded-md text-sm hover:bg-accent',
                          isActive('/settings/users') &&
                            'bg-accent text-foreground font-medium'
                        )}
                      >
                        Users
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <Link to="/settings/permissions">
                      <SidebarMenuButton
                        className={clsx(
                          'w-full px-3 py-1.5 rounded-md text-sm hover:bg-accent',
                          isActive('/settings/permissions') &&
                            'bg-accent text-foreground font-medium'
                        )}
                      >
                        Permissions
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <Link to="/settings/profile">
                      <SidebarMenuButton
                        className={clsx(
                          'w-full px-3 py-1.5 rounded-md text-sm hover:bg-accent',
                          isActive('/settings/profile') &&
                            'bg-accent text-foreground font-medium'
                        )}
                      >
                        Profile
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="flex justify-between p-7">
        <UserDropdown />
      </SidebarFooter>
    </Sidebar>
  );
}
