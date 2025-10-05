import {
  getAllCurrencies,
  getCurrencyRates,
  createCurrency,
  updateCurrency,
} from '@/actions/currency';
import { queryClient } from '@/providers/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

const useCurrencies = (params?: any) => {
  return useQuery({
    queryKey: ['currencies', params],
    queryFn: async () => getAllCurrencies(params),
  });
};

const useCurrencyRates = (id: string) => {
  return useQuery({
    queryKey: ['currencyRates', id],
    queryFn: async () => getCurrencyRates(id),
    enabled: !!id,
  });
};

const useCreateCurrency = () => {
  return useMutation({
    mutationKey: ['createCurrency'],
    mutationFn: async (data: any) => createCurrency(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currencies'] });
    },
  });
};

const useUpdateCurrency = () => {
  return useMutation({
    mutationKey: ['updateCurrency'],
    mutationFn: async (data: any) => updateCurrency(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currencies'] });
    },
  });
};

export {
  useCurrencies,
  useCurrencyRates,
  useCreateCurrency,
  useUpdateCurrency,
};
