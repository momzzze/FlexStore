import type { User } from '@/services/userService';
import PaginationComponent from '../PaginationComponent';
import { GenericTable } from '../table/GenericTable';

export const UserTable = ({
  data,
  loading,
  page,
  totalPages,
  limit,
  handlePageChange,
  handleLimitChange,
  onEditClick,
  onDeleteClick,
}: {
  data: User[];
  loading: boolean;
  page: number;
  totalPages: number;
  limit: number;
  handlePageChange: (newPage: number) => void;
  handleLimitChange: (newLimit: number) => void;
  onEditClick: (user: User) => void;
  onDeleteClick: (user: User) => void;
}) => {
  const columns = [
    { label: 'Username', render: (u: User) => u.username },
    { label: 'Email', render: (u: User) => u.email },
    { label: 'Role', render: (u: User) => u.role },
    { label: 'Status', render: (u: User) => u.status },
    {
      label: 'Created At',
      render: (u: User) => new Date(u.createdAt).toLocaleDateString(),
    },
    {
      label: 'Actions',
      render: (u: User) => (
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-sm rounded-md text-white px-4 py-1 hover:bg-blue-600"
            onClick={() => onEditClick(u)}
          >
            Edit
          </button>
          <button
            className="bg-red-600 text-sm rounded-md text-white px-2 py-1 hover:bg-red-700"
            onClick={() => onDeleteClick(u)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow max-h-[600px] overflow-y-auto">
      <GenericTable columns={columns} data={data} loading={loading} />
      <PaginationComponent
        page={page}
        totalPages={totalPages}
        limit={limit}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  );
};
