import { useKYCs } from '@/hooks/useKYC';
import KycTable from './KYCTable';
import type { KYC } from '@/types/kyc';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PaginationComp } from '@/components/custom/pagination';
import { usePagination } from '@/hooks/usePagination';

const KYCList = () => {
  const navigate = useNavigate();
  const { page, pageSize, setPage, setPageSize } = usePagination();

  const { data } = useKYCs({
    page,
    limit: pageSize,
  });
  const kycs: KYC[] = data?.data || [];

  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
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
        currentPage={
          Number(new URLSearchParams(window.location.search).get('page')) || 1
        }
        totalPages={Math.ceil(
          (data?.pagination?.total || 0) / (data?.pagination?.limit || 1)
        )}
        pageSize={pageSize}
        onPageChange={(page) => setPage(page)}
        onPageSizeChange={(size) => setPageSize(size)}
      />
    </div>
  );
};

export default KYCList;
