import { SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button'; // your existing hook
import { useIsMobile } from '@/hooks/use-mobile';

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
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1">
          {isMobile && <MobileToggleButton />}
          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
