import HistoryFilter from './HistoryFilter';
import PageFilters from '../Account/pagination';

const mockData = [
  {
    orderId: 'ORD-1001',
    accountName: 'John D. Savings',
    paymentAccount: 'Standard Chartered - 123456789',
    receivingName: 'Alice Johnson',
    amount: '$1,200.00',
    fee: '$12.00',
    status: 'Completed',
    orderType: 'Transfer',
    reason: 'Personal Payment',
    creationDate: '2025-08-10',
    latestUpdate: '2025-09-20',
  },
  {
    orderId: 'ORD-1002',
    accountName: 'Ali K. Current',
    paymentAccount: 'Habib Bank - 876543210',
    receivingName: 'Muhammad Ahmed',
    amount: '₨85,000',
    fee: '₨500',
    status: 'Pending',
    orderType: 'Deposit',
    reason: 'Business Payment',
    creationDate: '2025-09-01',
    latestUpdate: '2025-09-25',
  },
  {
    orderId: 'ORD-1003',
    accountName: 'Emma W. Business',
    paymentAccount: 'Barclays - 345678901',
    receivingName: 'Olivia Smith',
    amount: '€2,450',
    fee: '€15',
    status: 'Failed',
    orderType: 'Withdrawal',
    reason: 'Insufficient Funds',
    creationDate: '2025-07-22',
    latestUpdate: '2025-09-18',
  },
  {
    orderId: 'ORD-1004',
    accountName: 'John D. Savings',
    paymentAccount: 'Standard Chartered - 123456789',
    receivingName: 'Sophia Williams',
    amount: '$560.00',
    fee: '$5.00',
    status: 'Completed',
    orderType: 'Transfer',
    reason: 'Gift',
    creationDate: '2025-08-15',
    latestUpdate: '2025-09-10',
  },
  {
    orderId: 'ORD-1005',
    accountName: 'Ali K. Current',
    paymentAccount: 'Habib Bank - 876543210',
    receivingName: 'Noah Khan',
    amount: '₨120,000',
    fee: '₨700',
    status: 'In Review',
    orderType: 'Deposit',
    reason: 'Salary Payment',
    creationDate: '2025-09-05',
    latestUpdate: '2025-09-27',
  },
];

const HistoryPage = () => {
  return (
    <div className="px-padding mt-2">
      <HistoryFilter />
      <div className="bg-secondary rounded-md border border-border mt-4 p-4">
        <div className="overflow-x-auto">
          <table className="table-fixed text-sm w-full border-collapse">
            <thead className="text-text-primary bg-background">
              <tr>
                {[
                  'Order Id',
                  'Account Name',
                  'Payment Account',
                  'Receiving Name',
                  'Amount',
                  'Fee',
                  'Status',
                  'Order Type',
                  'Reason',
                  'Creation Data',
                  'Latest Update',
                ].map((header, i) => (
                  <th key={i} className="w-[80px] min-w-[80px] px-2 py-2">
                    <div>{header}</div>
                  </th>
                ))}
                <th className="w-[100px] sticky right-0 bg-background z-10"></th>
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
                  <td className="w-[40px] sticky right-0 bg-background text-sidebar-bg text-center space-y-4">
                    <p className="hover:text-[#60831a] cursor-pointer">
                      Credential
                    </p>
                    <p className="hover:text-[#60831a] cursor-pointer">
                      Details
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

export default HistoryPage;
