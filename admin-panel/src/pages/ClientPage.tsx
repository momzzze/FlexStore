import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { ClientsTable } from '@/components/table/ClientsTable';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';

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

export default function ClientsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<'name' | 'email' | 'status'>(
    'name'
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const filtered = useMemo(() => {
    return mockClients.filter(
      (client) =>
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filtered, sortField, sortOrder]);

  const paginated = useMemo(() => {
    return sorted.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [sorted, page]);

  const totalPages = Math.ceil(sorted.length / rowsPerPage);

  const handleSort = (field: typeof sortField) => {
    if (field === sortField) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Input
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-[300px]"
        />
      </div>

      <ClientsTable
        data={paginated}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
        onRowClick={(id) => navigate(`/clients/${id}`)}
      />
    </div>
  );
}
