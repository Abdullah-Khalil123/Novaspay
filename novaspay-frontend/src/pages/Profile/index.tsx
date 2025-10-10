import { resetPassword } from '@/actions/auth';
import type { RootState } from '@/store';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const UserProfile = () => {
  const { t } = useTranslation();
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
        console.log(t('Password reset successful:'), response);
      })
      .catch((error) => {
        console.error(t('Password reset failed:'), error.response.data.message);
        toast.error(error.response.data.message || t('Password reset failed'));
        resetSetErrors('oldPassword', {
          type: 'manual',
          message: t('Old password is incorrect'),
        });
      });
  }

  return (
    <div className="bg-background flex items-center justify-center p-4">
      <div className="shadow-lg rounded-lg flex gap-2 w-full">
        {/* Left Section: Personal Information */}
        <div className="w-1/3 bg-secondary border-gray-200 p-6">
          <h2 className="border-b pb-2 border-gray-400/50 mb-6 text-center">
            {t('Personal Information')}
          </h2>
          <div className="flex border-y border-border border-x-0 py-1 items-center mb-4">
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
            <span className="mr-2 text-nowrap">{t('User Mail:')}</span>
            <span>{user?.email}</span>
          </div>
        </div>

        {/* Right Section: Basic Information with Tabs */}
        <div className="w-2/3 p-6 bg-secondary">
          <h2 className="text-center border-b border-gray-400/50 pb-2 mb-6">
            {t('Basic Information')}
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
              {t('Reset Password')}
            </button>
            {/* Uncomment and translate if needed
            <button
              className={`ml-4 py-2 px-4 text-sm font-medium ${
                activeTab === 'setFundPassword'
                  ? 'border-b-2 border-green-600 text-green-600'
                  : 'hover:text-gray-400'
              }`}
              onClick={() => setActiveTab('setFundPassword')}
            >
              {t('Set fund password')}
            </button>
            <button
              className={`ml-4 py-2 px-4 text-sm font-medium ${
                activeTab === 'updateFundPassword'
                  ? 'border-b-2 border-green-600 text-green-600'
                  : ' hover:text-gray-400'
              }`}
              onClick={() => setActiveTab('updateFundPassword')}
            >
              {t('Update fund password')}
            </button>
            */}
          </div>

          {/* Tab Content */}
          <div>
            <form onSubmit={resetHandleSubmit(onResetSubmit)}>
              {activeTab === 'resetPassword' && (
                <div className="space-y-4 flex flex-col">
                  <div className="flex flex-row items-center gap-2">
                    <label
                      htmlFor="oldPassword"
                      className="text-sm font-medium mb-1 w-30"
                    >
                      <span className="text-red-500">*</span>{' '}
                      {t('Old Password')}
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
                      <span className="text-red-500">*</span>{' '}
                      {t('New Password')}
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
                      <span className="text-red-500">*</span>{' '}
                      {t('Confirm Password')}
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
                        {t('Passwords do not match.')}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-4 mt-2 ml-32">
                    <button className="px-6 py-2 bg-[#293a05] text-white rounded-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-sidebar-bg focus:ring-offset-2">
                      {t('Save')}
                    </button>
                    <button className="px-6 py-2 bg-[#b05153] text-white rounded-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2">
                      {t('Cancel')}
                    </button>
                  </div>
                </div>
              )}
            </form>

            {activeTab === 'setFundPassword' && (
              <div>
                <p className="text-gray-600">
                  {t('This is where you can set your fund password.')}
                </p>
              </div>
            )}

            {activeTab === 'updateFundPassword' && (
              <div>
                <p className="text-gray-600">
                  {t('This is where you can update your fund password.')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
