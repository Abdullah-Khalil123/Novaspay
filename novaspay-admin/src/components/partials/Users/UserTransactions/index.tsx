import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PaginationComp } from '@/components/custom/pagination';
import useDebounce from '@/hooks/useDebounce';
import { usePagination } from '@/hooks/usePagination';
import { useGetUserTransactions } from '@/hooks/useUsers';
import type { Transaction } from '@/types/user';

const UserTransactions = () => {
  const { userId } = useParams<{ userId: string }>();
  const [search, setSearch] = useState('');
  const debounceSearch = useDebounce(search);

  const { page, pageSize, setPage, setPageSize } = usePagination({
    defaultPage: 1,
    defaultPageSize: 10,
  });

  const { data, isLoading } = useGetUserTransactions(userId as string, {
    page,
    per_page: pageSize,
    search: debounceSearch,
  });

  const transactions: Transaction[] = data?.data || [];
  const pagination = data?.meta || {};

  if (isLoading) return <p>Loading transactions...</p>;

  return (
    <div>
      <Input
        placeholder="Search by description, type, or reference"
        className="mb-4 max-w-sm"
        onChange={(e) => setSearch(e.target.value)}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Balance Before</TableHead>
            <TableHead>Balance After</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell>{txn.id}</TableCell>
                <TableCell>{txn.transaction_id}</TableCell>
                <TableCell>
                  {txn.metadata?.adjustment_type || txn.type}
                </TableCell>
                <TableCell>{txn.status}</TableCell>
                <TableCell>{txn.amount}</TableCell>
                <TableCell>{txn.balance_before}</TableCell>
                <TableCell>{txn.balance_after}</TableCell>
                <TableCell>{txn.currency}</TableCell>
                <TableCell>
                  {txn.description || txn.metadata?.admin_reason}
                </TableCell>
                <TableCell>
                  {new Date(txn.created_at).toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={10}
                className="text-center text-muted-foreground"
              >
                No transactions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <PaginationComp
        currentPage={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newSize) => setPageSize(newSize)}
        totalPages={pagination.last_page || 1}
      />
    </div>
  );
};

export default UserTransactions;
