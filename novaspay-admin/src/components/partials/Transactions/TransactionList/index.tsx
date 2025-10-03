import { useTransactions } from '@/hooks/useTransaction';
import TransactionTable from './TransactionTable';
import type { Transaction } from '@/types/transaction';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { usePagination } from '@/hooks/usePagination';
import { PaginationComp } from '@/components/custom/pagination';
import { useState } from 'react';
import FilterBar from '@/components/custom/Filter';

const Transactions = () => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => setFilters({});
  const navigate = useNavigate();

  const { page, setPage, pageSize, setPageSize } = usePagination();
  const { data } = useTransactions({
    page,
    limit: pageSize,
    ...filters,
  });
  // orderId, receiverName, receiverNumber, orderType, status
  const transactions: Transaction[] = data?.data || [];
  return (
    <div className="relative pb-6">
      <FilterBar
        fields={[
          {
            type: 'text',
            name: 'orderId',
            label: 'Order ID',
            placeholder: 'Filter by Order ID',
          },
          {
            type: 'text',
            name: 'receiverName',
            label: 'Receiver Name',
            placeholder: 'Filter by Receiver Name',
          },
          {
            type: 'text',
            name: 'receiverNumber',
            label: 'Receiver Number',
            placeholder: 'Filter by Receiver Number',
          },
          {
            type: 'select',
            name: 'orderType',
            label: 'Order Type',
            placeholder: 'Filter by Order Type',
            options: [
              {
                label: 'Transfer',
                value: 'Transfer',
              },
              {
                label: 'Withdrawal',
                value: 'Withdrawal',
              },
              {
                label: 'Deposit',
                value: 'Deposit',
              },
              {
                label: 'None',
                value: 'None',
              },
            ],
          },
        ]}
        values={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
      />
      <div className="my-4 flex items-center justify-end">
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
        totalPages={
          Math.ceil(data?.pagination.total / data?.pagination?.limit) || 1
        }
      />
    </div>
  );
};

export default Transactions;
