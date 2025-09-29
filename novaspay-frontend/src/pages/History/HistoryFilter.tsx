import Button from '../../components/custom/Button';
import Input from '../../components/custom/Input';
import Select from '../../components/custom/Select';

import { Search, RotateCcwIcon, Download } from 'lucide-react';

const HistoryFilter = () => {
  return (
    <div className="bg-secondary flex space-x-8 space-y-4 flex-wrap p-2 rounded-md border border-border">
      <Input label="Order Id" />
      {/* <Input label="Area" /> */}
      <Select label="Area" options={['Europe', 'EUR/USD-W']} />
      <Input label="Receving Name" />
      <Input label="Receving Number" />
      <Select
        label="Order Type"
        options={['PAYMENT', 'TRANSFER', 'EXCHNAGE', 'DEPOSIT', 'FEE']}
      />
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
        <Button
          children={
            <p className="flex items-center gap-1">
              <Download size={16} />
              Download
            </p>
          }
        />
      </div>
    </div>
  );
};

export default HistoryFilter;
