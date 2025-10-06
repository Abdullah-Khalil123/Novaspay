type DepositConfirmationProps = {
  depositCreated: string;
  paidOut: string;
  status: string;
  orderId: string;
  fromAccountId: string;
  customerName: string;
  customerAddress: string;
  amountSent: number;
  currency: string;
  network: string;
  counterpartyName: string;
  iban: string;
  bankName: string;
  bankCurrency: string;
  city: string;
  street: string;
  postalCode: string;
  orderingCustomer: string;
};

export default function DepositConfirmationHTML({
  depositCreated,
  paidOut,
  status,
  orderId,
  fromAccountId,
  customerName,
  customerAddress,
  amountSent,
  currency,
  network,
  counterpartyName,
  iban,
  bankName,
  bankCurrency,
  city,
  street,
  postalCode,
  orderingCustomer,
}: DepositConfirmationProps) {
  return (
    <div className="font-[Times_New_Roman] text-[13px] text-black leading-relaxed bg-white p-10 max-w-3xl mx-auto">
      {/* Header Logo */}
      <div className="mb-5">
        <img src="/logo-big.png" alt="" />
      </div>

      {/* Title */}
      <h3 className="font-bold mb-4 text-[24px]">Deposit Confirmation</h3>

      {/* Deposit Info */}
      <div className="flex justify-between mb-5 text-base">
        <div className="flex-1">
          <p>
            Deposit Created:{' '}
            <span className="text-gray-600">{depositCreated}</span>
          </p>
          <p>
            Status: <span className="text-gray-600">{status}</span>
          </p>
          <p>
            Order ID: <span className="text-gray-600">{orderId || '--'}</span>
          </p>
        </div>
        <div className="text-left flex-1">
          <p>
            Paid Out: <span className="text-gray-600">{paidOut}</span>
          </p>
          <p>
            From Account ID:{' '}
            <span className="text-gray-600">{fromAccountId}</span>
          </p>
        </div>
      </div>

      {/* Sections */}
      <Section title="Customer Details">
        <p>
          Customer Name:{' '}
          <span className="text-gray-600">{customerName || '--'}</span>
        </p>
        <p>
          Customer Address:{' '}
          <span className="text-gray-600">{customerAddress || '--'}</span>
        </p>
      </Section>

      <Section title="Transaction Details">
        <div className="flex justify-between">
          <p className="flex-1">
            Amount Sent: <span className="text-gray-600">{amountSent}</span>
          </p>
          <p className="flex-1">
            Currency:
            <span className="text-gray-600">{currency}</span>
          </p>
        </div>
        <p>
          Network: <span className="text-gray-600">{network || '--'}</span>
        </p>
      </Section>

      <Section title="Transfer Recipient">
        <p>
          Counterparty Name:{' '}
          <span className="text-gray-600">{counterpartyName || '--'}</span>
        </p>
      </Section>

      <Section title="Bank Account Details">
        <p>
          IBAN/Account Number:{' '}
          <span className="text-gray-600">{iban || '--'}</span>
        </p>
        <p>
          Bank Name: <span className="text-gray-600">{bankName || '--'}</span>
        </p>
        <p>
          Currency:{' '}
          <span className="text-gray-600">{bankCurrency || '--'}</span>
        </p>
        <p>
          City: <span className="text-gray-600">{city || '--'}</span>
        </p>
        <p>
          Street: <span className="text-gray-600">{street || '--'}</span>
        </p>
        <p>
          Postal Code:{' '}
          <span className="text-gray-600">{postalCode || '--'}</span>
        </p>
      </Section>

      <Section title="Pay-Out Details">
        <p>
          Ordering Customer:{' '}
          <span className="text-gray-600">{orderingCustomer || '--'}</span>
        </p>
      </Section>

      {/* Footer */}
      <div className="flex justify-between mt-12 text-[11px] text-gray-600">
        <div className="flex-1 " />
        <span className="flex-1 text-center">XPay @ 2025</span>
        <div className="text-right flex-1">
          <p>https://www.novaspay.com</p>
          <p>support@novaspay.com</p>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <h4 className="font-bold mb-1 text-base">{title}</h4>
      <div className="text-base">{children}</div>
    </div>
  );
}
