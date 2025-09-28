import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useUserById } from '@/hooks/useUsers';
import { useModifyUserBalance } from '@/hooks/useUsers';
import { fundSchema, type FundForm } from '@/types/user';

// ---------------- COMPONENT ----------------
const UserFunds = () => {
  const { userId } = useParams<{ userId: string }>();

  // user data
  const { data, isLoading } = useUserById(userId!);
  const user = data?.data?.user;

  // mutation
  const { mutate: modifyBalance, isPending } = useModifyUserBalance(userId!);

  // form
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FundForm>({
    resolver: zodResolver(fundSchema),
    defaultValues: { amount: '', type: 'credit', reason: '' },
  });

  useEffect(() => {
    reset();
  }, [userId, reset]);

  const onSubmit = (values: FundForm) => {
    const amount = Number(values.amount);
    const finalAmount = values.type === 'debit' ? -amount : amount;

    modifyBalance(
      {
        amount: finalAmount,
        reason: values.reason,
      },
      {
        onSuccess: () => {
          toast.success('Balance updated successfully');
          reset();
        },
        onError: () => {
          toast.error('Failed to update balance');
        },
      }
    );
  };

  if (isLoading) return <p>Loading user funds...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">User Funds</h1>
      <p className="text-muted-foreground">
        Manage balance for{' '}
        <span className="font-semibold">{user?.nickname}</span>
      </p>

      {/* Current Balance */}
      <Card>
        <CardHeader>
          <CardTitle>Current Balance</CardTitle>
          <CardDescription>User account balance</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">
            {user?.balance} {user?.preferred_currency || 'USD'}
          </p>
        </CardContent>
      </Card>

      {/* Adjust Funds */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Adjust Balance</CardTitle>
            <CardDescription>Add or deduct funds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                step="0.01"
                min={0}
                placeholder="Enter amount"
                {...register('amount')}
              />
              {errors.amount && (
                <Label className="text-red-500">{errors.amount.message}</Label>
              )}
            </div>

            <div className="space-y-2">
              <Label>Transaction Type</Label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit">Credit (Add)</SelectItem>
                      <SelectItem value="debit">Debit (Deduct)</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Reason</Label>
              <Input placeholder="Enter reason" {...register('reason')} />
              {errors.reason && (
                <Label className="text-red-500">{errors.reason.message}</Label>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isPending}>
            {isPending ? 'Processing...' : 'Update Balance'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserFunds;
