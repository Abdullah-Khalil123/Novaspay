import { createApplication, getApplication } from '@/actions/application';
import { queryClient } from '@/providers/react-query';
import type { Params } from '@/types/params';
import { useMutation, useQuery } from '@tanstack/react-query';

const useApplications = (params?: Params) => {
  return useQuery({
    queryKey: ['applications', params?.page, params?.limit],
    queryFn: async () => getApplication(params),
  });
};

const useCreateApplication = () => {
  return useMutation({
    mutationKey: ['createApplication'],
    mutationFn: async (data: any) => createApplication(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};

export { useApplications, useCreateApplication };
