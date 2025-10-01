import {
  getUsers,
  adjustUserBalance,
  deleteUser,
  getUserById,
  updateUser,
  updateUserStatus,
  getUserTransactions,
  getUserWithdrawals,
} from '@/actions/user';
import { queryClient } from '@/providers/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

const useUsers = (params: any = {}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: async () => getUsers(params),
  });
};

const useUserById = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => getUserById(id),
    enabled: !!id,
  });
};

const useUpdateUserInfo = (id: string) => {
  return useMutation({
    mutationKey: ['updateUser', id],
    mutationFn: async (data: any) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

const useChangeUserStatus = async (
  id: string,
  status: string,
  reason: string
) => {
  return useMutation({
    mutationKey: ['updateUserStatus', id],
    mutationFn: async () => updateUserStatus(id, status, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

const useRemoveUser = () => {
  return useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: async (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

const useModifyUserBalance = (id: string) => {
  return useMutation({
    mutationKey: ['adjustUserBalance', id],
    mutationFn: async ({
      amount,
      reason,
    }: {
      amount: number;
      reason: string;
    }) => adjustUserBalance(id, amount, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    },
  });
};

const useGetUserTransactions = (id: string, params: any = {}) => {
  return useQuery({
    queryKey: ['userTransactions', id],
    queryFn: async () => getUserTransactions(id, params),
    enabled: !!id,
  });
};

const useGetUserWithdrawals = (id: string, params: any = {}) => {
  return useQuery({
    queryKey: ['userWithdrawals', id],
    queryFn: async () => getUserWithdrawals(id, params),
    enabled: !!id,
  });
};

export {
  useUsers,
  useUserById,
  useUpdateUserInfo,
  useChangeUserStatus,
  useRemoveUser,
  useModifyUserBalance,
  useGetUserTransactions,
  useGetUserWithdrawals,
};
