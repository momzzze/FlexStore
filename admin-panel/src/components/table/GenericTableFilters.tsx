import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
export function GenericTableFilters({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (val: string) => void;
}) {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h2 className="text-lg font-semibold">Project Tasks</h2>
      <div className="flex gap-2">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button variant="outline">Customize Columns</Button>
        <Button variant="default">+ Add Section</Button>
      </div>
    </div>
  );
}
