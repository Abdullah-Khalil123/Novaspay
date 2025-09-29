import Button from '../../components/custom/Button';
import Input from '../../components/custom/Input';
import { Search, RotateCcwIcon, Upload } from 'lucide-react';

const KYCFilter = () => {
  return (
    <div className="bg-secondary flex space-x-8 space-y-4 flex-wrap p-2 rounded-md border border-border">
      <Input label="Email" />
      <Input label="Name" />
      <Input label="Status" />
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
        <button className="flex gap-2 bg-sidebar-bg h-8 px-4 items-center text-sm rounded-sm text-white hover:bg-[#60831a] transition">
          <Upload size={16} />
          KYC 批量导入
        </button>
      </div>
    </div>
  );
};

export default KYCFilter;
