import { getUsers, type User } from '@/services/userService';
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
      });
  },
});

export const { setPage, setLimit } = usersSlice.actions;
export default usersSlice.reducer;
