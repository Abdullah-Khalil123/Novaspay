import {
  createOnboarding,
  deleteOnboarding,
  getAllOnboardings,
  getOnboarding,
  updateOnboarding,
} from '@/actions/onBoarding';
import { queryClient } from '@/providers/react-query';
import type { OnBoarding } from '@/types/onBoarding';
import type { Params } from '@/types/params';
import { useMutation, useQuery } from '@tanstack/react-query';

const useOnboardings = (params?: Params) => {
  return useQuery({
    queryKey: ['onboardings', params?.page, params?.limit],
    queryFn: async () => getAllOnboardings(params),
  });
};

const useOnboardingById = (id: number) => {
  return useQuery({
    queryKey: ['onboarding', id],
    queryFn: async () => getOnboarding(id),
    enabled: !!id,
  });
};

const useCreateOnboarding = () => {
  return useMutation({
    mutationKey: ['createOnboarding'],
    mutationFn: async (data: OnBoarding) => createOnboarding(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboardings'] });
    },
  });
};

const useDeleteOnboarding = () => {
  return useMutation({
    mutationKey: ['deleteOnboarding'],
    mutationFn: async (id: number) => deleteOnboarding(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboardings'] });
    },
  });
};

const useUpdateOnboarding = (id: number) => {
  return useMutation({
    mutationKey: ['updateOnboarding'],
    mutationFn: async (data: OnBoarding) => updateOnboarding(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboardings'] });
    },
  });
};

export {
  useOnboardings,
  useOnboardingById,
  useCreateOnboarding,
  useDeleteOnboarding,
  useUpdateOnboarding,
};
