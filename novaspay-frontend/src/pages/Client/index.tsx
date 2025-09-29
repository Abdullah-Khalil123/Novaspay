import ClientFilter from './clientFilter';
import PageFilters from '../Account/pagination';
import Checkbox from '../../components/custom/CheckBox';

const mockAccounts = [
  {
    clientName: 'John Doe',
    type: 'Individual',
    country: 'United States',
    email: 'john.doe@example.com',
    agentName: 'Michael Scott',
    bankAccountNumber: 'US12 3456 7890 1234 5678',
    invitationCode: 'INV-12345',
    accountInfo: 'Verified, Active',
    creationDate: '2025-06-12 04:30 PM',
    description: 'High-value client, prefers USD transactions',
  },
  {
    clientName: 'Alice Smith',
    type: 'Corporate',
    country: 'United Kingdom',
    email: 'alice.smith@company.co.uk',
    agentName: 'Sarah Connor',
    bankAccountNumber: 'UK98 7654 3210 9876 5432',
    invitationCode: 'INV-56789',
    accountInfo: 'Pending Verification',
    creationDate: '2025-07-20 11:00 AM',
    description: 'Company account for international trade',
  },
  {
    clientName: 'Ahmed Khan',
    type: 'Individual',
    country: 'Pakistan',
    email: 'ahmed.khan@example.pk',
    agentName: 'Ayesha Malik',
    bankAccountNumber: 'PK44 1234 5678 9123 4567',
    invitationCode: 'INV-90123',
    accountInfo: 'Verified, Inactive',
    creationDate: '2025-05-10 02:45 PM',
    description: 'Dormant client, reactivation possible',
  },
  {
    clientName: 'Maria Garcia',
    type: 'Corporate',
    country: 'Spain',
    email: 'maria.garcia@empresa.es',
    agentName: 'Carlos Ruiz',
    bankAccountNumber: 'ES55 1111 2222 3333 4444',
    invitationCode: 'INV-34567',
    accountInfo: 'Verified, Active',
    creationDate: '2025-08-01 09:30 AM',
    description: 'Corporate account handling EU imports',
  },
  {
    clientName: 'Hiroshi Tanaka',
    type: 'Individual',
    country: 'Japan',
    email: 'hiroshi.tanaka@example.jp',
    agentName: 'Keiko Sato',
    bankAccountNumber: 'JP77 8888 9999 0000 1111',
    invitationCode: 'INV-78901',
    accountInfo: 'Verified, Active',
    creationDate: '2025-09-05 07:15 PM',
    description: 'Prefers JPY settlements',
  },
];

const ClientPage = () => {
  return (
    <div className="px-padding mt-2">
      <ClientFilter />
      <div className="bg-secondary border mt-4 border-border rounded-sm p-2">
        <div className="overflow-x-auto">
          <table className="table-fixed text-sm w-full border-collapse">
            <thead className="text-text-primary bg-background">
              <tr>
                <th className="w-[40px] border border-border min-w-[40px] sticky left-0 bg-background px-2 py-2 text-center">
                  <Checkbox size={15} />
                </th>
                {[
                  'Client Name',
                  'Type',
                  'Country',
                  'Email',
                  'Agent Name',
                  'Bank Account Number',
                  'Invitation Code',
                  'Account Info',
                  'Creation Date',
                  'Description',
                ].map((header, i) => (
                  <th
                    key={i}
                    className="w-[80px] min-w-[80px] px-2 py-2 border border-border"
                  >
                    <div>{header}</div>
                  </th>
                ))}
                <th className="w-[230px] sticky right-0 bg-background z-10 border border-border">
                  Operate
                </th>
              </tr>
            </thead>
            <tbody className="text-center text-text-primary">
              {mockAccounts.map((acc, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? 'bg-background' : 'bg-secondary'}
                >
                  <td
                    className={
                      `w-[40px] sticky left-0 border border-border min-w-[40px] px-2 py-2 text-center` +
                      (idx % 2 === 0 ? ' bg-background' : ' bg-secondary')
                    }
                  >
                    <Checkbox size={15} />
                  </td>

                  {Object.values(acc).map((val, i) => (
                    <td
                      key={i}
                      className="w-[80px] min-w-[80px] px-2 py-4 border border-border"
                    >
                      <div className="truncate overflow-hidden whitespace-nowrap">
                        {val}
                      </div>
                    </td>
                  ))}
                  <td className="sticky right-0 bg-background text-sidebar-bg flex gap-2 flex-wrap justify-center py-4 font-sans border border-border">
                    <p>KYB Record</p>
                    <p>Users</p>
                    <p>Details</p>
                    <p>See account</p>
                    <p className="hover:text-[#60831a] cursor-pointer">
                      Details
                    </p>
                  </td>
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

export default ClientPage;
