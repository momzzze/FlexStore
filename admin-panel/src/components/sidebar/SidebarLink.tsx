import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

export const SidebarLink = ({ to, label, icon }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md transition-colors',
        isActive ? 'bg-muted text-primary' : 'hover:bg-muted'
      )}
    >
      {icon}
      <span className="truncate">{label}</span>
    </Link>
  );
};
