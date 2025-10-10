import {
  createAdmin,
  deleteAdmin,
  getAllAdmins,
  getAdmin,
  updateAdmin,
} from '@/actions/admin';
import { queryClient } from '@/providers/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

const useAdmins = (params?: any) => {
  return useQuery({
    queryKey: ['admins', params],
    queryFn: async () => getAllAdmins(params),
  });
};

const useAdminById = (id: number) => {
  return useQuery({
    queryKey: ['admin', id],
    queryFn: async () => getAdmin(id),
    enabled: !!id,
  });
};

const useCreateAdmin = () => {
  return useMutation({
    mutationKey: ['createAdmin'],
    mutationFn: async (adminData: any) => createAdmin(adminData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
  });
};

const useDeleteAdmin = () => {
  return useMutation({
    mutationKey: ['deleteAdmin'],
    mutationFn: async (id: number) => deleteAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
  });
};

const useUpdateAdmin = (id: number) => {
  return useMutation({
    mutationKey: ['updateAdmin'],
    mutationFn: async (adminData: any) => updateAdmin(id, adminData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
  });
};

export {
  useAdmins,
  useAdminById,
  useCreateAdmin,
  useDeleteAdmin,
  useUpdateAdmin,
};
