import ClientFilter from './clientFilter';
import PageFilters from '../../components/custom/pagination';
import Checkbox from '../../components/custom/CheckBox';
import { useClients } from '@/hooks/useClient';
import type { Client } from '@/types/client';
import { useState, useEffect } from 'react';
import { usePagination } from '@/hooks/usePagination';
import { useNavigate } from 'react-router-dom';
import Draggable from '@/components/custom/dragable';

const ClientPage = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState<Client>();

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

  const [filters, setFilters] = useState({ clientName: '', country: '' });

  const { data, isLoading, refetch } = useClients({
    page: currentPage,
    limit: pageSize,
    ...filters,
  });

  const totalApiItems = data?.pagination?.total || 0;

  useEffect(() => {
    setTotalItems(totalApiItems);
  }, [totalApiItems, setTotalItems]);

  const clients: Client[] = data?.data || [];

  return (
    <div className="px-padding mt-2">
      <ClientFilter
        filters={filters}
        setFilters={setFilters}
        refetch={refetch}
      />

      <div className="bg-secondary border mt-4 border-border rounded-sm p-2">
        <div className="overflow-x-auto">
          <table className="table-fixed text-sm w-full border-collapse">
            <thead className="text-text-primary bg-background">
              <tr>
                <th className="w-[40px] border border-border min-w-[40px] sticky left-0 bg-background px-2 py-2 text-center">
                  <Checkbox size={15} />
                </th>
                {[
                  'Client Name',
                  'Type',
                  'Country',
                  'Email',
                  'Agent Name',
                  'Bank Account Number',
                  'Invitation Code',
                  'Account Info',
                  'Creation Date',
                  'Description',
                ].map((header, i) => (
                  <th
                    key={i}
                    className="w-[80px] min-w-[80px] px-2 py-2 border border-border"
                  >
                    <div>{header}</div>
                  </th>
                ))}
                <th className="w-[230px] sticky right-0 bg-background z-10 border border-border">
                  Operate
                </th>
              </tr>
            </thead>

            <tbody className="text-center text-text-primary">
              {isLoading ? (
                <tr>
                  <td colSpan={12} className="py-10">
                    Loading...
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-10">
                    No client records found.
                  </td>
                </tr>
              ) : (
                clients.map((acc, idx) => (
                  <tr
                    key={acc.id || idx}
                    className={idx % 2 === 0 ? 'bg-background' : 'bg-secondary'}
                  >
                    <td
                      className={
                        `w-[40px] sticky left-0 border border-border min-w-[40px] px-2 py-2 text-center` +
                        (idx % 2 === 0 ? ' bg-background' : ' bg-secondary')
                      }
                    >
                      <Checkbox size={15} />
                    </td>

                    <td className="w-[80px] min-w-[80px] px-2 py-4 border border-border truncate">
                      {acc.name}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 border border-border truncate">
                      {acc.type}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 border border-border truncate">
                      {acc.country}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 border border-border truncate">
                      {acc.email}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 border border-border truncate">
                      {acc.agentName}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 border border-border truncate">
                      {acc.bankAccountNumber}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 border border-border truncate">
                      {acc.invitationCode}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 border border-border truncate">
                      {acc.accountInfo}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 border border-border truncate">
                      {acc.createdAt}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-4 border border-border truncate">
                      {acc.description}
                    </td>

                    <td className="sticky right-0 bg-background text-sidebar-bg flex gap-2 flex-wrap justify-center py-4 font-sans border border-border">
                      <p
                        onClick={() => {
                          navigate(
                            '/banking/others/profiles/index?userId=' + acc.id
                          );
                        }}
                        className="hover:text-[#60831a] cursor-pointer"
                      >
                        KYB Record
                      </p>
                      <p className="hover:text-[#60831a] cursor-pointer">
                        Users
                      </p>
                      <p
                        onClick={() => {
                          setShowDialog(acc);
                        }}
                        className="hover:text-[#60831a] cursor-pointer"
                      >
                        Details
                      </p>
                      <p
                        onClick={() => {
                          navigate(
                            '/banking/receive/bankAccount?userId=' + acc.id
                          );
                        }}
                        className="hover:text-[#60831a] cursor-pointer"
                      >
                        See account
                      </p>
                      <p
                        onClick={() => {
                          setShowDialog(acc);
                        }}
                        className="hover:text-[#60831a] cursor-pointer"
                      >
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
      {showDialog && (
        <Draggable
          title="Client Details"
          className="px-8 min-w-[500px] space-y-1 py-6 bg-background shadow-lg rounded-md"
          Open={setShowDialog}
        >
          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="font-bold">Client Name:</span>
              <span className="text-gray-500">{showDialog.name}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold">Type:</span>
              <span className="text-gray-500">{showDialog.type}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold">Country:</span>
              <span className="text-gray-500">{showDialog.country}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold">Email:</span>
              <span className="text-gray-500">{showDialog.email}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold">Agent Name:</span>
              <span className="text-gray-500">{showDialog.agentName}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold">Bank Account Number:</span>
              <span className="text-gray-500">
                {showDialog.bankAccountNumber}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold">Invitation Code:</span>
              <span className="text-gray-500">{showDialog.invitationCode}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold">Account Info:</span>
              <span className="text-gray-500">{showDialog.accountInfo}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold">Creation Date:</span>
              <span className="text-gray-500">{showDialog.createdAt}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold">Description:</span>
              <span className="text-gray-500">{showDialog.description}</span>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default ClientPage;
