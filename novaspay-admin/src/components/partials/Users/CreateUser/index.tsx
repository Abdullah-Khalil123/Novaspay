import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { userSchema, type User } from '@/types/user';
import { useUserById, useUpdateUserInfo } from '@/hooks/useUsers'; // <-- hooks for API
import ImageUpload from '@/components/custom/ImageUpload';
import { handleFile } from '@/utils/handleFile';
import { Checkbox } from '@/components/ui/checkbox';

const CreateUser = ({ action }: { action?: 'create' | 'edit' }) => {
  const navigate = useNavigate();
  const userId = useParams().userId as string;
  const { data } = useUserById(userId);
  const userData: User = data?.data?.user;
  const user = userData;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      nickname: '',
      email: '',
      phone: '',
      status: 'active',
      two_factor_enabled: 1,
      preferred_currency: 'USD',
      vip_level: 'none',
      language: 'en',
      notification_settings: {},
    },
  });

  const { mutate: updateUser, isPending: isUpdatePending } =
    useUpdateUserInfo(userId);

  useEffect(() => {
    if (user && action === 'edit') {
      reset(user);
    }
  }, [user, action, reset]);

  const onSubmit = async (data: any) => {
    try {
      const payload = { ...data };
      payload.avatar = data.avatar ? await handleFile(data.avatar) : null;
      payload.two_factor_enabled = data.two_factor_enabled == true ? 1 : 0;
      if (action === 'edit') {
        updateUser(payload, {
          onSuccess: () => {
            toast.success('User updated successfully');
            navigate(-1);
          },
        });
      }
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error('Failed to save user');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">
        {action === 'edit' ? 'Edit User' : 'Create User'}
      </h1>
      <p className="text-muted-foreground">
        Fill in the details below to {action === 'edit' ? 'update' : 'create'} a
        user
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>User personal details</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Nickname *</Label>
              <Input placeholder="Enter nickname" {...register('nickname')} />
              {errors.nickname && (
                <Label className="text-red-500">
                  {errors.nickname.message}
                </Label>
              )}
            </div>

            <div className="space-y-2">
              <Label>Email *</Label>
              <Input
                type="email"
                placeholder="user@example.com"
                {...register('email')}
              />
              {errors.email && (
                <Label className="text-red-500">{errors.email.message}</Label>
              )}
            </div>

            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="+123456789" {...register('phone')} />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="banned">Banned</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Preferred Currency</Label>
              <Controller
                control={control}
                name="preferred_currency"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="PKR">PKR</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>VIP Level</Label>
              <Controller
                control={control}
                name="vip_level"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select VIP level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="bronze">Bronze</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="platinum">Platinum</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>2FA</Label>
              <Controller
                control={control}
                name="two_factor_enabled"
                render={({ field }) => (
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val === '1' ? 1 : 0);
                    }}
                    value={String(field.value == true ? 1 : 0)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select 2FA status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Enabled</SelectItem>
                      <SelectItem value="0">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Avatar</CardTitle>
            <CardDescription>Upload user profile picture</CardDescription>
          </CardHeader>
          <CardContent>
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  label="Avatar"
                  name="avatar"
                  register={register}
                  setValue={(file) => field.onChange(file)}
                  error={errors.avatar?.message as string}
                  defaultImage={user?.avatar as string}
                />
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>User preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              'email_notifications',
              'order_updates',
              'promotional_emails',
              'security_alerts',
              'weekly_newsletter',
            ].map((key) => (
              <div key={key} className="relative flex items-center space-x-3">
                <Controller
                  control={control}
                  name={`notification_settings.${key}` as any}
                  render={({ field }) => (
                    <Checkbox
                      id={key}
                      checked={field.value == 'true' || field.value == 1}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor={key} className="capitalize cursor-pointer">
                  {key.replace(/_/g, ' ')}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isUpdatePending}>
            {isUpdatePending
              ? 'Saving...'
              : action === 'edit'
              ? 'Update User'
              : 'Create User'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
