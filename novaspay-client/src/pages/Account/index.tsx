import { useEffect, useState } from 'react';
import { useAccounts } from '@/hooks/useAccounts';
import AccountsFilters from './filter';
import PageFilters from '../../components/custom/pagination';
import type { Account } from '@/types/accounts';
import { usePagination } from '@/hooks/usePagination';
import Draggable from '@/components/custom/dragable';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ReceiveAccount = () => {
  const { t } = useTranslation();
  const router = useNavigate();
  const [showDetails, setShowDetails] = useState<Account | null>();

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
    accountNumber: '',
    bankingName: '',
    ibanNumber: '',
    accountName: '',
    currency: '',
    status: '',
  });

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

      <div className="bg-secondary border mt-4 border-border-color p-2">
        <div className="overflow-x-auto">
          <table className="table-fixed text-sm w-full border-collapse">
            <thead className="text-text-primary bg-background">
              <tr>
                {[
                  t('Banking Name'),
                  t('Currency'),
                  t('Client Name'),
                  t('IBAN Number'),
                  t('Balance'),
                  t('Account Number'),
                  t('Account Name'),
                  t('Banking Address'),
                  t('Creation Date'),
                  t('Latest Update'),
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
                    {t('Loading...')}
                  </td>
                </tr>
              ) : accounts.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-4">
                    {t('No accounts found.')}
                  </td>
                </tr>
              ) : (
                accounts.map((acc, idx) => (
                  <tr
                    key={acc.id || idx}
                    className={
                      idx % 2 === 0
                        ? 'bg-background border-t border-t-border-color'
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
                    <td
                      onClick={() => setShowDetails(acc)}
                      className="w-[60px] sticky right-0 bg-background text-center"
                    >
                      <p className="text-[#354a0c] hover:text-[#60831a] cursor-pointer">
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
            className="px-8 min-w-[700px] text-sm space-y-3 py-6 bg-background shadow-lg rounded-md"
            title={t('Account Details')}
            Open={setShowDetails}
          >
            <p>
              {t('Account Balance')}:{' '}
              <span className="font-bold">{showDetails.balance}</span>
            </p>
            <button
              onClick={() => {
                router('/banking/history/history?accountId=' + showDetails.id);
              }}
              className="
                px-4 py-1 bg-sidebar-child/90 text-white rounded-sm hover:bg-sidebar-child/85 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sidebar-bg focus:ring-offset-2
              "
            >
              {t('History')}
            </button>
            <p>
              {t('Bank Name')}:{' '}
              <span className="font-bold">{showDetails.bankingName}</span>
            </p>
            <p>
              {t('Banking Address')}:{' '}
              <span className="font-bold">{showDetails.bankingAddress}</span>
            </p>
            <p>
              {t('Beneficiary Name')}:{' '}
              <span className="font-bold">{showDetails.accountName}</span>
            </p>
            <p>
              {t('IBAN Number')}:{' '}
              <span className="font-bold">{showDetails.ibanNumber}</span>
            </p>
            <p>
              {t('Account Number')}:{' '}
              <span className="font-bold">{showDetails.accountNumber}</span>
            </p>
            <p>
              {t('Currency')}:{' '}
              <span className="font-bold">{showDetails.currency}</span>
            </p>

            <div>
              <button
                className="flex items-center gap-2 border border-border rounded-sm px-2 py-1 mx-auto hover:bg-sidebar-child/10 cursor-pointer"
                onClick={() => {
                  const formattedDetails = `
${t('Account Balance')}: ${showDetails.balance || ''}
${t('Bank Name')}: ${showDetails.bankingName || ''}
${t('Banking Address')}: ${showDetails.bankingAddress || ''}
${t('Beneficiary Name')}: ${showDetails.accountName || ''}
${t('IBAN Number')}: ${showDetails.ibanNumber || ''}
${t('Account Number')}: ${showDetails.accountNumber || ''}
${t('Currency')}: ${showDetails.currency || ''}
                  `.trim();

                  navigator.clipboard.writeText(formattedDetails);
                  toast.success(t('Account details copied to clipboard!'), {
                    position: 'top-center',
                  });
                }}
              >
                <Copy size={16} />
                {t('Copy')}
              </button>
            </div>
          </Draggable>
        )}
      </div>
    </div>
  );
};

export default ReceiveAccount;
