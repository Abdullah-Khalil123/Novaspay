import {
  login,
  //  me
} from '@/actions/auth';
import {
  useMutation,
  // useQuery
} from '@tanstack/react-query';

const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      login(credentials),
  });
};

// const useMe = () => {
//   return useQuery({
//     queryKey: ['me'],
//     queryFn: () => me(), // Adjust as needed
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   });
// };

export { useLogin /* useMe */ };
