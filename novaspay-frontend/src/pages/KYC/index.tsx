import KYCFilter from './KYCFilter';
import PageFilters from '../Account/pagination';

const mockData = [
  {
    email: 'john.doe@example.com',
    type: 'Individual',
    name: 'John Doe',
    phone: '+1 202-555-0147',
    adentId: 'AD123456',
    status: 'Approved',
    creationDate: '2025-08-01',
    reason: 'Identity Verified',
    latestUpdate: '2025-09-20',
  },
  {
    email: 'ali.khan@example.com',
    type: 'Business',
    name: 'Ali Khan Enterprises',
    phone: '+92 300 1234567',
    adentId: 'AD987654',
    status: 'Pending',
    creationDate: '2025-09-05',
    reason: 'Awaiting Documents',
    latestUpdate: '2025-09-25',
  },
  {
    email: 'emma.watson@example.com',
    type: 'Individual',
    name: 'Emma Watson',
    phone: '+44 7700 900123',
    adentId: 'AD567890',
    status: 'Rejected',
    creationDate: '2025-07-18',
    reason: 'Invalid ID Proof',
    latestUpdate: '2025-09-15',
  },
  {
    email: 'sophia.williams@example.com',
    type: 'Business',
    name: 'Sophia Williams Ltd',
    phone: '+1 303-555-0129',
    adentId: 'AD223344',
    status: 'In Review',
    creationDate: '2025-09-10',
    reason: 'Manual Check Required',
    latestUpdate: '2025-09-28',
  },
  {
    email: 'noah.khan@example.com',
    type: 'Individual',
    name: 'Noah Khan',
    phone: '+92 333 9876543',
    adentId: 'AD445566',
    status: 'Approved',
    creationDate: '2025-08-25',
    reason: 'Identity Verified',
    latestUpdate: '2025-09-22',
  },
];

const KYCPage = () => {
  return (
    <div className="px-padding mt-2">
      <KYCFilter />
      <div className="bg-secondary rounded-md border border-border mt-4 p-4">
        <div className="overflow-x-auto">
          <table className="table-fixed text-sm w-full border-collapse">
            <thead className="text-text-primary bg-background">
              <tr>
                {[
                  'Email',
                  'Type',
                  'Name',
                  'Phone',
                  'AdentId',
                  'Status',
                  'Creation Date',
                  'Reason',
                  'Latest Update',
                ].map((header, i) => (
                  <th key={i} className="w-[80px] min-w-[80px] px-2 py-2">
                    <div>{header}</div>
                  </th>
                ))}
                <th className="w-[60px] sticky right-0 bg-background z-10"></th>
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
                  {Object.values(acc).map((val, i) => (
                    <td key={i} className="w-[80px] min-w-[80px] px-2 py-10">
                      <div className="truncate overflow-hidden whitespace-nowrap">
                        {val}
                      </div>
                    </td>
                  ))}
                  <td
                    className={
                      `w-[40px] sticky right-0 font-sans text-end space-y-4 text-[#c2cb3d]` +
                      (idx % 2 === 0 ? ' bg-background' : ' bg-secondary')
                    }
                  >
                    <p className="hover:text-[#60831a] cursor-pointer">
                      Update
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PageFilters />
      </div>
    </div>
  );
};

export default KYCPage;
