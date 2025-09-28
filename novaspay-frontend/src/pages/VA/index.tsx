import AccountsFilters from '../Account/filter';
import PageFilters from '../Account/pagination';

const VAPage = () => {
  return (
    <div className="px-padding mt-2">
      <AccountsFilters />
      VAPage
      <PageFilters />
    </div>
  );
};

export default VAPage;
