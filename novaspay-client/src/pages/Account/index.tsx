import { useEffect, useState } from 'react';
import { useAccounts } from '@/hooks/useAccounts';
import AccountsFilters from './filter';
import PageFilters from '../../components/custom/pagination';
import type { Account } from '@/types/accounts';
import { usePagination } from '@/hooks/usePagination';

const ReceiveAccount = () => {
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

  // State for filters
  const [filters, setFilters] = useState({
    accountNumber: '',
    bankingName: '',
    ibanNumber: '',
    accountName: '',
    currency: '',
    status: '',
  });
  // Pass filters as params to the hook
  const { data, isLoading, refetch } = useAccounts({
    page: currentPage,
    limit: pageSize,
    ...filters,
  });

  const totalApiItems = data?.pagination?.total || 0;

  useEffect(() => {
    setTotalItems(totalApiItems);
  }, [totalApiItems, setTotalItems]);

  const accounts: Account[] = data?.data || [];

  return (
    <div className="px-padding mt-2">
      <AccountsFilters
        filters={filters}
        setFilters={setFilters}
        refetch={refetch}
      />

      <div className="bg-secondary border mt-4 border-border p-2">
        <div className="overflow-x-auto">
          <table className="table-fixed text-sm w-full border-collapse">
            <thead className="text-text-primary bg-background">
              <tr>
                {[
                  'Banking Name',
                  'Currency',
                  'Client Name',
                  'IBAN Number',
                  'Balance',
                  'Account Number',
                  'Account Name',
                  'Banking Address',
                  'Creation Date',
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
                  <td colSpan={11} className="py-4">
                    Loading...
                  </td>
                </tr>
              ) : accounts.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-4">
                    No accounts found.
                  </td>
                </tr>
              ) : (
                accounts.map((acc, idx) => (
                  <tr
                    key={acc.id || idx}
                    className={
                      idx % 2 === 0
                        ? 'bg-background border-t border-t-border'
                        : 'border-t border-t-border'
                    }
                  >
                    <td className="w-[80px] h-16 min-w-[80px] px-2 py-4 truncate">
                      {acc.bankingName}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {acc.currency}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {acc.clientName}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {acc.ibanNumber}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {acc.balance}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {acc.accountNumber}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {acc.accountName}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {acc.bankingAddress}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {acc.createdAt}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {acc.updatedAt}
                    </td>
                    <td className="w-[60px] sticky right-0 bg-background text-center">
                      <p className="text-[#354a0c] hover:text-[#60831a] cursor-pointer">
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

export default ReceiveAccount;
