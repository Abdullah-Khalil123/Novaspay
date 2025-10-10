import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { adminSchema, type Admin } from '@/types/admin';
import { useCreateAdmin, useAdminById, useUpdateAdmin } from '@/hooks/useAdmin';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

type AdminFormValues = z.infer<typeof adminSchema>;

const AdminCreate = ({ action = 'create' }: { action?: 'create' | 'edit' }) => {
  const params = useParams();
  const adminId = params.id ? parseInt(params.id, 10) : null;

  const { data: adminData } = useAdminById(
    action === 'edit' && adminId ? (adminId as number) : 0
  );

  const navigate = useNavigate();
  const { mutate: createAdmin, isPending: isCreating } = useCreateAdmin();
  const { mutate: updateAdmin } = useUpdateAdmin(adminId as number);

  const admin: Admin = adminData || undefined;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminFormValues>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (action === 'edit' && admin) {
      reset({
        name: admin.name,
        email: admin.email,
        password: '', // Don't populate password for security
      });
    }
  }, [admin, action, reset]);

  async function onSubmit(values: AdminFormValues) {
    try {
      // For edit, only include password if it was changed
      const submitData =
        action === 'edit' && !values.password
          ? { name: values.name, email: values.email }
          : values;

      if (action === 'create') {
        createAdmin(submitData, {
          onSuccess: () => {
            toast.success('Admin created successfully!');
            navigate('/admin/admins');
          },
          onError: (error: any) => {
            toast.error(`Failed to create admin: ${error.message}`);
          },
        });
      } else if (action === 'edit' && adminId) {
        updateAdmin(submitData, {
          onSuccess: () => {
            toast.success('Admin updated successfully!');
            navigate('/admin/admins');
          },
          onError: (error: any) => {
            toast.error(`Failed to update admin: ${error.message}`);
          },
        });
      }
    } catch (error: any) {
      toast.error(`An unexpected error occurred: ${error.message}`);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {action === 'create' ? 'Create Admin' : 'Edit Admin'}
        </h1>
        <p className="text-muted-foreground mt-2">
          Fill in the details below to{' '}
          {action === 'create' ? 'create a new' : 'edit this'} admin user.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Admin Details</CardTitle>
            <CardDescription>Provide admin user information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" {...register('name')} placeholder="John Doe" />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Password{' '}
                {action === 'create' ? '*' : '(leave blank to keep current)'}
              </Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                placeholder={
                  action === 'create' ? 'Enter password' : 'Enter new password'
                }
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/admins')}
          >
            Cancel
          </Button>
          <Button size="lg" type="submit" disabled={isCreating}>
            {isCreating && <Loader2Icon className="animate-spin mr-2" />}
            {action === 'create' ? 'Create Admin' : 'Update Admin'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminCreate;
