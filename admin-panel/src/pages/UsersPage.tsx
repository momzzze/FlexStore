import { UserTable } from '@/components/users/UserTable';
import { toast } from 'sonner';
import type { AppDispatch, RootState } from '@/store';
import {
  fetchUsers,
  setPage,
  setLimit,
  fetchDeleteUser,
  fetchCreateUser,
  fetchUpdateUser,
} from '@/store/userSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserFormModal,
  type UserFormValues,
} from '@/components/users/UserFormModal';
import type { User } from '@/services/userService';
import { Button } from '@/components/ui/button';
import { ConfirmActionModal } from '@/components/ConfirmActionModal';

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserFormValues | null>(null);
  const [confirmDeleteUser, setConfirmDeleteUser] = useState<User | null>(null);

  const { users, loading, page, totalPages, limit } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers({ page, limit }));
  }, [dispatch, page, limit]);

  const handleCreateClick = () => {
    setSelectedUser(null);
    setShowUserModal(true);
  };

  const handleEditClick = (user: User) => {
    setSelectedUser({
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
    });
    setShowUserModal(true);
  };
  const handleSubmitUser = (data: UserFormValues) => {
    try {
      if (selectedUser) {
        if (!users) return;

        const userId = users.find(
          (u) => u.username === selectedUser.username
        )?.id;

        const userPayload = {
          username: data.username,
          email: data.email,
          name: data.name,
          password: data.password,
          role: data.role,
        };
        console.log('Updating user:', userId, userPayload);
        dispatch(fetchUpdateUser({ userId: userId!, user: userPayload }));
        toast.success('User updated successfully');
      } else {
        console.log('Creating user:', data);
        dispatch(fetchCreateUser(data));
        toast.success('User created successfully');
      }
      setShowUserModal(false);
    } catch (error) {
      toast.error('Error processing user');
      console.error('Error processing user:', error);
    }
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage({ data: newPage }));
  };

  const handleLimitChange = (newLimit: number) => {
    dispatch(setLimit({ data: newLimit }));
    dispatch(setPage({ data: 1 }));
  };
  const handleDeleteConfirm = () => {
    if (confirmDeleteUser) {
      dispatch(fetchDeleteUser(confirmDeleteUser.id));
      setConfirmDeleteUser(null);
    }
  };
  const deleteHandler = (user: User) => {
    dispatch(fetchDeleteUser(user.id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Users</h1>
      <div className="flex justify-end">
        <Button onClick={handleCreateClick}>Create User</Button>
      </div>
      <UserTable
        data={users}
        loading={loading}
        page={page}
        totalPages={totalPages}
        limit={limit}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
        onEditClick={handleEditClick}
        onDeleteClick={(user) => setConfirmDeleteUser(user)}
      />

      <UserFormModal
        open={showUserModal}
        onClose={() => {
          setShowUserModal(false);
          setSelectedUser(null);
        }}
        onSubmit={handleSubmitUser}
        initialData={selectedUser || undefined}
      />

      <ConfirmActionModal
        open={!!confirmDeleteUser}
        onClose={() => setConfirmDeleteUser(null)}
        onConfirm={handleDeleteConfirm}
        title="Confirm Deletion"
        description={`Are you sure you want to delete ${confirmDeleteUser?.username}?`}
        confirmLabel="Delete"
        variant="destructive"
      />
    </div>
  );
}
