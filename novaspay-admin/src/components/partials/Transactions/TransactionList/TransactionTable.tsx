import type { Transaction } from '@/types/transaction';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ActionsDropdown from '@/components/custom/dropdown';
import { useDeleteTransaction } from '@/hooks/useTransaction';
import { useNavigate } from 'react-router-dom';

const TransactionTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const navigate = useNavigate();
  const { mutate: deleteTransaction } = useDeleteTransaction();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Account Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Receiver</TableHead>
            <TableHead>Payment Account</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{tx.accountName}</TableCell>
              <TableCell>{tx.amount}</TableCell>
              <TableCell>{tx.fee}</TableCell>
              <TableCell>{tx.status}</TableCell>
              <TableCell>{tx.orderId || '-'}</TableCell>
              <TableCell>
                {tx.receiverName
                  ? `${tx.receiverName} (${tx.receiverNumber})`
                  : '-'}
              </TableCell>
              <TableCell>{tx.paymentAccount}</TableCell>
              <TableCell>
                {new Date(tx.createdAt as string).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <ActionsDropdown
                  label="Actions"
                  actions={[
                    {
                      label: 'Edit',
                      onClick: () => {
                        navigate(`/admin/transactions/edit/${tx.id}`);
                      },
                    },
                    {
                      label: 'Delete',
                      variant: 'destructive',
                      onClick: () => {
                        deleteTransaction(tx.id as number);
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

export default TransactionTable;
