import { useKYCs } from '@/hooks/useKYC';
import KycTable from './KYCTable';
import type { KYC } from '@/types/kyc';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PaginationComp } from '@/components/custom/pagination';
import { usePagination } from '@/hooks/usePagination';
import { useState } from 'react';
import FilterBar from '@/components/custom/Filter';

const KYCList = () => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => setFilters({});

  const navigate = useNavigate();
  const { page, pageSize, setPage, setPageSize } = usePagination();

  const { data } = useKYCs({
    page,
    limit: pageSize,
    ...filters,
  });
  const kycs: KYC[] = data?.data || [];

  return (
    <div className="relative pb-6">
      <FilterBar
        fields={[
          {
            type: 'text',
            name: 'email',
            label: 'Email',
            placeholder: 'Filter by Email',
          },
          {
            type: 'text',
            name: 'name',
            label: 'Name',
            placeholder: 'Filter by Name',
          },

          {
            type: 'select',
            name: 'status',
            label: 'Status',
            placeholder: 'Filter by Status',
            options: [
              { label: 'Success', value: 'SUCCESS' },
              { label: 'Pending', value: 'PENDING' },
              { label: 'Failed', value: 'FAILED' },
              { label: 'Canceled', value: 'CANCELED' },
              { label: 'In Review', value: 'IN_REVIEW' },
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
            navigate('/admin/kyc/create');
          }}
        >
          Create New
        </Button>
      </div>
      <KycTable kycs={kycs} />
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

export default KYCList;
