import { useForm } from 'react-hook-form';
import { forgotPassword, sendForgetOTP } from '@/actions/auth';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Switch from '@/components/custom/toggleTheme';

const forgotPasswordSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    verificationCode: z
      .string()
      .min(6, 'Verification code must be 6 characters'),
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be at most 20 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const ForgotPasswordPage = () => {
  const [isOTPSent, setIsOTPSent] = useState(false);

  useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
      verificationCode: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: any) {
    console.log('Reset password data:', data);
    setIsLoading(true);
    try {
      await forgotPassword({
        email: data.email,
        verificationCode: data.verificationCode,
        newPassword: data.newPassword,
      });
      toast.success('Password reset successful!');
      new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        navigate('/user/login');
      });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(
        error?.response?.data?.message ||
          'Password reset failed. Please try again.'
      );
      console.error('Password reset failed:', error);
    }
  }

  const watchedEmail = watch('email');
  async function sendOTP() {
    if (!watchedEmail || !watchedEmail.includes('@')) {
      toast.error('Please enter a valid email address first');
      return;
    }
    setIsOTPSent(true);
    try {
      await sendForgetOTP(watchedEmail);
      toast.success('OTP sent to your email!');
    } catch (error) {
      setIsOTPSent(false);
      toast.error('Failed to send OTP. Please try again.');
      console.error('Sending OTP failed:', error);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Section: Welcome Message (Dark Background) */}
      <div className="w-1/2 text-white bg-sidebar-bg flex items-center justify-center p-8">
        <h1 className="text-3xl font-bold">Welcome to the system</h1>
      </div>

      {/* Right Section: Forgot Password Form (Darker Background) */}
      <div className="w-1/2 bg-login-bg text-text-primary flex flex-col justify-between p-8">
        <div className="flex justify-end w-full">
          <Switch />
        </div>

        <div className="flex flex-col items-center justify-center flex-grow">
          <h2 className="font-serif text-3xl font-bold mb-8 text-center">
            Reset your password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            <div className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-sm text-text-primary mb-1"
                >
                  <span className="text-red-500">*</span> Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="p-2 border border-border rounded-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Verification Code */}
              <div className="flex flex-col">
                <label
                  htmlFor="verificationCode"
                  className="text-sm text-text-primary mb-1"
                >
                  <span className="text-red-500">*</span> Verification code
                </label>
                <div className="flex">
                  <input
                    {...register('verificationCode')}
                    type="text"
                    id="verificationCode"
                    placeholder="Input OTP"
                    className="flex-grow p-2 border border-border text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      isOTPSent ? toast('OTP already sent') : sendOTP();
                    }}
                    className="px-4 bg-light-gray font-sans py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    Send OTP
                  </button>
                </div>
                {errors.verificationCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.verificationCode.message}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="flex flex-col">
                <label
                  htmlFor="newPassword"
                  className="text-sm text-text-primary mb-1"
                >
                  <span className="text-red-500">*</span> New Password
                </label>
                <input
                  {...register('newPassword')}
                  type="password"
                  id="newPassword"
                  placeholder="New Password"
                  className="p-2 border border-border rounded-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm text-text-primary mb-1"
                >
                  <span className="text-red-500">*</span> Confirm Password
                </label>
                <input
                  {...register('confirmPassword')}
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className="p-2 border border-border rounded-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Reset Password Button */}
              <button
                type="submit"
                className="mt-6 text-sm w-full py-2 bg-sidebar-child text-white rounded-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                disabled={isLoading}
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>

              {/* Back to login link */}
              <div
                onClick={() => navigate('/user/login')}
                className="text-center hover:bg-light-gray cursor-pointer flex border border-border justify-center py-2 gap-2 text-gray-400 text-sm mt-2"
              >
                Remember your password?{' '}
                <div className="text-blue-400 hover:underline">Go to login</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
