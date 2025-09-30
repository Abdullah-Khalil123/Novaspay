import { createVA, deleteVA, getAllVAs, getVA, updateVA } from '@/actions/va';
import { queryClient } from '@/providers/react-query';
import type { Params } from '@/types/params';
import type { VA } from '@/types/va';
import { useMutation, useQuery } from '@tanstack/react-query';

const useVAs = (params?: Params) => {
  return useQuery({
    queryKey: ['vas'],
    queryFn: async () => getAllVAs(params),
  });
};

const useVAById = (id: number) => {
  return useQuery({
    queryKey: ['va', id],
    queryFn: async () => getVA(id),
    enabled: !!id,
  });
};

const useCreateVA = () => {
  return useMutation({
    mutationKey: ['createVA'],
    mutationFn: async (data: VA) => createVA(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vas'] });
    },
  });
};

const useDeleteVA = () => {
  return useMutation({
    mutationKey: ['deleteVA'],
    mutationFn: async (id: number) => deleteVA(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vas'] });
    },
  });
};

const useUpdateVA = (id: number) => {
  return useMutation({
    mutationKey: ['updateVA'],
    mutationFn: async (data: VA) => updateVA(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vas'] });
    },
  });
};

export { useVAs, useVAById, useCreateVA, useDeleteVA, useUpdateVA };
