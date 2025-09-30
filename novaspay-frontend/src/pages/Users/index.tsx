import UserFilters from './UserFilter';
import PageFilters from '../Account/pagination';
import Checkbox from '../../components/custom/CheckBox';
import { useClients } from '@/hooks/useClient';
import type { Client } from '@/types/client';
import { useState } from 'react';

const UserPage = () => {
  const [filters, setFilters] = useState({ email: '' });
  const { data, isLoading, refetch } = useClients({
    ...filters,
    page: 1,
    limit: 10,
  });

  const users: Client[] = data?.data || [];
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
                {[
                  'ID',
                  'Client Name',
                  'Country',
                  'Email',
                  'Login Time',
                  'Register Time',
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
                  <td colSpan={6} className="py-10">
                    Loading...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10">
                    No users found.
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
      </div>
      <PageFilters />
    </div>
  );
};

export default UserPage;
