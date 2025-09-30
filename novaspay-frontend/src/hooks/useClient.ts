import {
  createClient,
  deleteClient,
  getAllClients,
  getClient,
  updateClient,
} from '@/actions/client';
import { queryClient } from '@/providers/react-query';
import type { Client } from '@/types/client';
import type { Params } from '@/types/params';
import { useMutation, useQuery } from '@tanstack/react-query';

const useClients = (params?: Params) => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: async () => getAllClients(params),
  });
};

const useClientById = (id: number) => {
  return useQuery({
    queryKey: ['client', id],
    queryFn: async () => getClient(id),
    enabled: !!id,
  });
};

const useCreateClient = () => {
  return useMutation({
    mutationKey: ['createClient'],
    mutationFn: async (data: Client) => createClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};

const useDeleteClient = () => {
  return useMutation({
    mutationKey: ['deleteClient'],
    mutationFn: async (id: number) => deleteClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};

const useUpdateClient = (id: number) => {
  return useMutation({
    mutationKey: ['updateClient'],
    mutationFn: async (data: Client) => updateClient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};

export {
  useClients,
  useClientById,
  useCreateClient,
  useDeleteClient,
  useUpdateClient,
};
