import './App.css';
import { Outlet } from 'react-router-dom';
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Home, Info, Menu, Settings } from 'lucide-react';
import { SidebarLink } from './components/sidebar/SidebarLink';
import { UserDropdown } from './components/sidebar/UserDropdown';
import { SidebarAccordion } from './components/sidebar/SidebarAccordion';
import { useState } from 'react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex overflow-hidden relative">
        {/* Sidebar (always rendered, hidden in mobile if closed) */}
        <Sidebar
          className={`z-50 bg-sidebar transition-transform duration-300
            fixed top-0 left-0 h-full w-64 shadow-lg md:static md:translate-x-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <SidebarContent className="flex flex-col justify-between h-full">
            <div>
              <SidebarHeader>
                <span className="font-bold text-lg">Admin Panel</span>
              </SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <SidebarLink
                      to="/"
                      label="Dashboard"
                      icon={<Home className="h-4 w-4" />}
                    />
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <SidebarLink
                      to="/about"
                      label="About"
                      icon={<Info className="h-4 w-4" />}
                    />
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarAccordion
                  icon={<Settings className="h-4 w-4" />}
                  label="Settings"
                  items={[
                    { to: '/settings/general', label: 'General' },
                    { to: '/settings/account', label: 'Account' },
                    { to: '/settings/notifications', label: 'Notifications' },
                  ]}
                />
              </SidebarMenu>
            </div>
            <div className="flex items-center justify-between p-7">
              <UserDropdown />
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Page content */}
        <div className="flex-1 min-h-screen overflow-x-hidden">
          <header className="flex justify-between items-center p-4 bg-background md:hidden">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu />
            </button>
            <span className="font-bold">Admin Panel</span>
          </header>
          <Outlet />
        </div>

        {/* Click-away background to close menu */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
          />
        )}
      </div>
    </SidebarProvider>
  );
}

export default App;
