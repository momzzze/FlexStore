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

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (key: keyof UserFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit User' : 'Create User'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Username"
            value={form.username}
            onChange={(e) => handleChange('username', e.target.value)}
          />
          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={form.password || ''}
            onChange={(e) => handleChange('password', e.target.value)}
          />

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
