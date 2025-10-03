import { useClients } from '@/hooks/useClient';
import ClientTable from './ClientTable';
import type { Client } from '@/types/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { usePagination } from '@/hooks/usePagination';
import { PaginationComp } from '@/components/custom/pagination';
import { useState } from 'react';
import FilterBar from '@/components/custom/Filter';

const Clients = () => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => setFilters({});

  const navigate = useNavigate();
  const { page, setPage, pageSize, setPageSize } = usePagination();

  const { data } = useClients({
    page,
    limit: pageSize,
    ...filters,
  });
  const clients: Client[] = data?.data || [];

  return (
    <div className="relative pb-6">
      <FilterBar
        fields={[
          {
            type: 'text',
            name: 'clientName',
            label: 'Client Name',
            placeholder: 'Filter by Client Name',
          },
          {
            type: 'text',
            name: 'email',
            label: 'Email',
            placeholder: 'Filter by Email',
          },
          {
            type: 'text',
            name: 'country',
            label: 'Country',
            placeholder: 'Filter by Country',
          },
        ]}
        values={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
      />
      <div className="my-4 flex items-center justify-end">
        <Button
          onClick={() => {
            navigate('/admin/clients/create');
          }}
        >
          Create New
        </Button>
      </div>
      <ClientTable clients={clients} />
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

export default Clients;
