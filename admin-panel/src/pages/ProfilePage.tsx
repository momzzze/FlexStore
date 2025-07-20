import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import { toast } from 'sonner';
import { useState } from 'react';
import { AvatarDropzone } from '@/components/AvatarDropzone';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useTheme } from '@/components/theme-provider';
import { ChangePasswordModal } from '@/components/ChangePasswordModal';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { setTheme } = useTheme();

  const [form, setForm] = useState({
    username: user?.name || '',
    email: user?.email || '',
    name: user?.name || '',
  });

  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    toast.success('Profile updated (mock)');
  };

  return (
    <div className="p-6 mx-auto w-full max-w-full space-y-6">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>

      <Card className="p-8">
        <div className="flex flex-col md:flex-row gap-10 w-full">
          <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
            <AvatarDropzone
              initialAvatar="/avatar.png"
              userInitials={user?.name?.slice(0, 2).toUpperCase() || 'UN'}
            />
            <Button
              variant="outline"
              onClick={() => setShowChangePassword(true)}
              className="w-full"
            >
              Change Password
            </Button>
          </div>

          {/* Right */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <h2 className="font-semibold text-lg">Profile Details</h2>
            <div className="space-y-3">
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
              />
              <Input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
              />
              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>

            <Button onClick={handleSubmit} className="mt-4">
              Save Changes
            </Button>
          </div>
        </div>
      </Card>

      <ChangePasswordModal
        open={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </div>
  );
}
