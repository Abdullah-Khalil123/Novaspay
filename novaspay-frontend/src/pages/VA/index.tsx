import AccountsFilters from '../Account/filter';
import PageFilters from '../Account/pagination';

const mockData = [
  {
    purpose: 'E-commerce Store',
    currency: 'USD',
    paymentMethod: 'Credit Card',
    headquarters: 'New York',
    stateProvince: 'NY',
    city: 'New York City',
    postalCode: '10001',
    businessCategory: 'Retail',
    operatingCountryOrRegion: 'United States',
    expectedFundingSource: 'Online Sales',
    storePhotos: 'store1.jpg',
    declineReason: '',
    status: 'Active',
    creationDate: '2025-09-01',
    latestUpdate: '2025-09-20',
  },
  {
    purpose: 'Freelance Services',
    currency: 'EUR',
    paymentMethod: 'PayPal',
    headquarters: 'Berlin',
    stateProvince: 'Berlin',
    city: 'Berlin',
    postalCode: '10115',
    businessCategory: 'Services',
    operatingCountryOrRegion: 'Germany',
    expectedFundingSource: 'Client Payments',
    storePhotos: 'store2.jpg',
    declineReason: 'Missing documents',
    status: 'Declined',
    creationDate: '2025-08-15',
    latestUpdate: '2025-08-25',
  },
  {
    purpose: 'Dropshipping',
    currency: 'GBP',
    paymentMethod: 'Bank Transfer',
    headquarters: 'London',
    stateProvince: 'England',
    city: 'London',
    postalCode: 'SW1A 1AA',
    businessCategory: 'Wholesale',
    operatingCountryOrRegion: 'United Kingdom',
    expectedFundingSource: 'International Orders',
    storePhotos: 'store3.jpg',
    declineReason: '',
    status: 'Pending',
    creationDate: '2025-09-10',
    latestUpdate: '2025-09-18',
  },
  {
    purpose: 'Mobile App Startup',
    currency: 'PKR',
    paymentMethod: 'JazzCash',
    headquarters: 'Karachi',
    stateProvince: 'Sindh',
    city: 'Karachi',
    postalCode: '74000',
    businessCategory: 'Technology',
    operatingCountryOrRegion: 'Pakistan',
    expectedFundingSource: 'Investments',
    storePhotos: 'store4.jpg',
    declineReason: '',
    status: 'Active',
    creationDate: '2025-07-05',
    latestUpdate: '2025-07-25',
  },
  {
    purpose: 'Restaurant',
    currency: 'CAD',
    paymentMethod: 'Debit Card',
    headquarters: 'Toronto',
    stateProvince: 'Ontario',
    city: 'Toronto',
    postalCode: 'M5H 2N2',
    businessCategory: 'Food & Beverage',
    operatingCountryOrRegion: 'Canada',
    expectedFundingSource: 'Daily Sales',
    storePhotos: 'store5.jpg',
    declineReason: '',
    status: 'Active',
    creationDate: '2025-06-12',
    latestUpdate: '2025-07-01',
  },
];

const VAPage = () => {
  return (
    <div className="px-padding mt-2">
      {/* <AccountsFilters /> */}

      <div className="bg-secondary rounded-md border border-border mt-4 p-4">
        <div className="overflow-x-auto">
          <table className="table-fixed text-sm w-full border-collapse">
            <thead className="text-text-primary bg-background">
              <tr>
                {[
                  'Purpose',
                  'Currency',
                  'Payment Method',
                  'Headquarters',
                  'State/Province',
                  'City',
                  'Postal Code',
                  'Business Category',
                  'Operating Country or Region',
                  'Expected Funding Source',
                  'Store Photos',
                  'Decline Reason',
                  'Status',
                  'Creation Date',
                  'Latest Update',
                ].map((header, i) => (
                  <th key={i} className="w-[80px] min-w-[80px] px-2 py-2">
                    <div>{header}</div>
                  </th>
                ))}
                {/* <th className="w-[60px] sticky right-0 bg-background z-10"></th> */}
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
                  {/* <td
                    className={
                      `w-[40px] sticky right-0 font-sans text-end space-y-4 text-[#c2cb3d]` +
                      (idx % 2 === 0 ? ' bg-background' : ' bg-secondary')
                    }
                  >
                    <p className="hover:text-[#60831a] cursor-pointer">
                      Update
                    </p>
                  </td> */}
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

export default VAPage;
