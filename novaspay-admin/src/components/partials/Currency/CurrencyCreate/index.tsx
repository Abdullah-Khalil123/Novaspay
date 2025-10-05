import { useForm, useFieldArray } from 'react-hook-form';
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
import { Loader2Icon, Plus, Trash2 } from 'lucide-react';
import {
  useCreateCurrency,
  useCurrencyRates,
  useUpdateCurrency,
} from '@/hooks/useCurrency';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

// ✅ Zod Schema
const quoteSchema = z.object({
  targetSymbol: z.string().min(1, 'Target symbol is required'),
  price: z.number().min(0, 'Price must be positive'),
});

const currencySchema = z.object({
  symbol: z.string().min(1, 'Symbol is required'),
  name: z.string().min(1, 'Name is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  quotes: z.array(quoteSchema).optional(),
});

type CurrencyFormValues = z.infer<typeof currencySchema>;

const CurrencyForm = ({
  action = 'create',
}: {
  action?: 'create' | 'edit';
}) => {
  const params = useParams();
  const symbol = params.symbol || '';
  const navigate = useNavigate();

  const { data: currencyData } =
    action === 'edit' && symbol ? useCurrencyRates(symbol) : { data: null };

  const { mutate: createCurrency, isPending: isCreating } = useCreateCurrency();
  const { mutate: updateCurrency, isPending: isUpdating } = useUpdateCurrency();

  const currency = currencyData?.data;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CurrencyFormValues>({
    resolver: zodResolver(currencySchema),
    defaultValues: {
      symbol: '',
      name: '',
      amount: 0,
      quotes: [{ targetSymbol: '', price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'quotes',
  });

  // ✅ Populate form when editing
  useEffect(() => {
    if (action === 'edit' && currency) {
      reset({
        symbol: currency.symbol,
        name: currency.name,
        amount: currency.amount,
        quotes:
          currency.quotes?.map((q: any) => ({
            targetSymbol: q.targetSymbol,
            price: q.price,
          })) || [],
      });
    }
  }, [currency]);

  async function onSubmit(values: CurrencyFormValues) {
    const payload = {
      symbol: values.symbol,
      name: values.name,
      amount: values.amount,
      quote: Object.fromEntries(
        (values.quotes || []).map((q) => [
          q.targetSymbol,
          { price: q.price, last_updated: new Date().toISOString() },
        ])
      ),
    };

    if (action === 'create') {
      createCurrency(payload, {
        onSuccess: () => {
          toast.success('Currency created successfully!');
          navigate('/admin/currencies');
        },
        onError: (error: any) => {
          toast.error(`Failed to create currency: ${error.message}`);
        },
      });
    } else {
      updateCurrency(payload, {
        onSuccess: () => {
          toast.success('Currency updated successfully!');
          navigate('/admin/currencies');
        },
        onError: (error: any) => {
          toast.error(`Failed to update currency: ${error.message}`);
        },
      });
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {action === 'create' ? 'Create Currency' : 'Edit Currency'}
        </h1>
        <p className="text-muted-foreground mt-2">
          Fill in the details below to{' '}
          {action === 'create' ? 'create a new' : 'edit this'} currency.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Currency Details</CardTitle>
            <CardDescription>Provide base currency info</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Symbol *</Label>
                <Input {...register('symbol')} placeholder="USD" />
                {errors.symbol && (
                  <p className="text-sm text-red-500">
                    {errors.symbol.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Name *</Label>
                <Input {...register('name')} placeholder="US Dollar" />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label>Amount *</Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('amount', { valueAsNumber: true })}
                  placeholder="1.00"
                />
                {errors.amount && (
                  <p className="text-sm text-red-500">
                    {errors.amount.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ✅ Quotes Section */}
        <Card>
          <CardHeader>
            <CardTitle>Quotes</CardTitle>
            <CardDescription>
              Define exchange rates for this currency
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
              >
                <div>
                  <Label>Target Symbol *</Label>
                  <Input
                    {...register(`quotes.${index}.targetSymbol`)}
                    placeholder="EUR"
                  />
                  {errors.quotes?.[index]?.targetSymbol && (
                    <p className="text-sm text-red-500">
                      {errors.quotes[index]?.targetSymbol?.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Price *</Label>
                  <Input
                    type="number"
                    step="0.0001"
                    {...register(`quotes.${index}.price`, {
                      valueAsNumber: true,
                    })}
                    placeholder="1.2345"
                  />
                  {errors.quotes?.[index]?.price && (
                    <p className="text-sm text-red-500">
                      {errors.quotes[index]?.price?.message}
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => append({ targetSymbol: '', price: 0 })}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Quote
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg" type="submit" disabled={isCreating || isUpdating}>
            {(isCreating || isUpdating) && (
              <Loader2Icon className="animate-spin mr-2" />
            )}
            {action === 'create' ? 'Create Currency' : 'Update Currency'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CurrencyForm;
