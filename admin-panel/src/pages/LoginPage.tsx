import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/authService';
import { loginSuccess } from '@/store/authSlice';
import { useDispatch } from 'react-redux';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await authService.login(username, password);
      dispatch(loginSuccess({ token: response.token, user: response.user }));
      navigate('/');
    } catch (err: unknown) {
      console.error('Login error', err);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6 bg-card shadow-lg rounded-lg p-6">
        <div className="flex justify-center">
          <img src="/flex-store.png" alt="FlexStore" className="h-66 w-66" />
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <Input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
}
