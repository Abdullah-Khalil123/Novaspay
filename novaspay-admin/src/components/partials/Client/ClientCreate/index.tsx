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
import { clientSchema, type Client } from '@/types/client';
import {
  useCreateClient,
  useClientById,
  useUpdateClient,
} from '@/hooks/useClient';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

type ClientFormValues = z.infer<typeof clientSchema>;

const ClientCreate = ({
  action = 'create',
}: {
  action?: 'create' | 'edit';
}) => {
  const params = useParams();
  const clientId = params.id ? parseInt(params.id, 10) : null;

  const { data: clientData } = useClientById(
    action === 'edit' && clientId ? (clientId as number) : 0
  );

  const navigate = useNavigate();
  const { mutate: createClient, isPending: isCreating } = useCreateClient();
  const { mutate: updateClient } = useUpdateClient(clientId as number);

  const client: Client = clientData?.data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      email: '',
      country: '',
      agentName: '',
    },
  });

  useEffect(() => {
    if (action === 'edit' && client) {
      reset(client);
    }
  }, [client]);

  async function onSubmit(values: ClientFormValues) {
    try {
      if (action === 'create') {
        createClient(values, {
          onSuccess: () => {
            toast.success('Client created successfully!');
            navigate('/admin/clients');
          },
          onError: (error) => {
            toast.error(`Failed to create client: ${error.message}`);
          },
        });
      } else if (action === 'edit' && clientId) {
        updateClient(values, {
          onSuccess: () => {
            toast.success('Client updated successfully!');
            navigate('/admin/clients');
          },
          onError: (error) => {
            toast.error(`Failed to update client: ${error.message}`);
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
          {action === 'create' ? 'Create Client' : 'Edit Client'}
        </h1>
        <p className="text-muted-foreground mt-2">
          Fill in the details below to{' '}
          {action === 'create' ? 'create a new' : 'edit this'} client.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Client Details</CardTitle>
            <CardDescription>Provide client information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Client Name *</Label>
                <Input id="name" {...register('name')} placeholder="John Doe" />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="john.doe@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  {...register('country')}
                  placeholder="United States"
                />
                {errors.country && (
                  <p className="text-sm text-red-500">
                    {errors.country.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="agentName">Agent Name *</Label>
                <Input
                  id="agentName"
                  {...register('agentName')}
                  placeholder="Michael Scott"
                />
                {errors.agentName && (
                  <p className="text-sm text-red-500">
                    {errors.agentName.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg" type="submit" disabled={isCreating}>
            {isCreating && <Loader2Icon className="animate-spin mr-2" />}
            {action === 'create' ? 'Create Client' : 'Update Client'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ClientCreate;
