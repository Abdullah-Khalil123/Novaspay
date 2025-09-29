import { useTransactions } from '@/hooks/useTransaction';
import TransactionTable from './TransactionTable';
import type { Transaction } from '@/types/transaction';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Transactions = () => {
  const navigate = useNavigate();

  const { data } = useTransactions();
  const transactions: Transaction[] = data?.data || [];
  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
        <Button
          onClick={() => {
            navigate('/admin/transactions/create');
          }}
        >
          Create New
        </Button>
      </div>
      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default Transactions;
