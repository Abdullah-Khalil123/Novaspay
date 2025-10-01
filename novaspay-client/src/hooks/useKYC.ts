import {
  createKYC,
  deleteKYC,
  getAllKYCs,
  getKYC,
  updateKYC,
} from '@/actions/kyc';
import { queryClient } from '@/providers/react-query';
import type { KYC } from '@/types/kyc';
import type { Params } from '@/types/params';
import { useMutation, useQuery } from '@tanstack/react-query';

const useKYCs = (param?: Params) => {
  return useQuery({
    queryKey: ['kycs', param?.page, param?.limit],
    queryFn: async () => getAllKYCs(param),
  });
};

const useKYCById = (id: number) => {
  return useQuery({
    queryKey: ['kyc', id],
    queryFn: async () => getKYC(id),
    enabled: !!id,
  });
};

const useCreateKYC = () => {
  return useMutation({
    mutationKey: ['createKYC'],
    mutationFn: async (kycData: KYC) => createKYC(kycData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kycs'] });
    },
  });
};

const useDeleteKYC = () => {
  return useMutation({
    mutationKey: ['deleteKYC'],
    mutationFn: async (id: number) => deleteKYC(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kycs'] });
    },
  });
};

const useUpdateKYC = (id: number) => {
  return useMutation({
    mutationKey: ['updateKYC'],
    mutationFn: async (kycData: KYC) => updateKYC(id, kycData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kycs'] });
    },
  });
};

export { useKYCs, useKYCById, useCreateKYC, useDeleteKYC, useUpdateKYC };
