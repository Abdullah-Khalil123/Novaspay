import { resetPassword } from '@/actions/auth';
import type { RootState } from '@/store';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('resetPassword'); // 'resetPassword', 'setFundPassword', 'updateFundPassword'
  const user = useSelector((state: RootState) => state.auth.user);

  const {
    register: resetRegister,
    setError: resetSetErrors,
    handleSubmit: resetHandleSubmit,
    formState: { errors: resetErrors },
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  function onResetSubmit(data: any) {
    if (data.newPassword !== data.confirmPassword) {
      resetSetErrors('confirmPassword', {});
    }
    resetPassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    })
      .then((response) => {
        console.log('Password reset successful:', response);
      })
      .catch((error) => {
        console.error('Password reset failed:', error.response.data.message);
        toast.error(error.response.data.message || 'Password reset failed');
        resetSetErrors('oldPassword', {
          type: 'manual',
          message: 'Old password is incorrect',
        });
      });
  }
  return (
    <div className="bg-background flex items-center justify-center p-4">
      <div className="shadow-lg rounded-lg flex w-full gap-2">
        {/* Left Section: Personal Information */}
        <div className="w-1/3 bg-secondary border-gray-200 p-6">
          <h2 className="border-b pb-2 border-gray-400/50 mb-6 text-center">
            Personal Information
          </h2>
          <div className="flex border-y border-x-0 py-1 items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="mr-2 text-nowrap">User Mail:</span>
            <span>{user?.email}</span>
          </div>
          {/* Add more personal information fields here if needed */}
        </div>

        {/* Right Section: Basic Information with Tabs */}
        <div className="bg-secondary w-2/3 p-6">
          <h2 className="text-center border-b border-gray-400/50 pb-2 mb-6">
            Basic Information
          </h2>

          {/* Tabs Menu */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === 'resetPassword'
                  ? 'border-b-2 border-green-600 text-green-600'
                  : 'hover:text-gray-400'
              }`}
              onClick={() => setActiveTab('resetPassword')}
            >
              Reset Password
            </button>
            <button
              className={`ml-4 py-2 px-4 text-sm font-medium ${
                activeTab === 'setFundPassword'
                  ? 'border-b-2 border-green-600 text-green-600'
                  : 'hover:text-gray-400'
              }`}
              onClick={() => setActiveTab('setFundPassword')}
            >
              Set fund password
            </button>
            <button
              className={`ml-4 py-2 px-4 text-sm font-medium ${
                activeTab === 'updateFundPassword'
                  ? 'border-b-2 border-green-600 text-green-600'
                  : ' hover:text-gray-400'
              }`}
              onClick={() => setActiveTab('updateFundPassword')}
            >
              Update fund password
            </button>
          </div>

          {/* Tab Content */}
          <div>
            <form action="" onSubmit={resetHandleSubmit(onResetSubmit)}>
              {activeTab === 'resetPassword' && (
                <div className="space-y-4 flex flex-col">
                  <div className="flex flex-row items-center gap-2">
                    <label
                      htmlFor="oldPassword"
                      className="text-sm font-medium mb-1 w-30"
                    >
                      <span className="text-red-500">*</span> Old Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="oldPassword"
                        {...resetRegister('oldPassword')}
                        className="p-2 border border-gray-300 rounded-md w-60 focus:outline-none focus:ring-2 focus:ring-sidebar-bg"
                      />
                    </div>
                    {resetErrors.oldPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {resetErrors.oldPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-row items-center gap-2">
                    <label
                      htmlFor="newPassword"
                      className="text-sm font-medium mb-1 w-30"
                    >
                      <span className="text-red-500">*</span> New Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="newPassword"
                        {...resetRegister('newPassword')}
                        className="p-2 border border-gray-300 rounded-md w-60 focus:outline-none focus:ring-2 focus:ring-sidebar-bg"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-2">
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium mb-1 w-30"
                    >
                      <span className="text-red-500">*</span> Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="confirmPassword"
                        {...resetRegister('confirmPassword')}
                        className="p-2 border border-gray-300 rounded-md w-60 focus:outline-none focus:ring-2 focus:ring-sidebar-bg"
                      />
                    </div>
                    {resetErrors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        Passwords do not match.
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-4 mt-2 ml-32">
                    <button className="px-6 py-2 bg-[#293a05] text-white rounded-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-sidebar-bg focus:ring-offset-2">
                      Save
                    </button>
                    <button className="px-6 py-2 bg-[#b05153] text-white rounded-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </form>

            {activeTab === 'setFundPassword' && (
              <div>
                <div className="flex flex-col items-center justify-center px-4">
                  <div className="max-w-[600px] w-full space-y-8">
                    <div className="rounded-md shadow-sm -space-y-px">
                      <div className="mb-4">
                        <label htmlFor="email-address" className="sr-only">
                          Email address
                        </label>
                        <p className="text-white text-left text-sm">
                          Email:{' '}
                          <span className="text-gray-400">{user?.email}</span>
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 mb-4">
                        <label
                          htmlFor="verification-code"
                          className="sr-only w-20"
                        >
                          Verification code
                        </label>
                        <span className="text-white w-32 text-sm whitespace-nowrap">
                          Verification code
                        </span>
                        <div className="relative flex-grow rounded-sm overflow-hidden border border-gray-300/30">
                          <input
                            id="verification-code"
                            name="verification-code"
                            type="text"
                            autoComplete="off"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Verification code"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center px-2 border-l border-gray-300/30  bg-[#262727] text-sm text-white">
                            Send OTP
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <div className="min-w-32">
                          <span className="text-red-500 text-sm">*</span>
                          <span className="text-white text-sm whitespace-nowrap">
                            Password
                          </span>
                        </div>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="appearance-none relative block w-full px-3 py-2 border border-gray-300/30 rounded-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="password"
                        />
                      </div>
                    </div>

                    <div className="flex justify-center space-x-4 mt-6">
                      <button
                        type="submit"
                        className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="group relative flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'updateFundPassword' && (
              <div>
                <div className="flex flex-col items-center justify-center px-4">
                  <div className="max-w-[600px] w-full space-y-8">
                    <div className="rounded-md shadow-sm -space-y-px">
                      <div className="mb-4">
                        <label htmlFor="email-address" className="sr-only">
                          Email address
                        </label>
                        <p className="text-white text-left text-sm">
                          Email:{' '}
                          <span className="text-gray-400">{user?.email}</span>
                        </p>
                      </div>

                      {/* Verification Code */}
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="min-w-[150px] flex items-baseline">
                          {' '}
                          {/* Adjusted min-w for consistent alignment */}
                          <span className="text-red-500 text-sm mr-1">*</span>
                          <label
                            htmlFor="verification-code"
                            className="text-white text-sm whitespace-nowrap"
                          >
                            Verification code
                          </label>
                        </div>
                        <div className="border border-gray-300/30 relative flex-grow rounded-sm overflow-hidden">
                          <input
                            id="verification-code"
                            name="verification-code"
                            type="text"
                            autoComplete="off"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Verification code"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-[#262727] border-l border-gray-300/30 text-sm">
                            Send OTP
                          </div>
                        </div>
                      </div>

                      {/* Old Password */}
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="min-w-[150px] flex items-baseline">
                          {' '}
                          {/* Adjusted min-w for consistent alignment */}
                          <span className="text-red-500 text-sm mr-1">*</span>
                          <label
                            htmlFor="old-password"
                            className="text-white text-sm whitespace-nowrap"
                          >
                            Old Password
                          </label>
                        </div>
                        <input
                          id="old-password"
                          name="old-password"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="appearance-none relative block w-full px-3 py-2 border border-gray-300/30 rounded-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="password"
                        />
                      </div>

                      {/* New Password */}
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="min-w-[150px] flex items-baseline">
                          {' '}
                          {/* Adjusted min-w for consistent alignment */}
                          <span className="text-red-500 text-sm mr-1">*</span>
                          <label
                            htmlFor="new-password"
                            className="text-white text-sm whitespace-nowrap"
                          >
                            New Password
                          </label>
                        </div>
                        <input
                          id="new-password"
                          name="new-password"
                          type="password"
                          autoComplete="new-password"
                          required
                          className="appearance-none border-gray-300/30 rounded-sm relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="New password"
                        />
                      </div>

                      {/* Confirm Password */}
                      <div className="flex items-center space-x-2">
                        <div className="min-w-[150px] flex items-baseline">
                          {' '}
                          {/* Adjusted min-w for consistent alignment */}
                          <span className="text-red-500 text-sm mr-1">*</span>
                          <label
                            htmlFor="confirm-password"
                            className="text-white text-sm whitespace-nowrap"
                          >
                            Confirm Password
                          </label>
                        </div>
                        <input
                          id="confirm-password"
                          name="confirm-password"
                          type="password"
                          autoComplete="new-password"
                          required
                          className="appearance-none border-gray-300/30 rounded-sm relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Confirm password"
                        />
                      </div>
                    </div>

                    <div className="flex justify-center space-x-4 mt-6">
                      <button
                        type="submit"
                        className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="group relative flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
