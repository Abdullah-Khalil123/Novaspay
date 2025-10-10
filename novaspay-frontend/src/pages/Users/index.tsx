import { useTranslation } from 'react-i18next';
import UserFilters from './UserFilter';
import PageFilters from '../../components/custom/pagination';
import Checkbox from '../../components/custom/CheckBox';
import { useClients } from '@/hooks/useClient';
import type { Client } from '@/types/client';
import { useState, useEffect } from 'react';
import { usePagination } from '@/hooks/usePagination';

const UserPage = () => {
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

  const [filters, setFilters] = useState({ email: '' });

  const { data, isLoading, refetch } = useClients({
    ...filters,
    page: currentPage,
    limit: pageSize,
  });

  const totalApiItems = data?.pagination?.total || 0;

  useEffect(() => {
    setTotalItems(totalApiItems);
  }, [totalApiItems, setTotalItems]);

  const users: Client[] = data?.data || [];

  const headers = [
    'ID',
    'Client Name',
    'Country',
    'Email',
    'Login Time',
    'Register Time',
  ];

  return (
    <div className="px-padding mt-2">
      <UserFilters
        filters={filters}
        setFilters={setFilters}
        refetch={refetch}
      />
      <div className="bg-secondary rounded-md border border-border mt-4 p-4">
        <div className="overflow-x-auto">
          <table className="table-fixed text-sm w-full border-collapse">
            <thead className="text-text-primary bg-background">
              <tr>
                <th className="w-[40px] min-w-[40px] px-2 py-2 text-center">
                  <Checkbox size={15} />
                </th>
                {headers.map((header, i) => (
                  <th key={i} className="w-[80px] min-w-[80px] px-2 py-2">
                    <div>{t(header)}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-center text-text-primary">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-10">
                    {t('Loading...')}
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10">
                    {t('No users found.')}
                  </td>
                </tr>
              ) : (
                users.map((user, idx) => (
                  <tr
                    key={user.id || idx}
                    className={
                      idx % 2 === 0
                        ? 'bg-background border-t border-t-border'
                        : 'border-t border-t-border'
                    }
                  >
                    <td className="w-[40px] min-w-[40px] px-2 py-2 text-center">
                      <Checkbox size={15} />
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-3 truncate">
                      {user.id}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-3 truncate">
                      {user.name}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-3 truncate">
                      {user.country}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-3 truncate">
                      {user.email}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-3 truncate">
                      {user.loginTime}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-3 truncate">
                      {user.createdAt}
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

export default UserPage;
