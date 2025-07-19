import { UserTable } from '@/components/users/UserTable';
import PaginationComponent from '@/components/PaginationComponent';
import type { AppDispatch, RootState } from '@/store';
import { fetchUsers, setPage, setLimit } from '@/store/userSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, page, totalPages, limit } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers({ page, limit }));
  }, [dispatch, page, limit]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage({ data: newPage }));
  };

  const handleLimitChange = (newLimit: number) => {
    dispatch(setLimit({ data: newLimit }));
    dispatch(setPage({ data: 1 }));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Users</h1>
      <UserTable
        data={users}
        loading={loading}
        page={page}
        totalPages={totalPages}
        limit={limit}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
      />
    </div>
  );
}
