import type { Account } from '@/types/accounts';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ActionsDropdown from '@/components/custom/dropdown';
import { useDeleteAccount } from '@/hooks/useAccounts';
import { useNavigate } from 'react-router-dom';

const AccountTable = ({ accounts }: { accounts: Account[] }) => {
  const navigate = useNavigate();
  const { mutate: deleteAccount } = useDeleteAccount();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Banking Name</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>IBAN</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Real Balance</TableHead>
            <TableHead>Account Number</TableHead>
            <TableHead>Account Name</TableHead>
            <TableHead>Banking Address</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((acc) => (
            <TableRow key={acc.id}>
              <TableCell>{acc.bankingName}</TableCell>
              <TableCell>{acc.currency}</TableCell>
              <TableCell>{acc.clientName}</TableCell>
              <TableCell>{acc.ibanNumber}</TableCell>
              <TableCell>{acc.balance}</TableCell>
              <TableCell>{acc.realBalance}</TableCell>
              <TableCell>{acc.accountNumber}</TableCell>
              <TableCell>{acc.accountName}</TableCell>
              <TableCell>{acc.bankingAddress}</TableCell>
              <TableCell className="text-right">
                <ActionsDropdown
                  label="Actions"
                  actions={[
                    {
                      label: 'Edit',
                      onClick: () => {
                        navigate(`/admin/accounts/edit/${acc.id}`);
                      },
                    },
                    {
                      label: 'Delete',
                      variant: 'destructive',
                      onClick: () => {
                        deleteAccount(acc.id as number);
                      },
                    },
                  ]}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AccountTable;
