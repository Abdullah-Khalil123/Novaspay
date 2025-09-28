import Button from '../../components/custom/Button';
import Input from '../../components/custom/Input';
import Select from '../../components/custom/Select';

import { Search, RotateCcwIcon } from 'lucide-react';

const AccountsFilters = () => {
  return (
    <div className="bg-secondary flex space-x-8 space-y-4 flex-wrap p-2 rounded-md border border-border">
      <Input label="Account Number" />
      <Input label="Banking Name" />
      <Input label="IBAN Name" />
      <Input label="Account Name" />
      <Input label="Currency" />
      <Select label="Status" options={['Active', 'Inactive', 'Pending']} />
      <div className="flex space-x-4">
        <Button
          children={
            <p className="flex items-center gap-1">
              <Search size={16} />
              Search
            </p>
          }
        />
        <Button
          children={
            <p className="flex items-center gap-1">
              <RotateCcwIcon size={16} />
              Reset
            </p>
          }
        />
      </div>
    </div>
  );
};

export default AccountsFilters;
