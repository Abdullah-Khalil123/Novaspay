import { ArrowLeft } from 'lucide-react';
import Dropdown from './DropDown';
import Input from './Input';
import PhoneInput from './PhoneInput';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react'; // Import useEffect
import type { DocumentFormData } from '@/types/documentForm';
import type {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { countriesWithCodes } from '@/utils/country';
import { Upload } from 'lucide-react';
import { upload } from '@/actions/upload';

const CorporateInfo = ({
  nextStep,
  prevStep,
  register,
  errors,
  setValue,
  watch,
}: {
  nextStep: () => void;
  prevStep: () => void;
  register: UseFormRegister<DocumentFormData>;
  errors: FieldErrors<DocumentFormData>;
  setValue: UseFormSetValue<DocumentFormData>;
  getValues: UseFormGetValues<DocumentFormData>;
  watch: UseFormWatch<DocumentFormData>;
}) => {
  const { t } = useTranslation();
  const watchedCountry = watch('country');

  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  // Watch for changes in the form fields that hold the image URLs
  const watchedFrontImageUrl = watch('frontFacingImage');
  const watchedBackImageUrl = watch('backFacingImage');

  // Effect to set preview from initial/backend data (URL string)
  useEffect(() => {
    if (typeof watchedFrontImageUrl === 'string' && watchedFrontImageUrl) {
      setFrontPreview(watchedFrontImageUrl);
    } else {
      setFrontPreview(null);
    }
  }, [watchedFrontImageUrl]);

  useEffect(() => {
    if (typeof watchedBackImageUrl === 'string' && watchedBackImageUrl) {
      setBackPreview(watchedBackImageUrl);
    } else {
      setBackPreview(null);
    }
  }, [watchedBackImageUrl]);

  return (
    <div className="w-full text-black h-full flex flex-col items-center justify-center">
      <div>
        <div>
          <div
            className="cursor-pointer bg-white border-border-color/20 text-red-500/50  border rounded-full w-fit p-3 mb-20"
            onClick={prevStep}
          >
            <ArrowLeft size={14} />
          </div>
          <h2 className="text-2xl font-bold">{t('Corporate Info')}</h2>
          <p className="text-gray-400">
            {t('Please provide corporate information')}
          </p>

          {/* CONTACT INFO */}
          <div className="flex mt-2 justify-between w-[500px]">
            <Input
              label={t('Email')}
              placeholder={t('Email')}
              className="border-none bg-white text-gray-500 h-[50px] rounded-xl w-[240px]"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label={t('Date of birth')}
              className="font-sans border-none w-[220px] h-[50px] rounded-xl bg-white text-gray-500"
              type="date"
              placeholder={t('DD/MM/YYYY')}
              {...register('dateOfBirth')}
              error={errors.dateOfBirth?.message}
            />
          </div>

          <div>
            <PhoneInput
              register={register}
              setValue={setValue}
              watch={watch}
              name="contactNumber"
              error={errors.contactNumber?.message}
            />
          </div>

          {/* COMPANY INFORMATION */}
          <div className="mt-4">
            <h2 className="text-red-400 uppercase mb-5">
              {t('Company Information')}
            </h2>
            <p className="font-bold">{t('Country')}</p>
            <Dropdown
              className="max-w-53 my-2 h-[50px] rounded-xl border-none bg-white text-gray-500"
              options={countriesWithCodes.map((country) => ({
                label: country.name,
                value: country.code,
              }))}
              defaultValue={watchedCountry}
              onChange={(val) => {
                setValue('country', val);
              }}
              value={watchedCountry || ''}
              error={errors.country?.message}
            />
            <Input
              label={t('Address')}
              placeholder={t('Address')}
              className="border-none h-[50px] rounded-xl bg-white text-gray-500"
              {...register('address')}
              error={errors.address?.message}
            />
          </div>

          {/* USER INFORMATION */}
          <div className="mt-4">
            <h2 className="text-red-400 uppercase mb-5">
              {t('User Information')}
            </h2>
            <div className="flex justify-between mb-2">
              <Input
                label={t('First Name')}
                placeholder={t('First Name')}
                className="border-none w-[220px] h-[50px] rounded-xl bg-white text-gray-500"
                {...register('firstName')}
                error={errors.firstName?.message}
              />
              <Input
                label={t('Middle Name')}
                placeholder={t('Middle Name')}
                className="border-none w-[220px] h-[50px] rounded-xl bg-white text-gray-500"
                {...register('middleName')}
                error={errors.middleName?.message}
              />
            </div>
            <div className="flex justify-between mb-2">
              <Input
                label={t('Last Name')}
                className="border-none w-[220px] h-[50px] rounded-xl bg-white text-gray-500"
                placeholder={t('Last Name')}
                {...register('lastName')}
                error={errors.lastName?.message}
              />
              <Input
                className="border-none w-[220px] h-[50px] rounded-xl bg-white text-gray-500"
                label={t('City Name')}
                placeholder={t('City')}
                {...register('city')}
                error={errors.city?.message}
              />
            </div>
            <Input
              label={t('Postal Code')}
              className="border-none h-[50px] rounded-xl bg-white text-gray-500"
              placeholder={t('Postal Code')}
              {...register('postalCode')}
              error={errors.postalCode?.message}
            />

            {/* IMAGE UPLOAD SECTION */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                {t('Upload ID Documents')}
              </h3>
              <div className="flex gap-6">
                {/* Front Image */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">
                    {t('Front of ID')}
                  </label>
                  <div className="relative w-40 h-28 border border-border rounded-md flex items-center justify-center overflow-hidden bg-gray-800/10 cursor-pointer">
                    {frontPreview ? (
                      <img
                        src={
                          frontPreview.startsWith('/uploads')
                            ? import.meta.env.VITE_PUBLIC_URL + frontPreview
                            : frontPreview
                        }
                        alt="Front ID Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="text-gray-400" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        const previewUrl = URL.createObjectURL(file);
                        setFrontPreview(previewUrl);

                        const formData = new FormData();
                        formData.append('image', file);
                        const uploadedUrl = await upload(formData);

                        setValue('frontFacingImage', uploadedUrl.url);
                        URL.revokeObjectURL(previewUrl); // Clean up preview URL
                      }}
                    />
                  </div>
                </div>

                {/* Back Image */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">
                    {t('Back of ID')}
                  </label>
                  <div className="relative w-40 h-28 border border-border rounded-md flex items-center justify-center overflow-hidden bg-gray-800/10 cursor-pointer">
                    {backPreview ? (
                      <img
                        src={
                          backPreview.startsWith('/uploads')
                            ? import.meta.env.VITE_PUBLIC_URL + backPreview
                            : backPreview
                        }
                        alt="Back ID Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="text-gray-400" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const previewUrl = URL.createObjectURL(file);
                        setBackPreview(previewUrl);

                        const formData = new FormData();
                        formData.append('image', file);
                        const uploadedUrl = await upload(formData);

                        setValue('backFacingImage', uploadedUrl.url);
                        URL.revokeObjectURL(previewUrl); // Clean up preview URL
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={nextStep}
          type="submit"
          className="bg-sidebar-child text-white px-4 py-2 rounded-lg w-full mt-8"
        >
          {t('Next')}
        </button>
      </div>
    </div>
  );
};

export default CorporateInfo;
