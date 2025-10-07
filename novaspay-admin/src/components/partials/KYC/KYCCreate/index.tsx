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
import SelectClient from '@/components/custom/SelectClient';

type KYCFormValues = z.infer<typeof KYCschema>;

const KYCForm = ({ action = 'create' }: { action?: 'create' | 'edit' }) => {
  const params = useParams();
  const kycId = params.id ? parseInt(params.id, 10) : null;
  const { data: kycData } = useKYCById(action === 'edit' && kycId ? kycId : 0);
  const navigate = useNavigate();

  const { mutate: createKYC, isPending: isCreating } = useCreateKYC();
  const { mutate: updateKYC } = useUpdateKYC(kycId as number);

  const kyc: KYC = kycData?.data;

  const { register, control, handleSubmit, reset } = useForm<KYCFormValues>({
    resolver: zodResolver(KYCschema),
    defaultValues: {
      email: '',
      type: '',
      phone: '',
      agentId: null,
      status: 'PENDING',
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
      toast.error(`Unexpected error: ${error.message}`);
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {action === 'edit' ? 'Edit KYC' : 'Create KYC'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {action === 'edit'
            ? 'Update this KYC record.'
            : 'Fill in all required details to create a new KYC record.'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic KYC Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>General KYC details</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Email</Label>
              <Input {...register('email')} placeholder="user@email.com" />
            </div>

            {/* <div>
              <Label>Full Name</Label>
              <Input {...register('name')} placeholder="John Doe" />
            </div> */}

            <div>
              <Label>Phone</Label>
              <Input {...register('phone')} placeholder="+92 300 1234567" />
            </div>

            <div>
              <Label>Type</Label>
              <Input
                {...register('type')}
                placeholder="Individual / Business"
              />
            </div>

            <div>
              <Label>Agent ID</Label>
              <Input
                type="number"
                {...register('agentId', { valueAsNumber: true })}
                placeholder="123"
              />
            </div>

            <div>
              <Label>Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || 'PENDING'}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SUCCESS">SUCCESS</SelectItem>
                      <SelectItem value="PENDING">PENDING</SelectItem>
                      <SelectItem value="FAILED">FAILED</SelectItem>
                      <SelectItem value="CANCELED">CANCELED</SelectItem>
                      <SelectItem value="IN_REVIEW">IN_REVIEW</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <Label>Client</Label>
              <Controller
                name="clientId"
                control={control}
                render={({ field }) => (
                  <SelectClient value={field.value} onChange={field.onChange} />
                )}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Reason</Label>
              <Input {...register('reason')} placeholder="Reason (optional)" />
            </div>
          </CardContent>
        </Card>

        {/* Personal Info */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Individual details</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>First Name</Label>
              <Input {...register('firstName')} placeholder="John" />
            </div>
            <div>
              <Label>Middle Name</Label>
              <Input {...register('middleName')} placeholder="A." />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input {...register('lastName')} placeholder="Doe" />
            </div>
            <div>
              <Label>Date of Birth</Label>
              <Input type="date" {...register('dateOfBirth')} />
            </div>
            <div>
              <Label>Contact Number</Label>
              <Input
                {...register('contactNumber')}
                placeholder="+92 301 9876543"
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                {...register('companyAddress')}
                placeholder="123 Street, Sector G-11"
              />
            </div>
            <div>
              <Label>City</Label>
              <Input {...register('city')} placeholder="Islamabad" />
            </div>
            <div>
              <Label>State</Label>
              <Input {...register('state')} placeholder="Punjab" />
            </div>
            <div>
              <Label>Postal Code</Label>
              <Input {...register('postalCode')} placeholder="44000" />
            </div>
            <div>
              <Label>Country</Label>
              <Input {...register('companyCountry')} placeholder="Pakistan" />
            </div>
          </CardContent>
        </Card>

        {/* Company Info */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Business-related details</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Company Street</Label>
              <Input
                {...register('companyStreet')}
                placeholder="Street 12, I-8"
              />
            </div>
            <div>
              <Label>Company City</Label>
              <Input {...register('companyCity')} placeholder="Islamabad" />
            </div>
            <div>
              <Label>Headquarters</Label>
              <Input {...register('headquarters')} placeholder="Main Office" />
            </div>
            <div>
              <Label>Area</Label>
              <Input {...register('area')} placeholder="Corporate Zone" />
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
