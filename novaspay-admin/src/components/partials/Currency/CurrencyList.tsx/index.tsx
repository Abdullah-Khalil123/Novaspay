import { useCurrencies } from '@/hooks/useCurrency';
import CurrencyTable from './CurrencyTable';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { usePagination } from '@/hooks/usePagination';
import { PaginationComp } from '@/components/custom/pagination';
import { useState } from 'react';
import FilterBar from '@/components/custom/Filter';

const Currencies = () => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => setFilters({});

  const navigate = useNavigate();
  const { page, setPage, pageSize, setPageSize } = usePagination();

  const { data } = useCurrencies({
    page,
    limit: pageSize,
    ...filters,
  });

  const currencies = data?.data || [];

  return (
    <div className="relative pb-6">
      <FilterBar
        fields={[
          {
            type: 'text',
            name: 'symbol',
            label: 'Symbol',
            placeholder: 'Filter by Symbol',
          },
        ]}
        values={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
      />
      <div className="my-4 flex items-center justify-end">
        <Button
          onClick={() => {
            navigate('/admin/currencies/create');
          }}
        >
          Create New
        </Button>
      </div>
      <CurrencyTable currencies={currencies} />
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

export default Currencies;
