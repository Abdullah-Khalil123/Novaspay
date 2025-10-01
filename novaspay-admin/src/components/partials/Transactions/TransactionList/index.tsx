import { useTransactions } from '@/hooks/useTransaction';
import TransactionTable from './TransactionTable';
import type { Transaction } from '@/types/transaction';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { usePagination } from '@/hooks/usePagination';
import { PaginationComp } from '@/components/custom/pagination';

const Transactions = () => {
  const navigate = useNavigate();

  const { page, setPage, pageSize, setPageSize } = usePagination();
  const { data } = useTransactions({
    page,
    limit: pageSize,
  });
  const transactions: Transaction[] = data?.data || [];
  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
        <Button
          onClick={() => {
            navigate('/admin/transactions/create');
          }}
        >
          Create New
        </Button>
      </div>
      <TransactionTable transactions={transactions} />
      <PaginationComp
        currentPage={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        pageSize={pageSize}
        totalPages={data?.pagination.total / data?.pagination?.limit || 1}
      />
    </div>
  );
};

export default Transactions;
