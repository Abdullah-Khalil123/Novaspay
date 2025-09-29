import Button from '../../components/custom/Button';
import Input from '../../components/custom/Input';

import { Search, RotateCcwIcon } from 'lucide-react';

const ClientFilter = () => {
  return (
    <div className="bg-secondary flex space-x-8 space-y-4 flex-wrap p-3 rounded-md border border-border">
      <Input label="Client Name" />
      <Input label="Country" />

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

export default ClientFilter;
