import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
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
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
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
      });
  },
});

export const { setPage, setLimit } = usersSlice.actions;
export default usersSlice.reducer;
