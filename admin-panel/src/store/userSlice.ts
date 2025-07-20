import {
  createUser,
  deleteUser,
  getUserPermissions,
  getUsers,
  updateUser,
  updateUserPermissions,
  type User,
} from '@/services/userService';
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  permissions: Record<number, string[]>; // userId -> permissions
  permissionsLoading: boolean;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  permissions: {},
  permissionsLoading: false,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page, limit }: { page: number; limit: number }) => {
    return await getUsers(page, limit);
  }
);

export const fetchDeleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: number) => {
    return await deleteUser(userId);
  }
);

export const fetchCreateUser = createAsyncThunk(
  'users/createUser',
  async (
    user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<{ success: boolean; data: User }> => {
    return await createUser(user);
  }
);

export const fetchUpdateUser = createAsyncThunk(
  'users/updateUser',
  async ({
    userId,
    user,
  }: {
    userId: number;
    user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
  }) => {
    return await updateUser(userId, user);
  }
);

export const fetchUserPermissions = createAsyncThunk(
  'users/fetchUserPermissions',
  async (userId: number) => {
    return await getUserPermissions(userId);
  }
);

export const fetchUpdateUserPermissions = createAsyncThunk(
  'users/updateUserPermissions',
  async ({
    userId,
    permissions,
  }: {
    userId: number;
    permissions: string[];
  }) => {
    return await updateUserPermissions(userId, permissions);
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload.data;
    },
    setLimit(state, action: PayloadAction<{ data: number }>) {
      state.limit = action.payload.data;
      state.page = 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(fetchDeleteUser.fulfilled, (state, action) => {
        const deletedUser = action.payload.data;
        state.users = state.users.filter((user) => user.id !== deletedUser.id);
      })
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        const user = action.payload.data;
        state.users.push(user);
        state.total += 1;
        state.totalPages = Math.ceil(state.total / state.limit);
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.data;
        const index = state.users.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(fetchUserPermissions.pending, (state) => {
        state.permissionsLoading = true;
      })
      .addCase(fetchUserPermissions.fulfilled, (state, action) => {
        const userId = action.meta.arg;
        state.permissions[userId] = action.payload;
        state.permissionsLoading = false;
      })
      .addCase(fetchUserPermissions.rejected, (state) => {
        state.permissionsLoading = false;
      })
      .addCase(fetchUpdateUserPermissions.fulfilled, (state, action) => {
        const userId = action.meta.arg.userId;
        state.permissions[userId] = action.payload.data;
      });
  },
});

export const { setPage, setLimit } = usersSlice.actions;
export default usersSlice.reducer;
