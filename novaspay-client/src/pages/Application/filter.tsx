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
        label="Application No"
        value={filters.applicationNo}
        onChange={(e) =>
          setFilters((prev: any) => ({
            ...prev,
            applicationNo: e.target.value,
          }))
        }
      />
      <Select
        label="Status"
        options={[
          'Pending approval',
          'Approved',
          'Transaction successful',
          'Reject',
          'Cancel transaction',
          'Transaction failed',
        ]}
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
