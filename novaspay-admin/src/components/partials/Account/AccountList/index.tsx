import { useAccounts } from '@/hooks/useAccounts';
import AccountTable from './AccountTable';
import type { Account } from '@/types/accounts';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PaginationComp } from '@/components/custom/pagination';
import { usePagination } from '@/hooks/usePagination';
import { useState } from 'react';
import FilterBar from '@/components/custom/Filter';

const Accounts = () => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => setFilters({});

  const navigate = useNavigate();
  const { page, setPage, pageSize, setPageSize } = usePagination();

  const { data } = useAccounts({
    page,
    limit: pageSize,
    ...filters,
  });
  const accounts: Account[] = data?.data || [];

  // accountNumber,
  // bankingName,
  // ibanNumber,
  // accountName,
  // currency,
  // status,
  return (
    <div className="relative pb-6">
      <FilterBar
        fields={[
          {
            type: 'text',
            name: 'accountNumber',
            label: 'Account Number',
            placeholder: 'Filter by Account Number',
          },
          {
            type: 'text',
            name: 'bankingName',
            label: 'Banking Name',
            placeholder: 'Filter by Banking Name',
          },
          {
            type: 'text',
            name: 'ibanNumber',
            label: 'IBAN Number',
            placeholder: 'Filter by IBAN Number',
          },
          {
            type: 'text',
            name: 'accountName',
            label: 'Account Name',
            placeholder: 'Filter by Account Name',
          },
          {
            type: 'text',
            name: 'currency',
            label: 'Currency',
            placeholder: 'Filter by Currency',
          },
          {
            type: 'select',
            name: 'status',
            label: 'Status',
            placeholder: 'Filter by Status',
            options: [
              { label: 'Active', value: 'ACTIVE' },
              { label: 'Inactive', value: 'INACTIVE' },
              { label: 'Pending', value: 'SUSPENDED' },
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
