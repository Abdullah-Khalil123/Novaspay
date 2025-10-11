import { useEffect, useState } from 'react';
import BankAccountSelector from './BankAccountSelector';
import CorporateInfo from './CorporateInfo';
import MultiCurrency from './Multicurrency';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  documentFormSchema,
  type DocumentFormData,
} from '@/types/documentForm'; // Ensure DocumentFormData is exported
import {
  useCreateClientKYC,
  useKYCs,
  useUpdateClientKYC,
} from '@/hooks/useKYC';
import type { KYC } from '@/types/kyc';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

const DocumentForm = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const { data } = useKYCs({}, mode !== 'crt');
  const { mutate: createKYC } = useCreateClientKYC();
  const { mutate: updateKYC } = useUpdateClientKYC();
  const kycData: KYC = data?.data;
  const {
    setValue,
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors }, // Get errors for validation feedback
    trigger, // Manually trigger validation for a field
  } = useForm<DocumentFormData>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      area: '',
      email: '',
      dateOfBirth: '',
      contactNumber: '',
      country: '',
      address: '',
      firstName: '',
      middleName: '',
      lastName: '',
      city: '',
      postalCode: '',
      headquaters: '',
      state: '',
      companyStreet: '',
      companyCity: '',
    },
  });
  useEffect(() => {
    if (kycData) {
      reset({
        area: kycData.area || '',
        email: kycData.email || '',
        dateOfBirth: kycData.dateOfBirth
          ? new Date(kycData.dateOfBirth).toISOString().split('T')[0]
          : '',

        contactNumber: kycData.phone || '',
        country: kycData.companyCountry || '',
        address: kycData.companyAddress || '',
        firstName: kycData.firstName || '',
        middleName: kycData.middleName || '',
        lastName: kycData.lastName || '',
        city: kycData.city || '',
        postalCode: kycData.postalCode || '',
        headquaters: kycData.headquarters || '',
        state: kycData.state || '',
        companyStreet: kycData.companyStreet || '',
        companyCity: kycData.companyCity || '',
        frontFacingImage: kycData.frontFacingImage || '',
        backFacingImage: kycData.backFacingImage || '',
      });
      setSelectedBankArea(kycData.area || ''); // Initialize selected area
    }
  }, [data]);

  const [step, setStep] = useState(1);
  const [selectedBankArea, setSelectedBankArea] = useState<string>(
    getValues('area') || ''
  ); // Keep track of selected area for BankAccountSelector

  // Function to move to the next step after validation
  const handleNextStep = async () => {
    let isValid = false;

    if (step === 1) {
      isValid = await trigger('area'); // Validate 'area' field
    } else if (step === 2) {
      isValid = await trigger([
        'email',
        'dateOfBirth',
        'contactNumber',
        'country',
        'address',
        'firstName',
        'middleName',
        'lastName',
        'city',
        'postalCode',
      ]);
    } else if (step === 3) {
      isValid = await trigger([
        'state',
        'headquaters',
        'companyCity',
        'companyStreet',
      ]);
    }

    if (isValid) {
      setStep((prev) => prev + 1);
    } else {
      console.log('Validation errors:', errors);
      // Optionally scroll to the first error or display a general error message
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (data: Record<string, string>) => {
    const formData = new FormData();

    // console.log(data);
    Object.keys(data).map((key) => {
      formData.append(key, data[key]);
    });
    if (mode == 'crt') {
      createKYC(formData, {
        onSuccess: () => {
          toast.success('KYC information submitted successfully!');
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ||
              'Failed to submit KYC information.'
          );
        },
      });
    } else {
      updateKYC(formData, {
        onSuccess: () => {
          toast.success('KYC information submitted successfully!');
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ||
              'Failed to submit KYC information.'
          );
        },
      });
    }
  };

  return (
    <div className="min-h-full p-6 flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <BankAccountSelector
            setValue={setValue}
            selected={selectedBankArea}
            setSelected={setSelectedBankArea} // Pass setSelected for local state
            nextStep={handleNextStep} // Use the validation-aware nextStep
            error={errors.area?.message} // Pass error message for 'area'
          />
        )}
        {step === 2 && (
          <CorporateInfo
            nextStep={handleNextStep} // Use the validation-aware nextStep
            register={register}
            prevStep={prevStep}
            errors={errors} // Pass errors object to display messages
            setValue={setValue} // Pass setValue for dropdowns if needed
            getValues={getValues} // Pass getValues if needed
            watch={watch} // Pass watch if needed
          />
        )}
        {step === 3 && (
          <MultiCurrency
            nextStep={handleNextStep} // Use the validation-aware nextStep
            prevStep={prevStep}
            register={register}
            errors={errors} // Pass errors object
            setValue={setValue} // Pass setValue for dropdowns
            watch={watch} // Pass watch if needed
          />
        )}

        {/* This button will only appear on the last step for final submission */}
        {step === 3 && (
          <button
            type="submit"
            className="bg-sidebar-child cursor-pointer text-white px-4 py-2 rounded-lg w-full mt-8"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default DocumentForm;
