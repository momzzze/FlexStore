import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { changePassword } from '@/services/userService';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

export const ChangePasswordModal = ({
  open = false,
  onClose = () => {},
}: {
  open?: boolean;
  onClose?: () => void;
}) => {
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const { user } = useSelector((state: RootState) => state.auth);
  const [errors, setErrors] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };
  const handleClose = () => {
    setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setErrors({ oldPassword: '', newPassword: '', confirmPassword: '' });
    onClose();
  };

  const validate = () => {
    const newErrors = { oldPassword: '', newPassword: '', confirmPassword: '' };
    let valid = true;

    if (!form.oldPassword) {
      newErrors.oldPassword = 'Old password is required';
      valid = false;
    }
    if (!form.newPassword) {
      newErrors.newPassword = 'New password is required';
      valid = false;
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
      valid = false;
    }
    if (
      form.newPassword &&
      form.confirmPassword &&
      form.newPassword !== form.confirmPassword
    ) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      if (!user) return toast.error('User not found');

      const response = await changePassword(
        user.id,
        form.oldPassword,
        form.newPassword
      );
      if (response.success) {
        toast.success('Password updated successfully');
        onClose();
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Failed to change password');
    }
  };
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent>
        <DialogHeader>Change Password</DialogHeader>
        <div className="space-y-2">
          <Input
            name="oldPassword"
            type="password"
            placeholder="Old Password"
            value={form.oldPassword}
            onChange={handleChange}
            className={errors.oldPassword ? 'border-red-500' : ''}
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-sm">{errors.oldPassword}</p>
          )}

          <Input
            name="newPassword"
            type="password"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className={errors.newPassword ? 'border-red-500' : ''}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword}</p>
          )}

          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm New Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'border-red-500' : ''}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Update Password</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
