import Login from '@/components/partials/Login';
import { loginSchema } from '@/types/user';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: 'admin@example.com',
      password: 'password123',
    },
  });

  function onSubmit(data: { username: string; password: string }) {
    mutate(
      { email: data.username, password: data.password },
      {
        onSuccess: (data) => {
          dispatch(
            setCredentials({
              token: data.token,
              isAuthenticated: true,
            })
          );
          toast.success('Login successful!');
          navigate('/admin');
        },
        onError: (error: any) => {
          console.error('Login error:', error);
          toast.error('Login failed. Please check your credentials.');
        },
      }
    );
  }

  return (
    <div>
      <Login form={form} onSubmit={onSubmit} isPending={isPending} />
    </div>
  );
};

export default LoginPage;
