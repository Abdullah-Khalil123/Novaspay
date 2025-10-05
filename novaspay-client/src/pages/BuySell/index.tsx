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
      reset({
        referenceRate: undefined,
        totalAmount: undefined,
        estimatedFee: undefined,
        estimatedAmount: undefined,
      });
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <Select
                {...field}
                options={[...accounts.map((acc) => acc.accountNumber)]}
                className="w-full mb-4"
              />
            )}
          />

          <p>Available balance:0 EUR</p>

          <h1 className="text-2xl font-bold mt-4">Transaction Information</h1>

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
                className="w-full mb-2"
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
            className="w-full"
          />

          {/* Crypto Address */}
          <p className="text-sm mb-2 font-bold">Crypto Transaction Address</p>
          <Input {...register('cryptoAddress')} className="w-full" />

          {/* Reference Rate */}
          <div className="flex justify-between items-center my-2">
            <p className="text-sm font-bold">Reference Rate (Optional)</p>
            <p className="text-blue-500 cursor-pointer">Get the Latest rates</p>
          </div>
          <Input
            type="number"
            {...register('referenceRate', { valueAsNumber: true })}
            disabled
            className="w-full"
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
            className="w-full"
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
            className="w-full"
          />

          {/* Estimated Amount */}
          <p className="text-sm mb-2 font-bold">
            Estimated Amount
            {transactionType === 'sell' ? ' (EUR)' : ' (USDT)'}
          </p>
          <Input
            type="number"
            {...register('estimatedAmount', { valueAsNumber: true })}
            className="w-full"
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

        <p className="mt-4 text-center">
          Copyright ©{new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default CryptoBuySell;
