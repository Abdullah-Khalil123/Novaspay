import {
  createAccount,
  deleteAccount,
  getAllAccounts,
  getAccount,
  updateAccount,
} from '@/actions/account';
import { queryClient } from '@/providers/react-query';
import type { Account } from '@/types/accounts';
import { useMutation, useQuery } from '@tanstack/react-query';

const useAccounts = () => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: async () => getAllAccounts(),
  });
};

const useAccountById = (id: number) => {
  return useQuery({
    queryKey: ['account', id],
    queryFn: async () => getAccount(id),
    enabled: !!id,
  });
};

const useCreateAccount = () => {
  return useMutation({
    mutationKey: ['createAccount'],
    mutationFn: async (accountData: Account) => createAccount(accountData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};

const useDeleteAccount = () => {
  return useMutation({
    mutationKey: ['deleteAccount'],
    mutationFn: async (id: number) => deleteAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};

const useUpdateAccount = (id: number) => {
  return useMutation({
    mutationKey: ['updateAccount'],
    mutationFn: async (accountData: Account) => updateAccount(id, accountData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};

export {
  useAccounts,
  useAccountById,
  useCreateAccount,
  useDeleteAccount,
  useUpdateAccount,
};
