// components/ProjectTableContainer.tsx
import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';

export function ProjectTableContainer({ data, columns, title }: any) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const rowsPerPage = 10;
  const filtered = data.filter((row: any) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Filters go outside of the card */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-lg font-semibold">{title || 'Project Tasks'}</h2>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Input
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            className="w-full sm:w-64"
          />
          <Button variant="outline" className="w-full sm:w-auto">
            Customize Columns
          </Button>
          <Button variant="default" className="w-full sm:w-auto">
            + Add Section
          </Button>
        </div>
      </div>

      {/* Table inside the card */}
      <div className="rounded-xl overflow-hidden border bg-card">
        <Table>
          <TableHeader className="bg-muted text-muted-foreground">
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col.label}
                  className="text-muted-foreground font-semibold"
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((row, idx) => (
              <TableRow key={idx} className="border-b">
                {columns.map((col, i) => (
                  <TableCell key={i}>{col.render(row)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination className="p-4">
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="ghost"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </Button>
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <Button
                  variant={page === i + 1 ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              </PaginationItem>
            ))}
            <PaginationItem>
              <Button
                variant="ghost"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
