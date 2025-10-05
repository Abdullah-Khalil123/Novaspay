import { useState } from 'react';
import BankAccountSelector from './BankAccountSelector';
import CorporateInfo from './CorporateInfo';
import MultiCurrency from './Multicurrency';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { documentFormSchema } from '@/types/documentForm';

const DocumentForm = () => {
  const { setValue, register } = useForm({
    resolver: zodResolver(documentFormSchema),
  });
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState('');

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-full p-6 flex flex-col justify-center items-center">
      {step === 1 && (
        <BankAccountSelector
          setValue={setValue}
          selected={selected}
          setSelected={setSelected}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <CorporateInfo
          nextStep={nextStep}
          register={register}
          prevStep={prevStep}
        />
      )}
      {step === 3 && <MultiCurrency nextStep={nextStep} prevStep={prevStep} />}
    </div>
  );
};

export default DocumentForm;
