import { useVAs } from '@/hooks/useVa';
import VATable from './VaTable';
import type { VA } from '@/types/va';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PaginationComp } from '@/components/custom/pagination';
import { usePagination } from '@/hooks/usePagination';

const VAs = () => {
  const navigate = useNavigate();

  const { page, setPage, pageSize, setPageSize } = usePagination();

  const { data } = useVAs();
  const vas: VA[] = data?.data || [];

  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
        <Button
          onClick={() => {
            navigate('/admin/vas/create');
          }}
        >
          Create New
        </Button>
      </div>
      <VATable vas={vas} />
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

export default VAs;
