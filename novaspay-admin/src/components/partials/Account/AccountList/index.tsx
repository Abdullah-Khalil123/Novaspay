import { useAccounts } from '@/hooks/useAccounts';
import AccountTable from './AccountTable';
import type { Account } from '@/types/accounts';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PaginationComp } from '@/components/custom/pagination';
import { usePagination } from '@/hooks/usePagination';

const Accounts = () => {
  const navigate = useNavigate();
  const { page, setPage, pageSize, setPageSize } = usePagination();

  const { data } = useAccounts({
    page,
    limit: pageSize,
  });
  const accounts: Account[] = data?.data || [];

  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
        <Button
          onClick={() => {
            navigate('/admin/accounts/create');
          }}
        >
          Create New
        </Button>
      </div>
      <AccountTable accounts={accounts} />
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

export default Accounts;
