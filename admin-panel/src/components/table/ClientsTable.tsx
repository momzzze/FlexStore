import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockClients = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@example.com',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Emily Johnson',
    email: 'emily@example.com',
    status: 'Pending',
  },
  {
    id: 5,
    name: 'William Davis',
    email: 'william@example.com',
    status: 'Active',
  },
];

const statusColor = {
  Active: 'bg-green-500',
  Pending: 'bg-yellow-500',
  Inactive: 'bg-red-500',
};

export function ClientsTable() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const rowsPerPage = 5;

  const filtered = mockClients.filter((client) => {
    const matchesFilter = filter === 'all' || client.status === filter;
    const matchesSearch =
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const paginated = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow space-y-4">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Clients</h2>
        <Input
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-72"
        />
      </div>

      <div className="px-4">
        <Tabs
          defaultValue="all"
          value={filter}
          onValueChange={(val) => {
            setFilter(val);
            setPage(1);
          }}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Active">Active</TabsTrigger>
            <TabsTrigger value="Inactive">Inactive</TabsTrigger>
            <TabsTrigger value="Pending">Pending</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.map((client) => (
            <TableRow
              key={client.id}
              onClick={() => navigate(`/clients/${client.id}`)}
              className="hover:bg-muted/30 cursor-pointer"
            >
              <TableCell>{client.id}</TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      statusColor[client.status]
                    }`}
                  ></span>
                  {client.status}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className={page === 1 ? 'pointer-events-none opacity-50' : ''}
            >
              Prev
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className={
                page === totalPages ? 'pointer-events-none opacity-50' : ''
              }
            >
              Next
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
