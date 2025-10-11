import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { accountSchema, type Account } from '@/types/accounts';
import {
  useCreateAccount,
  useAccountById,
  useUpdateAccount,
} from '@/hooks/useAccounts';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import SelectClient from '@/components/custom/SelectClient';

type AccountFormValues = z.infer<typeof accountSchema>;

const AccountCreate = ({
  action = 'create',
}: {
  action?: 'create' | 'edit';
}) => {
  const params = useParams();
  const accountId = params.id ? parseInt(params.id, 10) : null;

  const { data: accountData } = useAccountById(
    action === 'edit' && accountId ? (accountId as number) : 0
  );

  const navigate = useNavigate();
  const { mutate: createAccount, isPending: isCreating } = useCreateAccount();
  const { mutate: updateAccount } = useUpdateAccount(accountId as number);

  const account: Account = accountData?.data;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      bankingName: '',
      currency: '',
      clientName: '',
      ibanNumber: '',
      balance: 0,
      realBalance: 0,
      accountNumber: '',
      accountName: '',
      bankingAddress: '',
    },
  });

  useEffect(() => {
    if (action === 'edit' && account) {
      reset(account);
    }
  }, [account]);

  async function onSubmit(values: AccountFormValues) {
    try {
      if (action === 'create') {
        createAccount(values, {
          onSuccess: () => {
            toast.success('Account created successfully!');
            navigate('/admin/accounts');
          },
          onError: (error) => {
            toast.error(`Failed to create account: ${error.message}`);
          },
        });
      } else if (action === 'edit' && accountId) {
        updateAccount(values, {
          onSuccess: () => {
            toast.success('Account updated successfully!');
            navigate('/admin/accounts');
          },
          onError: (error) => {
            toast.error(`Failed to update account: ${error.message}`);
          },
        });
      }
    } catch (error: any) {
      toast.error(`An unexpected error occurred: ${error.message}`);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {action === 'create' ? 'Create Account' : 'Edit Account'}
        </h1>
        <p className="text-muted-foreground mt-2">
          Fill in the details below to{' '}
          {action === 'create' ? 'create a new' : 'edit this'} account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>Provide account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bankingName">Banking Name *</Label>
                <Input
                  id="bankingName"
                  {...register('bankingName')}
                  placeholder="Standard Chartered"
                />
                {errors.bankingName && (
                  <p className="text-sm text-red-500">
                    {errors.bankingName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency *</Label>
                <Input
                  id="currency"
                  {...register('currency')}
                  placeholder="USD"
                />
                {errors.currency && (
                  <p className="text-sm text-red-500">
                    {errors.currency.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  {...register('clientName')}
                  placeholder="John Doe"
                />
                {errors.clientName && (
                  <p className="text-sm text-red-500">
                    {errors.clientName.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Client</Label>
                <Controller
                  name="clientId"
                  control={control}
                  render={({ field }) => (
                    <SelectClient
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ibanNumber">IBAN Number</Label>
                <Input
                  id="ibanNumber"
                  {...register('ibanNumber')}
                  placeholder="US12 3456 7890 1234 5678"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="balance">Balance</Label>
                <Input
                  id="balance"
                  type="number"
                  step="0.01"
                  {...register('balance', { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="realBalance">Real Balance</Label>
                <Input
                  id="realBalance"
                  type="number"
                  step="0.01"
                  {...register('realBalance', { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  {...register('accountNumber')}
                  placeholder="123456789"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountName">Account Name</Label>
                <Input
                  id="accountName"
                  {...register('accountName')}
                  placeholder="John D. Savings"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bankingAddress">Banking Address</Label>
                <Input
                  id="bankingAddress"
                  {...register('bankingAddress')}
                  placeholder="123 Wall Street, New York"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg" type="submit" disabled={isCreating}>
            {isCreating && <Loader2Icon className="animate-spin mr-2" />}
            {action === 'create' ? 'Create Account' : 'Update Account'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountCreate;
