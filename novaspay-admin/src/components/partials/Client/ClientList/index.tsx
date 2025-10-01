import { useClients } from '@/hooks/useClient';
import ClientTable from './ClientTable';
import type { Client } from '@/types/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { usePagination } from '@/hooks/usePagination';
import { PaginationComp } from '@/components/custom/pagination';

const Clients = () => {
  const navigate = useNavigate();

  const { page, setPage, pageSize, setPageSize } = usePagination();

  const { data } = useClients();
  const clients: Client[] = data?.data || [];

  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
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
        totalPages={data?.pagination.total / data?.pagination?.limit || 1}
      />
    </div>
  );
};

export default Clients;
