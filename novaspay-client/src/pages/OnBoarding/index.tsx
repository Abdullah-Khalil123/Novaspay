import { useOnboardings } from '@/hooks/useOnBoarding';
import PageFilters from '../../components/custom/pagination';
import OnboardingFilters from './OnBoardingFilters';
import type { OnBoarding } from '@/types/onBoarding';
import { usePagination } from '@/hooks/usePagination';
import { useEffect } from 'react';

const OnboardingPage = () => {
  const {
    currentPage,
    pageSize,
    totalPages,
    setTotalItems,
    setCurrentPage,
    setPageSize,
  } = usePagination({
    totalItems: 0,
    initialPage: 1,
    initialPageSize: 10,
  });

  const { data, isLoading } = useOnboardings({
    page: currentPage,
    limit: pageSize,
  });

  const totalApiItems = data?.pagination?.total || 0;

  useEffect(() => {
    setTotalItems(totalApiItems);
  }, [totalApiItems, setTotalItems]);

  const onboardings: OnBoarding[] = data?.data || [];

  return (
    <div className="px-padding mt-2">
      <OnboardingFilters />
      <div className="bg-secondary rounded-md border border-border mt-4 p-4">
        <div className="overflow-x-auto">
          <table className="table-fixed text-sm w-full border-collapse">
            <thead className="text-text-primary bg-background">
              <tr>
                {[
                  'Client Name',
                  'Account Error Msg',
                  'Bank Account Status Msg',
                  'Reason',
                  'Creation date',
                ].map((header, i) => (
                  <th key={i} className="w-[80px] min-w-[80px] px-2 py-2">
                    {header}
                  </th>
                ))}
                <th className="w-[120px] sticky right-0 bg-background z-10"></th>
              </tr>
            </thead>
            <tbody className="text-center text-text-primary">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-4">
                    Loading...
                  </td>
                </tr>
              ) : onboardings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-4">
                    No onboarding records found.
                  </td>
                </tr>
              ) : (
                onboardings.map((acc, idx) => (
                  <tr
                    key={acc.id || idx}
                    className={
                      idx % 2 === 0
                        ? 'bg-background border-t border-t-border'
                        : 'border-t border-t-border'
                    }
                  >
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {acc.clientName}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {acc.accountErrorMessage}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {acc.bankAccountStatusMsg}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {acc.reason}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {acc.createdAt}
                    </td>
                    <td
                      className={`sticky right-0 font-sans text-center space-y-4 text-[#c2cb3d]${
                        idx % 2 === 0 ? ' bg-background' : ' bg-secondary'
                      }`}
                    >
                      <p className="hover:text-[#60831a] cursor-pointer">
                        Details
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <PageFilters
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          setPageSize={setPageSize}
          pageSize={pageSize}
          totalPages={totalPages || 1}
        />
      </div>
    </div>
  );
};

export default OnboardingPage;
