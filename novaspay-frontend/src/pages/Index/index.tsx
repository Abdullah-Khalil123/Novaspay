import { useTransactions } from '@/hooks/useTransaction';
import type { Transaction } from '@/types/transaction';
import { Info } from 'lucide-react';

const IndexPage = () => {
  const { data } = useTransactions({
    page: 1,
    limit: 10,
  });

  const transactions: Transaction[] = data?.data || [];
  return (
    <div className="px-padding pt-2">
      <div>
        <div className="flex justify-end w-full">
          <p className="text-red-400 text-sm underline">Invite to Register</p>
        </div>
        <div className="p-5 mt-4 flex items-center justify-between bg-[#d6d6da] rounded-lg">
          <div className="flex gap-5 text-[#6b6868]">
            <Info />
            <p>To switch wallet accounts, please click the button !</p>
          </div>
          <button className="bg-[#384d0a] px-4 py-2 rounded-md">
            Switch wallet user funtion
          </button>
        </div>

        <div className="bg-white p-6 w-[356px] mt-8 rounded-lg text-[#6B7280]">
          <div className="flex items-center justify-between">
            <div className="bg-[#dbeafd] text-[#2463eb] w-fit p-1 px-2 text-2xl rounded-md">
              $
            </div>
            <p>USD Account</p>
          </div>

          <button className='className="text-center w-full text-red-500'>
            Views
          </button>
        </div>

        <div className="bg-secondary mt-8 p-3.5 rounded-md border-gray-500 border-[1px]">
          <h2 className="text-3xl font-bold mb-4">Recent Transactions</h2>
          <Table data={transactions} />
        </div>
      </div>
    </div>
  );
};

const Table = ({ data }: { data: Transaction[] }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="text-text-primary border-b-[1px] border-border bg-background">
          <th className="py-2">Description</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Fee</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody className="text-center text-text-primary">
        {data.map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-background' : ''}>
            <td className="py-2">{item.orderType}</td>
            <td>{item.updatedAt}</td>
            <td>{item.amount}</td>
            <td>{item.fee}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IndexPage;
