import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransaction,
  updateTransaction,
} from '@/actions/transaction';
import { queryClient } from '@/providers/react-query';
import type { Transaction } from '@/types/transaction';
import { useMutation, useQuery } from '@tanstack/react-query';

const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => getAllTransactions(),
  });
};

const useTransactionById = (id: number) => {
  return useQuery({
    queryKey: ['transaction', id],
    queryFn: async () => getTransaction(id),
    enabled: !!id,
  });
};

const useCreateTransaction = () => {
  return useMutation({
    mutationKey: ['createTransaction'],
    mutationFn: async (transactionData: Transaction) =>
      createTransaction(transactionData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};

const useDeleteTransaction = () => {
  return useMutation({
    mutationKey: ['deleteTransaction'],
    mutationFn: async (id: number) => deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};

const useUpdateTransaction = (id: number) => {
  return useMutation({
    mutationKey: ['updateTransaction'],
    mutationFn: async (transactionData: Transaction) =>
      updateTransaction(id, transactionData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};

export {
  useTransactions,
  useCreateTransaction,
  useDeleteTransaction,
  useTransactionById,
  useUpdateTransaction,
};
