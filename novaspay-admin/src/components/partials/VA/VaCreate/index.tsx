import { useForm } from 'react-hook-form';
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
import { vaSchema, type VA } from '@/types/va';
import { useCreateVA, useVAById, useUpdateVA } from '@/hooks/useVa';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

type VAFormValues = z.infer<typeof vaSchema>;

const VACreate = ({ action = 'create' }: { action?: 'create' | 'edit' }) => {
  const params = useParams();
  const vaId = params.id ? parseInt(params.id, 10) : null;

  const { data: vaData } = useVAById(
    action === 'edit' && vaId ? (vaId as number) : 0
  );

  const navigate = useNavigate();
  const { mutate: createVA, isPending: isCreating } = useCreateVA();
  const { mutate: updateVA } = useUpdateVA(vaId as number);

  const va: VA = vaData?.data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VAFormValues>({
    resolver: zodResolver(vaSchema),
    defaultValues: {
      purpose: '',
      currency: '',
      paymentMethod: '',
      headquaters: '',
      state: '',
      city: '',
      street: '',
      postalCode: '',
      businessCategory: '',
      region: '',
      fundingSource: '',
      declineReason: '',
      status: '',
    },
  });

  useEffect(() => {
    if (action === 'edit' && va) {
      reset(va);
    }
  }, [va]);

  async function onSubmit(values: VAFormValues) {
    try {
      if (action === 'create') {
        createVA(values, {
          onSuccess: () => {
            toast.success('VA created successfully!');
            navigate('/admin/vas');
          },
          onError: (error) => {
            toast.error(`Failed to create VA: ${error.message}`);
          },
        });
      } else if (action === 'edit' && vaId) {
        updateVA(values, {
          onSuccess: () => {
            toast.success('VA updated successfully!');
            navigate('/admin/vas');
          },
          onError: (error) => {
            toast.error(`Failed to update VA: ${error.message}`);
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
          {action === 'create' ? 'Create VA' : 'Edit VA'}
        </h1>
        <p className="text-muted-foreground mt-2">
          Fill in the details below to{' '}
          {action === 'create' ? 'create a new' : 'edit this'} virtual account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>VA Details</CardTitle>
            <CardDescription>Provide VA information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Input id="purpose" {...register('purpose')} />
                {errors.purpose && (
                  <p className="text-sm text-red-500">
                    {errors.purpose.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input id="currency" {...register('currency')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Input id="paymentMethod" {...register('paymentMethod')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="headquaters">Headquarters</Label>
                <Input id="headquaters" {...register('headquaters')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" {...register('state')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" {...register('city')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="street">Street</Label>
                <Input id="street" {...register('street')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input id="postalCode" {...register('postalCode')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessCategory">Business Category</Label>
                <Input
                  id="businessCategory"
                  {...register('businessCategory')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Input id="region" {...register('region')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fundingSource">Funding Source</Label>
                <Input id="fundingSource" {...register('fundingSource')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="declineReason">Decline Reason</Label>
                <Input id="declineReason" {...register('declineReason')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input id="status" {...register('status')} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg" type="submit" disabled={isCreating}>
            {isCreating && <Loader2Icon className="animate-spin mr-2" />}
            {action === 'create' ? 'Create VA' : 'Update VA'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VACreate;
