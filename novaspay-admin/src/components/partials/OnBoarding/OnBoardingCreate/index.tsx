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
import { onboardingSchema, type OnBoarding } from '@/types/onBoarding';
import {
  useCreateOnboarding,
  useOnboardingById,
  useUpdateOnboarding,
} from '@/hooks/useOnBoarding';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

const OnboardingCreate = ({
  action = 'create',
}: {
  action?: 'create' | 'edit';
}) => {
  const params = useParams();
  const onboardingId = params.id ? parseInt(params.id, 10) : null;

  const { data: onboardingData } = useOnboardingById(
    action === 'edit' && onboardingId ? onboardingId : 0
  );

  const navigate = useNavigate();
  const { mutate: createOnboarding, isPending: isCreating } =
    useCreateOnboarding();
  const { mutate: updateOnboarding } = useUpdateOnboarding(
    onboardingId as number
  );

  const onboarding: OnBoarding = onboardingData?.data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      clientName: '',
      accountErrorMessage: '',
      bankAccountStatusMsg: '',
      reason: '',
    },
  });

  useEffect(() => {
    if (action === 'edit' && onboarding) {
      reset(onboarding);
    }
  }, [onboarding]);

  async function onSubmit(values: OnboardingFormValues) {
    try {
      if (action === 'create') {
        createOnboarding(values, {
          onSuccess: () => {
            toast.success('Onboarding created successfully!');
            navigate('/admin/onboardings');
          },
          onError: (error) => {
            toast.error(`Failed to create onboarding: ${error.message}`);
          },
        });
      } else if (action === 'edit' && onboardingId) {
        updateOnboarding(values, {
          onSuccess: () => {
            toast.success('Onboarding updated successfully!');
            navigate('/admin/onboardings');
          },
          onError: (error) => {
            toast.error(`Failed to update onboarding: ${error.message}`);
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
          {action === 'create' ? 'Create Onboarding' : 'Edit Onboarding'}
        </h1>
        <p className="text-muted-foreground mt-2">
          Fill in the details below to{' '}
          {action === 'create' ? 'create a new' : 'edit this'} onboarding
          record.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Onboarding Details</CardTitle>
            <CardDescription>Provide onboarding information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
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

              <div className="space-y-2">
                <Label htmlFor="accountErrorMessage">
                  Account Error Message
                </Label>
                <Input
                  id="accountErrorMessage"
                  {...register('accountErrorMessage')}
                  placeholder="Invalid account details"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankAccountStatusMsg">
                  Bank Account Status
                </Label>
                <Input
                  id="bankAccountStatusMsg"
                  {...register('bankAccountStatusMsg')}
                  placeholder="Verified / Pending / Failed"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="reason">Reason</Label>
                <Input
                  id="reason"
                  {...register('reason')}
                  placeholder="Reason for onboarding failure or notes"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg" type="submit" disabled={isCreating}>
            {isCreating && <Loader2Icon className="animate-spin mr-2" />}
            {action === 'create' ? 'Create Onboarding' : 'Update Onboarding'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OnboardingCreate;
