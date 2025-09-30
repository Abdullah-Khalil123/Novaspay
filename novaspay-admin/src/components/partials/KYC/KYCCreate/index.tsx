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
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { KYCschema, type KYC } from '@/types/kyc';
import { useCreateKYC, useKYCById, useUpdateKYC } from '@/hooks/useKYC';

type KYCFormValues = z.infer<typeof KYCschema>;

const KYCForm = ({ action = 'create' }: { action?: 'create' | 'edit' }) => {
  const params = useParams();
  const kycId = params.id ? parseInt(params.id, 10) : null;
  const { data: kycData } = useKYCById(action === 'edit' && kycId ? kycId : 0);
  const navigate = useNavigate();

  const { mutate: createKYC, isPending: isCreating } = useCreateKYC();
  const { mutate: updateKYC } = useUpdateKYC(kycId as number);

  const kyc: KYC = kycData?.data;

  const {
    register,
    control,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<KYCFormValues>({
    resolver: zodResolver(KYCschema),
    defaultValues: {
      email: '',
      type: '',
      name: '',
      phone: '',
      agentId: null,
      status: 'pending',
      reason: '',
    },
  });

  useEffect(() => {
    if (action === 'edit' && kyc) {
      reset(kyc);
    }
  }, [kyc, action, reset]);

  async function onSubmit(values: KYCFormValues) {
    try {
      if (action === 'create') {
        createKYC(values, {
          onSuccess: () => {
            toast.success('KYC created successfully!');
            navigate('/admin/kyc');
          },
          onError: (error) => {
            toast.error(`Failed to create KYC: ${error.message}`);
          },
        });
      } else if (action === 'edit' && kycId) {
        updateKYC(values, {
          onSuccess: () => {
            toast.success('KYC updated successfully!');
            navigate('/admin/kyc');
          },
          onError: (error) => {
            toast.error(`Failed to update KYC: ${error.message}`);
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
          {action === 'edit' ? 'Edit KYC' : 'Create KYC'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {action === 'edit'
            ? 'Update the details of this KYC record.'
            : 'Fill in the details below to create a new KYC record.'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>KYC Details</CardTitle>
            <CardDescription>Provide KYC information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  {...register('email')}
                  placeholder="user@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...register('name')} placeholder="John Doe" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  placeholder="+92 300 1234567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Input
                  id="type"
                  {...register('type')}
                  placeholder="Individual / Business"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="agentId">Agent ID</Label>
                <Input
                  id="agentId"
                  type="number"
                  {...register('agentId', { valueAsNumber: true })}
                  placeholder="123"
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
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
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
                  placeholder="Reason (optional)"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg" type="submit" disabled={isCreating}>
            {isCreating && <Loader2Icon className="animate-spin mr-2" />}
            {action === 'edit' ? 'Update KYC' : 'Create KYC'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default KYCForm;
