import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormValues) => void;
  initialData?: UserFormValues;
}

export interface UserFormValues {
  username: string;
  email: string;
  password?: string;
  name: string;
  role: string;
}

export const UserFormModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: UserFormModalProps) => {
  const [form, setForm] = useState<UserFormValues>({
    username: '',
    email: '',
    password: '',
    name: '',
    role: 'user',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserFormValues, string>>
  >({});

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        username: '',
        email: '',
        password: '',
        name: '',
        role: 'user',
      });
    }
  }, [initialData, open]);

  const validateForm = () => {
    if (!form.username.trim()) return 'Username is required';
    if (!form.email.trim() || !form.email.includes('@'))
      return 'Valid email is required';
    if (!form.name.trim()) return 'Name is required';
    if (!initialData && !form.password?.trim()) return 'Password is required';
    return null;
  };

  const handleChange = (key: keyof UserFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const handleSubmit = () => {
    const newErrors: typeof errors = {};

    if (!form.username) newErrors.username = 'Username is required';
    if (!form.name) newErrors.name = 'Name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Invalid email address';
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!initialData && !form.password) {
      newErrors.password = 'Password is required';
    } else if (!initialData && !passwordRegex.test(form.password || '')) {
      newErrors.password =
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit(form);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit User' : 'Create User'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Username */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Username</label>
            <Input
              placeholder="Username"
              value={form.username}
              onChange={(e) => handleChange('username', e.target.value)}
              className={errors.username ? 'border-red-500' : ''}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <Input
              placeholder="Email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Name</label>
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Password</label>
            <Input
              placeholder="Password"
              type="password"
              value={form.password || ''}
              onChange={(e) => handleChange('password', e.target.value)}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Role</label>
            <Select
              value={form.role}
              onValueChange={(val) => handleChange('role', val)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? 'Update' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
