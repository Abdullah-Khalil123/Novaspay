import { useAccounts } from '@/hooks/useAccounts';
import AccountTable from './AccountTable';
import type { Account } from '@/types/accounts';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Accounts = () => {
  const navigate = useNavigate();

  const { data } = useAccounts();
  const accounts: Account[] = data?.data || [];

  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
        <Button
          onClick={() => {
            navigate('/admin/accounts/create');
          }}
        >
          Create New
        </Button>
      </div>
      <AccountTable accounts={accounts} />
    </div>
  );
};

export default Accounts;
