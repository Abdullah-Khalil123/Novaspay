import ActionsDropdown from '@/components/custom/dropdown';
import { PaginationComp } from '@/components/custom/pagination';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useDebounce from '@/hooks/useDebounce';
import { usePagination } from '@/hooks/usePagination';
import { useRemoveUser, useUsers } from '@/hooks/useUsers';
import type { User } from '@/types/user';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const UserListPage = () => {
  const [search, setSearch] = useState('');
  const debounceSearch = useDebounce(search);
  const navigate = useNavigate();
  const { page, pageSize, setPage, setPageSize } = usePagination({
    defaultPage: 1,
    defaultPageSize: 10,
  });
  const { data } = useUsers({
    page: page,
    per_page: pageSize,
    search: debounceSearch,
  });
  const users: User[] = data?.data || [];
  const pagination = data?.meta || {};

  // Delete user
  const { mutate } = useRemoveUser();
  const handleDeleteUser = (userId: number) => {
    mutate(String(userId), {
      onSuccess: () => {
        toast.success('User deleted successfully');
      },
      onError: () => {
        toast.error('Failed to delete user');
      },
    });
  };
  return (
    <div>
      <Input
        placeholder="Search by nickname or email"
        className="mb-4 max-w-sm"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nick Name</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>2FA</TableHead>
            <TableHead>VIP Level</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, idx) => (
            <TableRow key={idx}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.nickname}</TableCell>
              <TableCell>{user.balance}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.language?.toUpperCase()}</TableCell>
              <TableCell>{user.preferred_currency}</TableCell>
              <TableCell>
                {user.two_factor_enabled ? 'Enabled' : 'Disabled'}
              </TableCell>
              <TableCell>{user.vip_level}</TableCell>
              <TableCell>{user.last_login_at || 'N/A'}</TableCell>
              <TableCell>
                <ActionsDropdown
                  label="Actions"
                  actions={[
                    {
                      label: 'Edit',
                      onClick: () => {
                        navigate(`/admin/users/edit/${user.id}`);
                      },
                    },
                    {
                      label: 'Manage Funds',
                      onClick: () => {
                        navigate(`/admin/users/${user.id}/funds`);
                      },
                    },
                    {
                      label: 'View Transactions',
                      onClick: () => {
                        navigate(`/admin/users/${user.id}/transactions`);
                      },
                    },
                    {
                      label: 'Delete',
                      variant: 'destructive',
                      onClick: () => {
                        handleDeleteUser(user.id!);
                      },
                    },
                  ]}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationComp
        currentPage={page}
        pageSize={pageSize}
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
        }}
        totalPages={pagination.last_page || 1}
      />
    </div>
  );
};

export default UserListPage;
