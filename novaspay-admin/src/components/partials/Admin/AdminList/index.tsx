import { useAdmins } from '@/hooks/useAdmin';
import AdminTable from './AdminTable';
import type { Admin } from '@/types/admin';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PaginationComp } from '@/components/custom/pagination';
import { usePagination } from '@/hooks/usePagination';
import { useState } from 'react';
import FilterBar from '@/components/custom/Filter';
import { UserPlus } from 'lucide-react';

const Admins = () => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => setFilters({});

  const navigate = useNavigate();
  const { page, setPage, pageSize, setPageSize } = usePagination();

  const { data, isLoading } = useAdmins({
    page,
    limit: pageSize,
    ...filters,
  });

  const admins: Admin[] = data?.data || [];

  return (
    <div className="relative pb-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Users</h1>
          <p className="text-muted-foreground mt-2">
            Manage admin users and their access
          </p>
        </div>
        <Button onClick={() => navigate('/admin/admins/create')} size="lg">
          <UserPlus className="mr-2 h-4 w-4" />
          Create Admin
        </Button>
      </div>

      <FilterBar
        fields={[
          {
            type: 'text',
            name: 'name',
            label: 'Name',
            placeholder: 'Filter by name',
          },
          {
            type: 'text',
            name: 'email',
            label: 'Email',
            placeholder: 'Filter by email',
          },
        ]}
        values={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Loading admins...</div>
        </div>
      ) : (
        <>
          <AdminTable admins={admins} />
          <PaginationComp
            currentPage={page}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            pageSize={pageSize}
            totalPages={Math.ceil(
              (data?.pagination?.total || 0) / (data?.pagination?.limit || 1)
            )}
          />
        </>
      )}
    </div>
  );
};

export default Admins;
