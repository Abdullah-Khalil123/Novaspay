import { useForm, Controller } from 'react-hook-form';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2Icon } from 'lucide-react';
import { transactionSchema, type Transaction } from '@/types/transaction';
import {
  useCreateTransaction,
  useTransactionById,
  useUpdateTransaction,
} from '@/hooks/useTransaction';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

type TransactionFormValues = z.infer<typeof transactionSchema>;

const TransactionCreate = ({
  action = 'create',
}: {
  action?: 'create' | 'edit';
}) => {
  const params = useParams();
  const transactionId = params.id ? parseInt(params.id, 10) : null;
  const { data: transactionData } = useTransactionById(
    action === 'edit' && transactionId ? (transactionId as number) : 0
  );
  const navigate = useNavigate();
  const { mutate: createTransaction, isPending: isCreating } =
    useCreateTransaction();
  const { mutate: updateTransaction } = useUpdateTransaction(
    transactionId as number
  );
  const transaction: Transaction = transactionData?.data;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      accountName: '',
      paymentAccount: '',
      receiverName: '',
      receiverNumber: '',
      orderId: null,
      orderType: null,
      reason: null,
      amount: 0,
      fee: 0,
      status: 'pending',
    },
  });

  useEffect(() => {
    if (action === 'edit' && transaction) {
      console.log('Resetting form with transaction:', transaction);
      reset(transaction);
    }
  }, [transaction]);

  async function onSubmit(values: TransactionFormValues) {
    try {
      if (action === 'create') {
        createTransaction(values, {
          onSuccess: () => {
            toast.success('Transaction created successfully!');
            navigate('/admin/transactions');
          },
          onError: (error) => {
            toast.error(`Failed to create transaction: ${error.message}`);
          },
        });
      } else if (action === 'edit' && transactionId) {
        updateTransaction(values, {
          onSuccess: () => {
            toast.success('Transaction updated successfully!');
            navigate('/admin/transactions');
          },
          onError: (error) => {
            toast.error(`Failed to update transaction: ${error.message}`);
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
          Create Transaction
        </h1>
        <p className="text-muted-foreground mt-2">
          Fill in the details below to create a new transaction.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
            <CardDescription>Provide transaction information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="accountName">Account Name *</Label>
                <Input
                  id="accountName"
                  {...register('accountName')}
                  placeholder="John Doe"
                />
                {errors.accountName && (
                  <p className="text-sm text-red-500">
                    {errors.accountName.message}
                  </p>
                )}
              </div>

              <div>
                <div className="space-y-2">
                  <Label htmlFor="orderId">Order ID</Label>
                  <Input
                    id="orderId"
                    type="text"
                    {...register('orderId')}
                    placeholder="12345"
                  />
                </div>
                {errors.orderId && (
                  <p className="text-sm text-red-500">
                    {errors.orderId.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Order Type</Label>
                <Controller
                  name="orderType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value as string}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Transfer">Transfer</SelectItem>
                        <SelectItem value="Withdrawal">Withdrawal</SelectItem>
                        <SelectItem value="Deposit">Deposit</SelectItem>
                        <SelectItem value="None">None</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <p className="text-sm text-red-500">
                    {errors.status.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentAccount">Payment Account *</Label>
                <Input
                  id="paymentAccount"
                  {...register('paymentAccount')}
                  placeholder="Bank Account"
                />
                {errors.paymentAccount && (
                  <p className="text-sm text-red-500">
                    {errors.paymentAccount.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="receiverName">Receiver Name</Label>
                <Input
                  id="receiverName"
                  {...register('receiverName')}
                  placeholder="Jane Smith"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="receiverNumber">Receiver Number</Label>
                <Input
                  id="receiverNumber"
                  {...register('receiverNumber')}
                  placeholder="+92 300 1234567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  {...register('amount', { valueAsNumber: true })}
                />
                {errors.amount && (
                  <p className="text-sm text-red-500">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fee">Fee</Label>
                <Input
                  id="fee"
                  type="number"
                  step="0.01"
                  {...register('fee', { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || 'pending'}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="reason">Reason</Label>
                <Input
                  id="reason"
                  {...register('reason')}
                  placeholder="Optional reason for transaction"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg" type="submit" disabled={isCreating}>
            {isCreating && <Loader2Icon className="animate-spin mr-2" />}
            Create Transaction
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TransactionCreate;
