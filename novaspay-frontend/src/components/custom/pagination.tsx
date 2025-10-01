import Pagination from '../../components/custom/Accordion';
import Input from '../../components/custom/Input';
import Select from '../../components/custom/Select';

const PageFilters = ({
  currentPage = 1,
  totalPages,
  pageSize,
  onPageChange,
  setPageSize,
}: {
  currentPage: number;
  totalPages?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  setPageSize?: (size: number) => void;
}) => {
  return (
    <div className="flex justify-end mt-4 space-x-4">
      <Select
        label="Total 5"
        options={[10, 20, 30, 40, 50]}
        value={pageSize}
        onChange={setPageSize}
      />
      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages || 1}
      />
      <Input
        label="Go to"
        type="number"
        className="w-12 text-center"
        defaultValue="1"
      />
    </div>
  );
};

export default PageFilters;
