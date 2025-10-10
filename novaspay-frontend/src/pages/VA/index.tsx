import { useEffect, useState } from 'react';
import { useVAs } from '@/hooks/useVa';
import PageFilters from '../../components/custom/pagination';
import type { VA } from '@/types/va';
import { usePagination } from '@/hooks/usePagination';
import { useTranslation } from 'react-i18next';

const VAPage = () => {
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

  const [filters] = useState({
    purpose: '',
    currency: '',
    status: '',
  });

  const { data, isLoading } = useVAs({
    page: currentPage,
    limit: pageSize,
    ...filters,
  });

  const totalApiItems = data?.pagination?.total || 0;

  useEffect(() => {
    setTotalItems(totalApiItems);
  }, [totalApiItems, setTotalItems]);

  const vas: VA[] = data?.data || [];

  return (
    <div className="px-padding mt-2">
      <div className="bg-secondary rounded-md border border-border mt-4 p-4">
        <div className="overflow-x-auto">
          <table className="table-fixed text-sm w-full border-collapse">
            <thead className="text-text-primary bg-background">
              <tr>
                {[
                  t('Purpose'),
                  t('Currency'),
                  t('Payment Method'),
                  t('Headquarters'),
                  t('State/Province'),
                  t('City'),
                  t('Postal Code'),
                  t('Business Category'),
                  t('Operating Country or Region'),
                  t('Expected Funding Source'),
                  t('Store Photos'),
                  t('Decline Reason'),
                  t('Status'),
                  t('Creation Date'),
                  t('Latest Update'),
                ].map((header, i) => (
                  <th key={i} className="w-[80px] min-w-[80px] px-2 py-2">
                    <div>{header}</div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="text-center text-text-primary">
              {isLoading ? (
                <tr>
                  <td colSpan={15} className="py-10">
                    {t('Loading')}...
                  </td>
                </tr>
              ) : vas.length === 0 ? (
                <tr>
                  <td colSpan={15} className="py-10">
                    {t('No VA records found')}
                  </td>
                </tr>
              ) : (
                vas.map((acc, idx) => (
                  <tr
                    key={acc.id || idx}
                    className={
                      idx % 2 === 0
                        ? 'bg-background border-t border-t-border'
                        : 'border-t border-t-border'
                    }
                  >
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.purpose}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.currency}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.paymentMethod}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.headquaters}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.state}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.city}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.postalCode}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.businessCategory}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.region}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.fundingSource}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.storePhotos?.join(', ')}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.declineReason}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.status}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.createdAt}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.updatedAt}
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

export default VAPage;
