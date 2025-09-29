import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { UseFormReturn } from 'react-hook-form';
import type { LoginSchema } from '@/types/user';

interface LoginProps {
  form: UseFormReturn<LoginSchema>;
  onSubmit: (data: any) => void;
  isPending?: boolean;
}

export default function Login({ form, onSubmit, isPending }: LoginProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <Card className="w-full max-w-sm shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                required
                {...form.register('username')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                {...form.register('password')}
              />
            </div>
            <Button
              className="w-full cursor-pointer"
              type="submit"
              disabled={isPending}
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
