import { SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button'; // your existing hook
import { useIsMobile } from '@/hooks/use-mobile';
import { BreadcrumbProvider } from '@/contexts/BreadcrumbContext';
import Breadcrumbs from '@/components/Breadcrumbs';

function MobileToggleButton() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="md:hidden flex items-center justify-between p-4 shadow-sm bg-background">
      <Button variant="ghost" size="icon" onClick={toggleSidebar}>
        <Menu />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    </header>
  );
}

export default function Layout() {
  const isMobile = useIsMobile();

  return (
    <BreadcrumbProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1 w-full p-6 overflow-auto">
            {isMobile && <MobileToggleButton />}
            <Breadcrumbs />
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </BreadcrumbProvider>
  );
}
