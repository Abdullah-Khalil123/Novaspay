import {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
} from '@/actions/application';
import { useMutation, useQuery } from '@tanstack/react-query';

const useApplicaton = (params?: any) => {
  return useQuery({
    queryKey: ['applications', params],
    queryFn: async () => getApplications(params),
  });
};

const useApplicationById = (id: number) => {
  return useQuery({
    queryKey: ['application', id],
    queryFn: async () => getApplication(id),
    enabled: !!id,
  });
};

const useCreateApplication = () => {
  return useMutation({
    mutationKey: ['createApplication'],
    mutationFn: async (applicationData: any) =>
      createApplication(applicationData),
  });
};

const useUpdateApplication = (id: number) => {
  return useMutation({
    mutationKey: ['updateApplication'],
    mutationFn: async (applicationData: any) =>
      updateApplication(id, applicationData),
  });
};

export {
  useApplicaton,
  useApplicationById,
  useCreateApplication,
  useUpdateApplication,
};
