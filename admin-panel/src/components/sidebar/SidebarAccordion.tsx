import { useState } from 'react';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // classnames utility
import { Link } from 'react-router-dom';

interface SidebarAccordionProps {
  icon: React.ReactNode;
  label: string;
  items: {
    to: string;
    label: string;
  }[];
}

export const SidebarAccordion = ({
  icon,
  label,
  items,
}: SidebarAccordionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        onClick={() => setOpen((prev) => !prev)}
        className="justify-between"
      >
        <div className="flex items-center gap-2 w-full">
          <div className="flex items-center gap-2">
            {icon}
            <span>{label}</span>
          </div>
          {open ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </div>
      </SidebarMenuButton>

      {open && (
        <div className="ml-8 mt-2 flex flex-col gap-1">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-2 text-sm rounded-md py-1.5 px-4 mx-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </SidebarMenuItem>
  );
};
