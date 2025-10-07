import { resetPassword } from '@/actions/auth';
import type { RootState } from '@/store';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-secondary shadow-lg rounded-lg flex w-full max-w-5xl">
        {/* Left Section: Personal Information */}
        <div className="w-1/3 border-r border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
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
        <div className="w-2/3 p-6">
          <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

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
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="oldPassword"
                      className="text-sm font-medium mb-1"
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

                  <div className="flex flex-col">
                    <label
                      htmlFor="newPassword"
                      className="text-sm font-medium mb-1"
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

                  <div className="flex flex-col">
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium mb-1"
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

                  <div className="flex space-x-4 mt-6">
                    <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-sidebar-bg focus:ring-offset-2">
                      Save
                    </button>
                    <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </form>

            {activeTab === 'setFundPassword' && (
              <div>
                {/* Content for Set Fund Password tab */}
                <p className="text-gray-600">
                  This is where you can set your fund password.
                </p>
                {/* Add your form or content for setting the fund password here */}
              </div>
            )}

            {activeTab === 'updateFundPassword' && (
              <div>
                {/* Content for Update Fund Password tab */}
                <p className="text-gray-600">
                  This is where you can update your fund password.
                </p>
                {/* Add your form or content for updating the fund password here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
