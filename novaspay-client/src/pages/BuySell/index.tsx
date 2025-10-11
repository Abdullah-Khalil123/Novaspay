import { getCurrencyRates } from '@/actions/currency';
import Button from '@/components/custom/Button';
import Input from '@/components/custom/Input';
import RadioGroup from '@/components/custom/radio';
import Select from '@/components/custom/SelectG';
import { useAccounts } from '@/hooks/useAccounts';
import { useCreateApplication } from '@/hooks/useApplications';
import type { Account } from '@/types/accounts';
import { applicationSchema, type Application } from '@/types/application';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { CircleAlert } from 'lucide-react';

const onError = () => {
  toast.custom(
    (t) => (
      <div
        className={`max-w-sm w-full bg-secondary text-white rounded-xl shadow-lg flex items-start gap-3 p-4 ransition-all ${
          t.visible ? 'animate' : 'animate-leave'
        }`}
      >
        <div className="text-xl">
          <CircleAlert fill="#e5a144" color="black" />
        </div>
        <div>
          <p className="font-semibold mb-5">warning</p>
          <p className="text-sm text-gray-300">
            Form validation failed, please check the input.
          </p>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="ml-auto text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
    ),
    { duration: 4000 }
  );
};

const CryptoBuySell = () => {
  const { mutate: createApplication } = useCreateApplication();
  const { data } = useAccounts();
  const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('buy');
  const accounts: Account[] = data?.data || [];
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    control,
    reset,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      area: '',
      vaBankAccount: '',
      transactionType: 'buy',
      fromCurrency: 'EUR',
      toCurrency: '',
      amount: 0,
      cryptoAddress: '',
      referenceRate: undefined,
      totalAmount: undefined,
      estimatedFee: undefined,
      estimatedAmount: undefined,
    },
  });
  console.log(errors);

  const amountWatch = watch('amount');
  const toCurrencyWatch = watch('toCurrency');
  useEffect(() => {
    async function getCurrency() {
      let response;

      if (transactionType === 'buy') {
        setValue('fromCurrency', 'EUR');
        setValue('transactionType', 'buy');
        response = await getCurrencyRates({ symbol: 'EUR' });

        const quote = response?.data?.quotes?.find(
          (q: any) => q.targetSymbol === toCurrencyWatch
        );

        if (quote) {
          const price = quote.price;
          setValue('referenceRate', price);
          setValue('totalAmount', amountWatch * price);
          setValue('estimatedFee', amountWatch * price * 0.002);
          setValue('estimatedAmount', amountWatch * price * (1 - 0.002));
        } else {
          console.warn('No quote found for', toCurrencyWatch);
        }
      }

      if (transactionType === 'sell') {
        setValue('fromCurrency', 'USDT');
        setValue('transactionType', 'sell');
        response = await getCurrencyRates({ symbol: 'USDT' });

        const quote = response?.data?.quotes?.find(
          (q: any) => q.targetSymbol === toCurrencyWatch
        );

        if (quote) {
          const price = quote.price;
          setValue('referenceRate', price);
          setValue('totalAmount', amountWatch * price);
          setValue('estimatedFee', amountWatch * price * 0.002);
          setValue('estimatedAmount', amountWatch * price * (1 - 0.002));
        } else {
          console.warn('No quote found for', toCurrencyWatch);
        }
      }
    }

    if (!toCurrencyWatch) {
      reset(
        {
          referenceRate: undefined,
          totalAmount: undefined,
          estimatedFee: undefined,
          estimatedAmount: undefined,
        },
        {
          keepErrors: true,
        }
      );
    }
    getCurrency();
  }, [transactionType, amountWatch, toCurrencyWatch]);

  const onSubmit = (data: Application) => {
    const finalData = {
      ...data,
      transactionType,
      fromCurrency: data.transactionType === 'buy' ? 'EUR' : 'USDT',
    };

    createApplication(finalData, {
      onSuccess: () => {
        alert('Application created successfully!');
      },
    });
  };

  useEffect(() => {
    setValue('toCurrency', null);
  }, [transactionType]);

  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-[474px]">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <h1 className="text-2xl font-bold">General Information</h1>

          {/* Area */}
          <p className="text-sm mb-2 font-bold">Area</p>
          <Controller
            name="area"
            control={control}
            render={({ field }) => (
              <Select {...field} options={['Europe']} className="w-full mb-4" />
            )}
          />

          {/* VA Bank Account */}
          <p className="text-sm mb-2 font-bold">VA Bank Account</p>
          <Controller
            name="vaBankAccount"
            control={control}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  options={[...accounts.map((acc) => acc.accountNumber)]}
                  className="w-full"
                  isError={errors.vaBankAccount?.message !== undefined}
                />
                {errors.vaBankAccount?.message && (
                  <p className="text-xs text-red-500 mb-4">
                    {errors.vaBankAccount?.message}
                  </p>
                )}
              </>
            )}
          />

          <p>Available balance:0 EUR</p>

          <h1 className="text-2xl font-bold mt-4 mb-5">
            Transaction Information
          </h1>

          {/* Transaction Type */}
          <p className="text-sm mb-2 font-bold">Transaction Type</p>
          <RadioGroup
            options={[
              { label: 'Buy Crypto', value: 'buy' },
              { label: 'Sell Crypto', value: 'sell' },
            ]}
            value={transactionType}
            onChange={(val: 'buy' | 'sell') => setTransactionType(val)}
          />

          {/* To Currency */}
          <p className="text-sm mb-2 font-bold mt-2">To Currency</p>
          <Controller
            name="toCurrency"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={transactionType === 'buy' ? ['USDT'] : ['EUR']}
                className="w-full mb-5"
              />
            )}
          />

          {/* Amount */}
          <p className="text-sm mb-2 font-bold">
            Amount
            {transactionType === 'buy' ? ' (EUR)' : ' (USDT)'}
          </p>
          <Input
            type="number"
            {...register('amount', { valueAsNumber: true })}
            className="w-full h-9 mb-5"
          />

          {/* Crypto Address */}
          <p className="text-sm mb-2 font-bold">Crypto Transaction Address</p>
          <Input
            {...register('cryptoAddress')}
            className="w-full h-9"
            isError={errors.cryptoAddress?.message != undefined}
          />
          {errors.cryptoAddress?.message && (
            <p className="text-xs text-red-500 mb-4  ">
              {errors.cryptoAddress?.message}
            </p>
          )}

          {/* Reference Rate */}
          <div className="flex justify-between items-center my-2">
            <p className="text-sm font-bold">Reference Rate (Optional)</p>
            <p className="text-red-500 cursor-pointer">Get the Latest rates</p>
          </div>
          <Input
            type="number"
            {...register('referenceRate', { valueAsNumber: true })}
            disabled
            className="w-full cursor-not-allowed mb-5 h-9"
          />

          {/* Total Amount */}
          <p className="text-sm mb-2 font-bold">
            Total Amount
            {transactionType === 'sell' ? ' (EUR)' : ' (USDT)'}
          </p>
          <Input
            type="number"
            {...register('totalAmount', { valueAsNumber: true })}
            disabled
            className="w-full cursor-not-allowed mb-5 h-9"
          />

          {/* Estimated Fee */}
          <p className="text-sm mb-2 font-bold">
            Estimated Fee Amount
            {transactionType === 'sell' ? ' (EUR)' : ' (USDT)'}
          </p>
          <Input
            type="number"
            {...register('estimatedFee', { valueAsNumber: true })}
            disabled
            className="w-full cursor-not-allowed  h-9 mb-5"
          />

          {/* Estimated Amount */}
          <p className="text-sm mb-2 font-bold">
            Estimated Amount
            {transactionType === 'sell' ? ' (EUR)' : ' (USDT)'}
          </p>
          <Input
            type="number"
            {...register('estimatedAmount', { valueAsNumber: true })}
            className="w-full cursor-not-allowed  h-9 mb-2"
            disabled
          />

          {/* Note */}
          <p className="text-xs text-red-500 my-4">
            Note: The quoted price is for reference only. The final price is
            subject to confirmation by our platform account manager. We will
            contact you via email once the final quotation is ready.
          </p>

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-sidebar-child text-white w-full py-4"
          >
            <p className="flex">Submit</p>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CryptoBuySell;
