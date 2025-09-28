import AccountsFilters from '../Account/filter';
import PageFilters from '../Account/pagination';

const UserPage = () => {
  return (
    <div className="px-padding mt-2">
      <AccountsFilters />
      UserPage
      <PageFilters />
    </div>
  );
};

export default UserPage;
