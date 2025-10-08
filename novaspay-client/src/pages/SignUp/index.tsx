import { Controller, useForm } from 'react-hook-form';
import { registerUser, sendVerificationOTP } from '@/actions/auth'; // Assuming a new action for registration
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { toast } from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Select from '@/components/custom/SelectG';
import { countries } from '@/utils/country';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = z.object({
  accountType: z.string().nonempty('Account type is required'),
  name: z.string().min(2, 'Company name must be at least 2 characters'),
  country: z.string().nonempty('Country is required'),
  email: z.string().email('Invalid email address'),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters'),
  invitationCode: z.string().min(6, 'Invitation code must be 6 characters'),
  verificationCode: z.string().min(6, 'Verification code must be 6 characters'),
});

const EnterpriseRegisterPage = () => {
  const [searchParams] = useSearchParams();
  const invitationCode = searchParams.get('invitationCode') || '';
  const [isOTPSent, setIsOTPSent] = useState(false);

  useSelector((state: RootState) => state.auth); // Still including but might not be directly relevant for a pure register page
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Changed _isLoading to isLoading for consistency
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      accountType: '',
      name: '',
      country: '',
      email: '',
      password: '',
      invitationCode: invitationCode || '',
    },
  });

  async function onSubmit(data: any) {
    console.log('Registration data:', data);
    setIsLoading(true);
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        country: data.country,
        accountType: data.accountType,
        invitationCode: data.invitationCode,
      });
      toast.success('Registration successful!');
      new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        navigate('/user/login');
      });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(
        error?.response?.data?.error || 'Registration failed. Please try again.'
      );
      console.error('Registration failed:', error);
    }
  }

  const watchedEmail = watch('email');
  async function sendOTP() {
    setIsOTPSent(true);
    try {
      await sendVerificationOTP(watchedEmail);
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
      <div className="w-1/2 text-text-primary flex items-center justify-center p-8">
        <h1 className="text-3xl font-bold">Welcome to the system</h1>
      </div>

      {/* Right Section: Enterprise Account Registration Form (Darker Background) */}
      <div className="w-1/2 bg-login-bg text-text-primary flex flex-col justify-between p-8">
        <div className="flex justify-end w-full">
          {/* <Switch /> */}{' '}
          {/* You can uncomment if you want the theme toggle here */}
        </div>

        <div className="flex flex-col items-center justify-center flex-grow">
          <h2 className="font-serif text-3xl font-bold mb-8 text-center">
            Enterprise account registration
          </h2>{' '}
          {/* Adjusted font to match image */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            <div className="flex flex-col gap-4">
              {/* Account Type */}
              <div className="flex flex-col">
                <label
                  htmlFor="accountType"
                  className="text-sm text-text-primary mb-1"
                >
                  <span className="text-red-500">*</span> Account type
                </label>
                <select
                  {...register('accountType')}
                  id="accountType"
                  className="p-2 border border-gray-600 text-gray-400 rounded-sm bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Please select a Account type</option>
                  <option value="individual">Individual</option>
                  <option value="corporate">Corporate</option>
                </select>
                {errors.accountType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.accountType.message}
                  </p>
                )}
              </div>

              {/* Company Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="companyName"
                  className="text-sm text-text-primary mb-1"
                >
                  <span className="text-red-500">*</span> Company name
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="companyName"
                  placeholder="Please enter Company name"
                  className="p-2 border border-gray-600 rounded-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Country */}
              <div className="flex flex-col">
                <label
                  htmlFor="country"
                  className="text-sm text-text-primary mb-1"
                >
                  <span className="text-red-500">*</span> Country
                </label>
                <Controller
                  control={control}
                  name="country"
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={countries}
                      className="w-full bg-gray-700 py-5 text-gray-400 rounded-sm"
                    />
                  )}
                />

                {errors.country && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>

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
                  className="p-2 border border-gray-600 rounded-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-sm text-text-primary mb-1"
                >
                  <span className="text-red-500">*</span> Password
                </label>
                <input
                  {...register('password')}
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="p-2 border border-gray-600 rounded-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Invitation Code */}
              <div className="flex flex-col">
                <label
                  htmlFor="invitationCode"
                  className="text-sm text-text-primary mb-1"
                >
                  <span className="text-red-500">*</span> Invitation code
                </label>
                <input
                  {...register('invitationCode')}
                  type="text"
                  id="invitationCode"
                  placeholder="Invitation Code"
                  className="p-2 border border-gray-600 rounded-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.invitationCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.invitationCode.message}
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
                    className="flex-grow p-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      isOTPSent ? toast('OTP already sent') : sendOTP();
                    }}
                    className="px-4 bg-gray-600 font-sans py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
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

              {/* Register Button */}
              <button
                type="submit"
                className="mt-6 w-full py-2 bg-blue-500 text-white rounded-sm text-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        </div>

        {/* Existing account link */}
        <div className="text-center text-gray-400 text-sm mt-8">
          Existing account?{' '}
          <div
            onClick={() => navigate('/user/login')}
            className="text-blue-400 hover:underline"
          >
            Go to login
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseRegisterPage;
