import { useApplicaton } from '@/hooks/useApplication';
import ApplicationTable from './ApplicationTable';
import type { Application } from '@/types/application';
import { PaginationComp } from '@/components/custom/pagination';
import { usePagination } from '@/hooks/usePagination';
import { useState } from 'react';
import FilterBar from '@/components/custom/Filter';

const ApplicationList = () => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => setFilters({});

  const { page, setPage, pageSize, setPageSize } = usePagination();

  const { data } = useApplicaton({
    page,
    limit: pageSize,
    ...filters,
  });
  const applications: Application[] = data?.data || [];

  return (
    <div className="relative pb-6">
      <FilterBar
        fields={[
          {
            type: 'text',
            name: 'area',
            label: 'Area',
            placeholder: 'Filter by Area',
          },
          {
            type: 'text',
            name: 'vaBankAccount',
            label: 'VA Bank Account',
            placeholder: 'Filter by VA Bank Account',
          },
          {
            type: 'text',
            name: 'transactionType',
            label: 'Transaction Type',
            placeholder: 'Filter by Transaction Type',
          },
          {
            type: 'text',
            name: 'toCurrency',
            label: 'To Currency',
            placeholder: 'Filter by Currency',
          },
          {
            type: 'text',
            name: 'cryptoAddress',
            label: 'Crypto Address',
            placeholder: 'Filter by Crypto Address',
          },
          {
            type: 'select',
            name: 'status',
            label: 'Status',
            placeholder: 'Filter by Status',
            options: [
              // { label: 'Success', value: 'SUCCESS' },
              // { label: 'Pending', value: 'PENDING' },
              // { label: 'Failed', value: 'FAILED' },
              // { label: 'Canceled', value: 'CANCELED' },
              // { label: 'In Review', value: 'IN_REVIEW' },
              { label: 'Approved', value: 'Approved' },
              { label: 'Rejected', value: 'Rejected' },
              { label: 'Pending', value: 'Pending' },
              { label: 'In Review', value: 'InReview' },
            ],
          },
        ]}
        values={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
      />
      <br />
      <ApplicationTable applications={applications} />
      <PaginationComp
        currentPage={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        pageSize={pageSize}
        totalPages={Math.ceil(
          (data?.pagination?.total || 0) / (data?.pagination?.limit || 1)
        )}
      />
    </div>
  );
};

export default ApplicationList;
