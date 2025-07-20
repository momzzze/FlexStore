import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { GenericTable } from '@/components/table/GenericTable';
import {
  fetchUsers,
  fetchUserPermissions,
  fetchUpdateUserPermissions,
  setLimit,
  setPage,
} from '@/store/userSlice';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { User } from '@/services/userService';
import PaginationComponent from '@/components/PaginationComponent';

const ALL_PERMISSIONS = [
  'view_users',
  'create_users',
  'edit_users',
  'delete_users',
  'read_clients',
  'edit_clients',
];

export default function PermissionsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, permissions, permissionsLoading, page, limit, totalPages } =
    useSelector((state: RootState) => state.users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPermissions, setCurrentPermissions] = useState<string[]>([]);
  const [permissionsDraft, setPermissionsDraft] = useState<
    Record<number, string[]>
  >({});
  console.log('users', users);

  useEffect(() => {
    dispatch(fetchUsers({ page, limit }));
  }, [dispatch, page, limit]);
  useEffect(() => {
    const draft: Record<number, string[]> = {};
    users.forEach((user) => {
      draft[user.id] = user.permissions ?? [];
    });
    setPermissionsDraft(draft);
  }, [users]);

  useEffect(() => {
    if (selectedUser?.id) {
      dispatch(fetchUserPermissions(selectedUser.id));
    }
  }, [dispatch, selectedUser]);

  useEffect(() => {
    if (selectedUser?.id && permissions[selectedUser.id]) {
      setCurrentPermissions(permissions[selectedUser.id]);
    }
  }, [permissions, selectedUser]);

  const handleSave = (userId: number) => {
    const permsToSave = permissionsDraft[userId] ?? permissions[userId] ?? [];
    dispatch(fetchUpdateUserPermissions({ userId, permissions: permsToSave }))
      .unwrap()
      .then(() => toast.success(`Permissions updated for user ${userId}`))
      .catch(() => toast.error('Failed to update permissions'));
  };
  const handleTogglePermission = (userId: number, perm: string) => {
    setPermissionsDraft((prev) => {
      const current = prev[userId] || permissions[userId] || [];
      const updated = current.includes(perm)
        ? current.filter((p) => p !== perm)
        : [...current, perm];
      return { ...prev, [userId]: updated };
    });
  };

  const columns = [
    { label: 'Username', render: (user: User) => user.username },
    { label: 'Email', render: (user: User) => user.email },
    {
      label: 'Permissions',
      render: (user: User) => (
        <div className="flex flex-row flex-wrap gap-2">
          {ALL_PERMISSIONS.map((perm) => (
            <div
              key={perm}
              className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm font-medium text-foreground hover:bg-muted/80 transition-colors"
            >
              <input
                type="checkbox"
                className="appearance-none w-4 h-4 border border-primary rounded-full checked:bg-primary checked:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                checked={(permissionsDraft[user.id] ?? []).includes(perm)}
                onChange={() => handleTogglePermission(user.id, perm)}
              />
              <label className="cursor-pointer">{perm.replace('_', ' ')}</label>
            </div>
          ))}
          <Button
            size="sm"
            className="ml-2"
            disabled={permissionsLoading}
            onClick={() => handleSave(user.id)}
          >
            Save
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Permissions</h1>

      <div className="rounded-xl border bg-card text-card-foreground shadow max-h-[600px] overflow-y-auto">
        <GenericTable
          columns={columns}
          data={users}
          onRowClick={(user) => setSelectedUser(user)}
          selectedRowId={selectedUser?.id}
          loading={permissionsLoading}
        />

        <PaginationComponent
          page={page}
          totalPages={totalPages}
          limit={limit}
          onPageChange={(newPage) => dispatch(setPage({ data: newPage }))}
          onLimitChange={(newLimit) => dispatch(setLimit({ data: newLimit }))}
        />
      </div>

      <div className="w-1/3 space-y-4">
        {selectedUser && (
          <>
            <h2 className="font-semibold text-lg">
              Edit Permissions for {selectedUser.username}
            </h2>
            <div className="space-y-2">
              {ALL_PERMISSIONS.map((perm) => (
                <div key={perm} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={currentPermissions.includes(perm)}
                    onChange={() => handleTogglePermission(perm)}
                  />
                  <label>{perm}</label>
                </div>
              ))}
            </div>
            <Button
              onClick={handleSave}
              className="mt-4"
              disabled={permissionsLoading}
            >
              Save Permissions
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
