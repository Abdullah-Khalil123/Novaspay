import UserFilters from './UserFilter';
import PageFilters from '../Account/pagination';
import Checkbox from '../../components/custom/CheckBox';

const mockData = [
  {
    id: 'U-001',
    clientName: 'John Doe',
    country: 'United States',
    email: 'johndoe@example.com',
    loginTime: '2025-09-28 10:15 AM',
    registerTime: '2025-06-12 04:30 PM',
  },
  {
    id: 'U-002',
    clientName: 'Alice Smith',
    country: 'United Kingdom',
    email: 'alice.smith@example.co.uk',
    loginTime: '2025-09-27 08:45 PM',
    registerTime: '2025-07-01 09:10 AM',
  },
  {
    id: 'U-003',
    clientName: 'Ahmed Khan',
    country: 'Pakistan',
    email: 'ahmed.khan@example.pk',
    loginTime: '2025-09-26 02:30 PM',
    registerTime: '2025-05-20 11:45 AM',
  },
  {
    id: 'U-004',
    clientName: 'Maria Garcia',
    country: 'Spain',
    email: 'maria.garcia@example.es',
    loginTime: '2025-09-28 07:55 AM',
    registerTime: '2025-08-05 03:20 PM',
  },
  {
    id: 'U-005',
    clientName: 'Hiroshi Tanaka',
    country: 'Japan',
    email: 'hiroshi.tanaka@example.jp',
    loginTime: '2025-09-29 12:10 AM',
    registerTime: '2025-04-18 08:00 AM',
  },
];

const UserPage = () => {
  return (
    <div className="px-padding mt-2">
      <UserFilters />
      <div className="bg-secondary rounded-md border border-border mt-4 p-4">
        <div className="overflow-x-auto">
          <table className="table-fixed text-sm w-full border-collapse">
            <thead className="text-text-primary bg-background">
              <tr>
                {/* Checkbox header */}
                <th className="w-[40px] min-w-[40px] px-2 py-2 text-center">
                  <Checkbox size={15} />
                </th>

                {[
                  'ID',
                  'Client Name',
                  'Country',
                  'Email',
                  'Login Time',
                  'Register Time',
                ].map((header, i) => (
                  <th key={i} className="w-[80px] min-w-[80px] px-2 py-2">
                    <div>{header}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-center text-text-primary">
              {mockData.map((acc, idx) => (
                <tr
                  key={idx}
                  className={
                    idx % 2 === 0
                      ? 'bg-background border-t border-t-border'
                      : 'border-t border-t-border'
                  }
                >
                  {/* Row checkbox */}
                  <td className="w-[40px] min-w-[40px] px-2 py-2 text-center">
                    <Checkbox size={15} />
                  </td>

                  {Object.values(acc).map((val, i) => (
                    <td key={i} className="w-[80px] min-w-[80px] px-2 py-3">
                      <div className="truncate overflow-hidden whitespace-nowrap">
                        {val}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <PageFilters />
    </div>
  );
};

export default UserPage;
