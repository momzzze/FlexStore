import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
}
const token = localStorage.getItem('token');

const initialState: AuthState = {
  isAuthenticated: !!token,
  token: localStorage.getItem('token'),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
      state.isAuthenticated = true;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
