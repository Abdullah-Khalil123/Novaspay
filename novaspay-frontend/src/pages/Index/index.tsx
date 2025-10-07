import { useTransactions } from '@/hooks/useTransaction';
import type { Transaction } from '@/types/transaction';
import { Info, ArrowDown, ArrowRight } from 'lucide-react';
import Draggable from '@/components/custom/dragable';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { createInviteLink } from '@/actions/client';
import { toast } from 'sonner';

const IndexPage = () => {
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [show, setShow] = useState<boolean | null>(null);

  const { data } = useTransactions({
    page: 1,
    limit: 10,
  });

  const transactions: Transaction[] = data?.data || [];

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode || '');
    toast.success('Invitation code copied to clipboard!');
  };

  const handleCreateInvite = async () => {
    try {
      const data = await createInviteLink();
      const code = data.data.code;
      setInviteCode(code);
      setShow(true);
    } catch (err) {
      alert('Failed to generate invite.');
    }
  };
  const inviteLink = `${
    import.meta.env.VITE_CLIENT_URL
  }/company/create-account-login?invitationCode=${inviteCode}`;

  return (
    <div className="px-padding pt-2">
      <div>
        <div className="flex justify-end w-full">
          <p
            onClick={handleCreateInvite}
            className="text-red-400 text-sm underline cursor-pointer"
          >
            Invite to Register
          </p>
        </div>

        <div className="p-5 mt-4 flex items-center justify-between bg-[#d6d6da] rounded-lg">
          <div className="flex gap-5 text-[#6b6868]">
            <Info />
            <p>To switch wallet accounts, please click the button !</p>
          </div>
          <a
            href={import.meta.env.VITE_CLIENT_URL + '/user/login'}
            className="bg-sidebar-bg cursor-pointer text-button-text px-4 py-2 rounded-md"
          >
            Switch wallet user function
          </a>
        </div>

        {/* <div className="bg-white p-6 w-[356px] mt-8 rounded-lg text-[#6B7280]">
          <div className="flex items-center justify-between">
            <div className="bg-[#dbeafd] text-[#2463eb] w-fit p-1 px-2 text-2xl rounded-md">
              $
            </div>
            <p>USD Account</p>
          </div>

          <button className="text-center w-full text-red-500">Views</button>
        </div> */}

        <div className="bg-secondary mt-8 p-3.5 rounded-md border-gray-500 border-[1px]">
          <h2 className="text-3xl font-bold mb-4">Recent Transactions</h2>
          <Table data={transactions} />
        </div>
      </div>

      {show && (
        <Draggable
          className="bg-background px-4"
          title="Invite User to Register"
          Open={setShow}
          children={
            <div className="p-6 rounded-xl shadow-lg flex flex-col items-center gap-4 w-[280px] text-center">
              {/* QR Code */}
              <QRCodeSVG value={inviteLink} size={230} />

              {/* Code (optional) */}
              <code className="bg-[#f3f4f6] p-2 rounded-md w-full break-all">
                <p className="text-black text-sm break-all">{inviteCode}</p>
              </code>

              <div className="flex gap-2 items-center">
                <button
                  onClick={handleCopy}
                  className="bg-sidebar-bg cursor-pointer px-4 text-nowrap py-2 rounded-sm"
                >
                  Copy Code
                </button>
                <a
                  href={inviteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nowrap bg-sidebar-child px-4 py-2 rounded-sm"
                >
                  Go to Page
                </a>
              </div>
            </div>
          }
        />
      )}
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
            <td className="h-10">
              {item.orderType == 'DEPOSIT' ? (
                <ArrowRight className="inline mr-1" color="blue" />
              ) : (
                <ArrowDown className="inline mr-1" color="green" />
              )}{' '}
              {item.orderType}
            </td>
            <td>{item.updatedAt}</td>
            <td>{item.amount}</td>
            <td>{item.fee}</td>
            <td>
              <div className="text-sm flex justify-center">
                <p
                  className={`w-fit px-2 rounded-sm ${
                    item.status === 'SUCCESS'
                      ? 'bg-[#69c242] '
                      : item.status === 'PENDING'
                      ? 'bg-yellow-700 '
                      : item.status === 'FAILED'
                      ? 'bg-red-700 '
                      : ''
                  }`}
                >
                  {item.status}
                </p>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IndexPage;
