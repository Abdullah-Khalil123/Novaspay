import AccountsFilters from '../Account/filter';
import PageFilters from '../Account/pagination';

const ClientPage = () => {
  return (
    <div className="px-padding mt-2">
      <AccountsFilters />
      ClientPage
      <PageFilters />
    </div>
  );
};

export default ClientPage;
