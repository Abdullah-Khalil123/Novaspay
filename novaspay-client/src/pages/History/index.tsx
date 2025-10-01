import HistoryFilter from './HistoryFilter';
import PageFilters from '../../components/custom/pagination';
import { useTransactions } from '@/hooks/useTransaction';
import type { Transaction } from '@/types/transaction';
import { useState, useEffect } from 'react';
import { usePagination } from '@/hooks/usePagination';

const HistoryPage = () => {
  const [filters, setFilters] = useState({
    orderId: '',
    area: '',
    receiverName: '',
    receiverNumber: '',
    orderType: '',
    status: '',
  });

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

  // Pass filters + pagination to hook
  const { data, isLoading, refetch } = useTransactions({
    ...filters,
    page: currentPage,
    limit: pageSize,
  });

  const totalApiItems = data?.pagination?.total || 0;

  useEffect(() => {
    setTotalItems(totalApiItems);
  }, [totalApiItems, setTotalItems]);

  const transactions: Transaction[] = data?.data || [];

  return (
    <div className="px-padding mt-2">
      <HistoryFilter
        filters={filters}
        setFilters={setFilters}
        refetch={refetch}
      />

      <div className="bg-secondary rounded-md border border-border mt-4 p-4">
        <div className="overflow-x-auto">
          <table className="table-fixed text-sm w-full border-collapse">
            <thead className="text-text-primary bg-background">
              <tr>
                {[
                  'Order Id',
                  'Account Name',
                  'Payment Account',
                  'Receiver Name',
                  'Receiver Number',
                  'Amount',
                  'Fee',
                  'Status',
                  'Order Type',
                  'Reason',
                  'Created At',
                  'Updated At',
                ].map((header, i) => (
                  <th key={i} className="w-[80px] min-w-[80px] px-2 py-2">
                    {header}
                  </th>
                ))}
                <th className="w-[100px] sticky right-0 bg-background z-10"></th>
              </tr>
            </thead>

            <tbody className="text-center text-text-primary">
              {isLoading ? (
                <tr>
                  <td colSpan={13} className="py-10">
                    Loading...
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={13} className="py-10">
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions.map((tx, idx) => (
                  <tr
                    key={tx.id}
                    className={
                      idx % 2 === 0
                        ? 'bg-background border-t border-t-border'
                        : 'border-t border-t-border'
                    }
                  >
                    <td className="px-2 py-2">{tx.orderId}</td>
                    <td className="px-2 py-2">{tx.accountName}</td>
                    <td className="px-2 py-2">{tx.paymentAccount}</td>
                    <td className="px-2 py-2">{tx.receiverName}</td>
                    <td className="px-2 py-2">{tx.receiverNumber}</td>
                    <td className="px-2 py-2">{tx.amount}</td>
                    <td className="px-2 py-2">{tx.fee}</td>
                    <td className="px-2 py-2">{tx.status}</td>
                    <td className="px-2 py-2">{tx.orderType}</td>
                    <td className="px-2 py-2">{tx.reason}</td>
                    <td className="px-2 py-2">{tx.createdAt}</td>
                    <td className="px-2 py-2">{tx.updatedAt}</td>
                    <td className="w-[40px] sticky right-0 bg-background text-text-primary text-center space-y-2">
                      <p className="hover:text-[#60831a] cursor-pointer">
                        Credential
                      </p>
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

export default HistoryPage;
