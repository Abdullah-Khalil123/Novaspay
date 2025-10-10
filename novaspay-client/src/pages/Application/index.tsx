import { useEffect, useState } from 'react';
import ApplicationFilters from './filter';
import PageFilters from '../../components/custom/pagination';
import { usePagination } from '@/hooks/usePagination';
import { useApplications } from '@/hooks/useApplications';
import type { Application } from '@/types/application';
import { useTranslation } from 'react-i18next';

const ApplicationList = () => {
  const { t } = useTranslation();

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

  const [filters, setFilters] = useState({
    applicationNo: '',
    status: '',
  });

  const { data, isLoading, refetch } = useApplications({
    page: currentPage,
    limit: pageSize,
    ...filters,
  });

  const totalApiItems = data?.pagination?.total || 0;

  useEffect(() => {
    setTotalItems(totalApiItems);
  }, [totalApiItems, setTotalItems]);

  const applications: Application[] = data?.data || [];

  return (
    <div className="px-padding mt-2">
      <ApplicationFilters
        filters={filters}
        setFilters={setFilters}
        refetch={refetch}
      />

      <div className="bg-secondary border mt-4 border-border-color p-2">
        <div className="overflow-x-auto">
          <table className="table-fixed text-sm w-full border-collapse">
            <thead className="text-text-primary">
              <tr>
                {[
                  t('Application No'),
                  t('Client Name'),
                  t('Area'),
                  t('From Currency'),
                  t('Transaction Type'),
                  t('To Currency'),
                  t('Amount'),
                  t('Reference Rate'),
                  t('Total Amount'),
                  t('Fee Amount'),
                  t('Estimated Amount'),
                  t('Approver'),
                  t('Approver Comment'),
                  t('Remark'),
                  t('Status'),
                  t('Created At'),
                ].map((header, i) => (
                  <th key={i} className="w-[80px] min-w-[80px] px-2 py-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="text-center text-text-primary">
              {isLoading ? (
                <tr>
                  <td colSpan={16} className="py-4">
                    {t('Loading...')}
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={16} className="py-4">
                    {t('No applications found.')}
                  </td>
                </tr>
              ) : (
                applications.map((app, idx) => (
                  <tr
                    key={app.id || idx}
                    className={
                      idx % 2 === 0
                        ? 'border-t border-t-border-color'
                        : 'bg-background border-t border-t-border-color'
                    }
                  >
                    <td className="w-[80px] h-16 min-w-[80px] px-2 py-4 truncate">
                      {app?.client?.name}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {app.clientId}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {app.area}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {app.fromCurrency}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {app.transactionType}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {app.toCurrency}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {app.amount}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {app.referenceRate}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {app.totalAmount}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {app.estimatedFee}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {app.estimatedAmount}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {app.approver?.name}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {app.approvalComments}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {app.remark}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {app.status}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 truncate">
                      {app.createdAt}
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

export default ApplicationList;
