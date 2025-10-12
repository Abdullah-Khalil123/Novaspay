import HistoryFilter from './HistoryFilter';
import PageFilters from '../../components/custom/pagination';
import { useTransactions } from '@/hooks/useTransaction';
import type { Transaction } from '@/types/transaction';
import { useState, useEffect } from 'react';
import { usePagination } from '@/hooks/usePagination';
import Draggable from '@/components/custom/dragable';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HistoryPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState<Transaction | null>(null);
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

      <div className="bg-secondary rounded-md border border-border-color mt-4 p-4">
        <div className="overflow-x-auto">
          <table className="table-fixed text-sm w-full border-collapse">
            <thead className="text-text-primary">
              <tr>
                {[
                  t('Order Id'),
                  t('Account Name'),
                  t('Payment Account'),
                  t('Receiver Name'),
                  t('Receiver Number'),
                  t('Amount'),
                  t('Fee'),
                  t('Status'),
                  t('Order Type'),
                  t('Reason'),
                  t('Created At'),
                  t('Updated At'),
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
                    {t('Loading...')}
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={13} className="py-10">
                    {t('No transactions found')}
                  </td>
                </tr>
              ) : (
                transactions.map((tx, idx) => (
                  <tr
                    key={tx.id}
                    className={
                      idx % 2 === 0
                        ? ' border-t border-t-border-color'
                        : ' bg-background border-t border-t-border-color'
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
                    <td
                      title={tx.reason as string}
                      className="px-2 py-2 max-h-[50px] line-clamp-3 text-ellipsis"
                    >
                      {tx.reason}
                    </td>
                    <td className="px-2 py-2">
                      <p className="text-ellipsis line-clamp-1">
                        {tx.createdAt}
                      </p>
                    </td>
                    <td className="px-2 py-2">{tx.updatedAt}</td>
                    <td className="w-[40px] sticky right-0 bg-background text-text-primary text-center space-y-2">
                      <p
                        onClick={() =>
                          navigate(
                            '/banking/history/DetailOpenDeposit' +
                              `?id=${tx.id}`
                          )
                        }
                        className="hover:text-[#60831a] cursor-pointer"
                      >
                        {t('Credential')}
                      </p>
                      <p
                        onClick={() => setShowDetails(tx)}
                        className="hover:text-[#60831a] cursor-pointer"
                      >
                        {t('Details')}
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

        {showDetails && (
          <Draggable
            className="px-8 min-w-[600px] space-y-1 py-6 bg-background shadow-lg rounded-md"
            title={t('History Details')}
            Open={setShowDetails}
          >
            <p>
              {t('Account Name')}:{' '}
              <span className="text-gray-500">{showDetails.accountName}</span>
            </p>
            <p>
              {t('Amount')}:{' '}
              <span className="text-gray-500">{showDetails.amount}</span>
            </p>
            <p>
              {t('Order Type')}:{' '}
              <span className="text-gray-500">{showDetails.orderType}</span>
            </p>
            <p>
              {t('Payment Account')}:{' '}
              <span className="text-gray-500">
                {showDetails.paymentAccount}
              </span>
            </p>
            <p>
              {t('Reason')}:{' '}
              <span className="text-gray-500">{showDetails.reason}</span>
            </p>
            <p>
              {t('Receiver Name')}:{' '}
              <span className="text-gray-500">{showDetails.receiverName}</span>
            </p>
            <p>
              {t('Receiver Number')}:{' '}
              <span className="text-gray-500">
                {showDetails.receiverNumber}
              </span>
            </p>
            <p>
              {t('Status')}:{' '}
              <span className="text-gray-500">{showDetails.status}</span>
            </p>
          </Draggable>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
