import { User, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/types/user';
import { login } from '@/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { setCredentials } from '@/store/slices/auth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Switch from '@/components/custom/toggleTheme';

const LoginPage = () => {
  useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [_isLoading, _setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: any) {
    _setIsLoading(true);
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });
      dispatch(
        setCredentials({
          token: response.token,
          isAuthenticated: true,
          user: response.user || null,
        })
      );
      toast.success('Login successful!');
      await new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        navigate('/index');
      });
      _setIsLoading(false);
    } catch (error) {
      _setIsLoading(false);
      toast.error('Login failed. Please check your credentials and try again.');
      console.error('Login failed:', error);
      throw error;
    }
  }
  return (
    <div className="flex">
      <div className="w-1/2 h-screen flex flex-col justify-between p-8">
        <h2 className="font-bold text-lg">Novaspay</h2>
        <div className="flex flex-col items-center">
          <img src="/login.jpeg" alt="" className="w-80" />
          <h1 className="text-xl">Agent Login System</h1>
        </div>
        <p className="text-sm">
          Novaspay is a technology service provider specializing in payment and
          account integration solutions. We offer technical API connectivity and
          infrastructure support to financial institutions and platform
          partners. NovaSpay does not directly engage in fund custody or
          settlement activities; all regulated financial services are provided
          by our licensed financial partners.
        </p>
      </div>
      <div className="w-1/2">
        <div className="p-4 bg-login-bg h-screen flex flex-col justify-between items-center">
          <div className="flex justify-end w-full">
            <Switch />
          </div>
          <div>
            <h2 className="font-bold text-3xl mb-8 text-center">
              Email sign in
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2 w-[480px]">
                <div className="relative">
                  <User
                    className="absolute top-1/2 -translate-y-1/2 left-2"
                    size={18}
                  />
                  <input
                    {...register('email')}
                    type="text"
                    placeholder="Please Input your Email"
                    className="border h-9 rounded-sm border-border pl-8 w-full"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
                <div className="relative">
                  <Lock
                    className="absolute top-1/2 -translate-y-1/2 left-2"
                    size={16}
                  />
                  <input
                    {...register('password')}
                    type="password"
                    placeholder="Please Input your Password"
                    className="border h-9 rounded-sm border-border pl-8 w-full"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex justify-between text-sm my-4">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" />
                  <span className="ml-2 select-none">Remember me</span>
                </label>
                <a href="/user/forgot">Forgot Password</a>
              </div>
              <button className="text-sm rounded-sm w-full bg-sidebar-bg/90 cursor-pointer text-button-text py-2">
                {_isLoading ? 'Loading...' : 'Sign in'}
              </button>

              <button
                onClick={() => navigate('/company/create-account-login')}
                className="text-sm rounded-sm mt-4 w-full border border-border hover:bg-sidebar-child/20 cursor-pointer py-2"
              >
                Sign Up
              </button>
            </form>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
