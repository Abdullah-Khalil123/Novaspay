import Button from '../../components/custom/Button';
import Input from '../../components/custom/Input';
import Select from '../../components/custom/SelectG';
import { Search, RotateCcwIcon } from 'lucide-react';

interface AccountsFiltersProps {
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  refetch: () => void;
}

const AccountsFilters = ({
  filters,
  setFilters,
  refetch,
}: AccountsFiltersProps) => {
  return (
    <div className="bg-secondary flex space-x-8 space-y-4 flex-wrap p-2 rounded-md border border-border">
      <Input
        label="Account Number"
        value={filters.accountNumber}
        onChange={(e) =>
          setFilters((prev: any) => ({
            ...prev,
            accountNumber: e.target.value,
          }))
        }
      />
      <Input
        label="Banking Name"
        value={filters.bankingName}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, bankingName: e.target.value }))
        }
      />
      <Input
        label="IBAN Number"
        value={filters.ibanNumber}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, ibanNumber: e.target.value }))
        }
      />
      <Input
        label="Account Name"
        value={filters.accountName}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, accountName: e.target.value }))
        }
      />
      <Input
        label="Currency"
        value={filters.currency}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, currency: e.target.value }))
        }
      />
      <Select
        label="Status"
        options={['Active', 'Inactive', 'Pending']}
        value={filters.status}
        onChange={(e) => setFilters((prev: any) => ({ ...prev, status: e }))}
      />
      <div className="flex space-x-4">
        <Button
          onClick={() => refetch()}
          children={
            <p className="flex items-center gap-1">
              <Search size={16} /> Search
            </p>
          }
        />
        <Button
          onClick={() => {
            setFilters({
              accountNumber: '',
              bankingName: '',
              ibanNumber: '',
              accountName: '',
              currency: '',
              status: '',
            });
            Promise.resolve().then(refetch);
          }}
          children={
            <p className="flex items-center gap-1">
              <RotateCcwIcon size={16} /> Reset
            </p>
          }
        />
      </div>
    </div>
  );
};

export default AccountsFilters;
