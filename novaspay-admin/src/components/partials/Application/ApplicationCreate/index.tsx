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
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { applicationSchema, type Application } from '@/types/application';
import {
  useCreateApplication,
  useApplicationById,
  useUpdateApplication,
} from '@/hooks/useApplication';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const ApplicationCreate = ({
  action = 'create',
}: {
  action?: 'create' | 'edit';
}) => {
  const params = useParams();
  const applicationId = params.id ? parseInt(params.id, 10) : null;

  const { data: applicationData } = useApplicationById(
    action === 'edit' && applicationId ? applicationId : 0
  );

  const navigate = useNavigate();
  const { mutate: createApplication, isPending: isCreating } =
    useCreateApplication();
  const { mutate: updateApplication } = useUpdateApplication(
    applicationId as number
  );

  const application: Application = applicationData?.data;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      amount: 0,
      estimatedAmount: 0,
      estimatedFee: 0,
      totalAmount: 0,
      referenceRate: 0,
      status: '',
      fromCurrency: '',
      toCurrency: '',
      transactionType: '',
      remark: '',
      cryptoAddress: '',
      vaBankAccount: '',
      clientId: undefined,
      approverId: undefined,
    },
  });
  console.log(errors);
  useEffect(() => {
    if (action === 'edit' && application) {
      reset(application);
    }
  }, [application]);

  async function onSubmit(values: ApplicationFormValues) {
    try {
      if (action === 'create') {
        createApplication(values, {
          onSuccess: () => {
            toast.success('Application created successfully!');
            navigate('/admin/applications');
          },
          onError: (error: any) => {
            toast.error(`Failed to create application: ${error.message}`);
          },
        });
      } else if (action === 'edit' && applicationId) {
        updateApplication(values, {
          onSuccess: () => {
            toast.success('Application updated successfully!');
            navigate('/admin/applications');
          },
          onError: (error: any) => {
            toast.error(`Failed to update application: ${error.message}`);
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
          {action === 'create' ? 'Create Application' : 'Edit Application'}
        </h1>
        <p className="text-muted-foreground mt-2">
          Fill in the details below to{' '}
          {action === 'create' ? 'create a new' : 'edit this'} application.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
            <CardDescription>Provide application information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
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
                <Label htmlFor="fromCurrency">From Currency</Label>
                <Input
                  id="fromCurrency"
                  {...register('fromCurrency')}
                  placeholder="USD"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="toCurrency">To Currency</Label>
                <Input
                  id="toCurrency"
                  {...register('toCurrency')}
                  placeholder="EUR"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transactionType">Transaction Type</Label>
                <Input
                  id="transactionType"
                  {...register('transactionType')}
                  placeholder="Deposit / Withdraw"
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
                      value={field.value as string}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending approval">
                          Pending
                        </SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Transaction successful">
                          Successful
                        </SelectItem>
                        <SelectItem value="Reject">Rejected</SelectItem>
                        <SelectItem value="Cancel transaction">
                          Cancelled
                        </SelectItem>
                        <SelectItem value="Transaction Failed">
                          Failed
                        </SelectItem>
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
                <Label htmlFor="estimatedAmount">Estimated Amount</Label>
                <Input
                  id="estimatedAmount"
                  type="number"
                  step="0.01"
                  {...register('estimatedAmount', { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedFee">Estimated Fee</Label>
                <Input
                  id="estimatedFee"
                  type="number"
                  step="0.01"
                  {...register('estimatedFee', { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalAmount">Total Amount</Label>
                <Input
                  id="totalAmount"
                  type="number"
                  step="0.01"
                  {...register('totalAmount', { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="referenceRate">Reference Rate</Label>
                <Input
                  id="referenceRate"
                  type="number"
                  step="0.01"
                  {...register('referenceRate', { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="remark">Remark</Label>
                <Input
                  id="remark"
                  {...register('remark')}
                  placeholder="Optional remarks"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="cryptoAddress">Crypto Address</Label>
                <Input
                  id="cryptoAddress"
                  {...register('cryptoAddress')}
                  placeholder="0x123abc..."
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="vaBankAccount">VA Bank Account</Label>
                <Input
                  id="vaBankAccount"
                  {...register('vaBankAccount')}
                  placeholder="Bank account details"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg" type="submit" disabled={isCreating}>
            {isCreating && <Loader2Icon className="animate-spin mr-2" />}
            {action === 'create' ? 'Create Application' : 'Update Application'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationCreate;
