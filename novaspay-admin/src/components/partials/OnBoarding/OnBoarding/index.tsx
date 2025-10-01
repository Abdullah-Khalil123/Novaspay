import { useOnboardings } from '@/hooks/useOnBoarding';
import OnboardingTable from './OnBoardingTable';
import type { OnBoarding } from '@/types/onBoarding';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PaginationComp } from '@/components/custom/pagination';
import { usePagination } from '@/hooks/usePagination';

const Onboardings = () => {
  const navigate = useNavigate();

  const { page, setPage, pageSize, setPageSize } = usePagination();

  const { data } = useOnboardings();
  const onboardings: OnBoarding[] = data?.data || [];

  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
        <Button
          onClick={() => {
            navigate('/admin/onboardings/create');
          }}
        >
          Create New
        </Button>
      </div>
      <OnboardingTable onboardings={onboardings} />
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

export default Onboardings;
