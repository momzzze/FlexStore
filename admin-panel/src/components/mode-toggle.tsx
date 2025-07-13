import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-1 px-2 py-1">
      <Button
        variant="ghost"
        className="justify-start"
        onClick={() => setTheme('light')}
      >
        Light
      </Button>
      <Button
        variant="ghost"
        className="justify-start"
        onClick={() => setTheme('dark')}
      >
        Dark
      </Button>
      <Button
        variant="ghost"
        className="justify-start"
        onClick={() => setTheme('system')}
      >
        System
      </Button>
    </div>
  );
}
