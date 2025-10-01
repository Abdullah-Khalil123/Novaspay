import { useApplicaton } from '@/hooks/useApplication';
import ApplicationTable from './ApplicationTable';
import type { Application } from '@/types/application';
import { PaginationComp } from '@/components/custom/pagination';
import { usePagination } from '@/hooks/usePagination';

const ApplicationList = () => {
  const { page, setPage, pageSize, setPageSize } = usePagination();

  const { data } = useApplicaton({
    page,
    limit: pageSize,
  });
  const applications: Application[] = data?.data || [];
  return (
    <div>
      <ApplicationTable applications={applications} />
      <PaginationComp
        currentPage={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        pageSize={pageSize}
        totalPages={data?.pagination.total / data?.pagination?.limit + 1 || 1}
      />
    </div>
  );
};

export default ApplicationList;
