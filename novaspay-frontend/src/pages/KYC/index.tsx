import KYCFilter from './KYCFilter';
import PageFilters from '../../components/custom/pagination';
import { useKYCs } from '@/hooks/useKYC';
import type { KYC } from '@/types/kyc';
import { useState, useEffect } from 'react';
import { usePagination } from '@/hooks/usePagination';

const KYCPage = () => {
  const [filters, setFilters] = useState({ email: '', name: '', status: '' });

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

  // hook with pagination + filters
  const { data, isLoading, refetch } = useKYCs({
    ...filters,
    page: currentPage,
    limit: pageSize,
  });

  const totalApiItems = data?.pagination?.total || 0;

  useEffect(() => {
    setTotalItems(totalApiItems);
  }, [totalApiItems, setTotalItems]);

  const kycData: KYC[] = data?.data || [];

  return (
    <div className="px-padding mt-2">
      <KYCFilter filters={filters} setFilters={setFilters} refetch={refetch} />

      <div className="bg-secondary rounded-md border border-border mt-4 p-4">
        <div className="overflow-x-auto">
          <table className="table-fixed text-sm w-full border-collapse">
            <thead className="text-text-primary bg-background">
              <tr>
                {[
                  'Email',
                  'Type',
                  'Name',
                  'Phone',
                  'AgentId',
                  'Status',
                  'Creation Date',
                  'Reason',
                  'Latest Update',
                ].map((header, i) => (
                  <th key={i} className="w-[80px] min-w-[80px] px-2 py-2">
                    {header}
                  </th>
                ))}
                <th className="w-[60px] sticky right-0 bg-background z-10"></th>
              </tr>
            </thead>

            <tbody className="text-center text-text-primary">
              {isLoading ? (
                <tr>
                  <td colSpan={10} className="py-10">
                    Loading...
                  </td>
                </tr>
              ) : kycData.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-10">
                    No KYC records found.
                  </td>
                </tr>
              ) : (
                kycData.map((acc, idx) => (
                  <tr
                    key={acc.id || idx}
                    className={
                      idx % 2 === 0
                        ? 'bg-background border-t border-t-border'
                        : 'border-t border-t-border'
                    }
                  >
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.email}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.type}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.name}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.phone}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.agentId}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.status}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.createdAt}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.reason}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.updatedAt}
                    </td>
                    <td
                      className={`w-[40px] sticky right-0 font-sans text-end space-y-4 text-[#c2cb3d]${
                        idx % 2 === 0 ? ' bg-background' : ' bg-secondary'
                      }`}
                    >
                      <p className="hover:text-[#60831a] cursor-pointer">
                        Update
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

export default KYCPage;
