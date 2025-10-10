import {
  PrismaClient,
  Status,
  StatusApplication,
  AccountStatus,
  OrderType,
} from '@prisma/client';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear previous data
  console.log('🗑️ Clearing existing data...');
  await prisma.applications.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.account.deleteMany();
  await prisma.kYC.deleteMany();
  await prisma.onBoarding.deleteMany();
  await prisma.vA.deleteMany();
  await prisma.emailVerification.deleteMany();
  await prisma.invite.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();
  await prisma.quote.deleteMany();
  await prisma.currency.deleteMany();

  // Seed Admin Users
  console.log('👤 Seeding users...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Admin User',
        lastActive: new Date(),
      },
    }),
    ...Array.from({ length: 4 }).map(() =>
      prisma.user.create({
        data: {
          email: faker.internet.email(),
          password: hashedPassword,
          name: faker.person.fullName(),
          lastActive: faker.date.recent({ days: 60 }),
        },
      })
    ),
  ]);
  console.log(`✅ Created ${users.length} users`);

  // Seed Clients
  console.log('👥 Seeding clients...');
  const clientTypes = ['individual', 'business', 'corporate'];
  const countries = ['USA', 'UK', 'Canada', 'Germany', 'France', 'Australia'];
  const clients = [];

  for (let i = 0; i < 10; i++) {
    const client = await prisma.client.create({
      data: {
        name: faker.person.fullName(),
        loginTime: faker.date.recent({ days: 10 }),
        password: hashedPassword,
        type: randomItem(clientTypes),
        country: randomItem(countries),
        email: faker.internet.email(),
        agentName: faker.person.fullName(),
        bankAccountNumber: faker.finance.accountNumber(10),
        description: faker.company.catchPhrase(),
        invitationCode: faker.string.alphanumeric(8).toUpperCase(),
        accountInfo: faker.lorem.sentence(),
      },
    });
    clients.push(client);
  }
  console.log(`✅ Created ${clients.length} clients`);

  // Seed Accounts
  console.log('🏦 Seeding accounts...');
  const bankNames = [
    'Chase Bank',
    'HSBC',
    'Barclays',
    'Deutsche Bank',
    'Citibank',
  ];
  const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  const accounts = [];

  for (const client of clients) {
    const balance = parseFloat(
      faker.finance.amount({ min: 1000, max: 100000 })
    );
    const acc = await prisma.account.create({
      data: {
        bankingName: randomItem(bankNames),
        currency: randomItem(currencies),
        clientName: client.name,
        ibanNumber: faker.finance.iban(),
        balance,
        realBalance: balance - randomNumber(10, 100),
        accountNumber: faker.finance.accountNumber(10),
        accountName: `${client.name} ${randomItem(['Checking', 'Savings'])}`,
        bankingAddress: faker.location.streetAddress(),
        status: randomItem([
          AccountStatus.ACTIVE,
          AccountStatus.INACTIVE,
          AccountStatus.SUSPENDED,
        ]),
        clientId: client.id,
      },
    });
    accounts.push(acc);
  }
  console.log(`✅ Created ${accounts.length} accounts`);

  // Seed Transactions
  console.log('💸 Seeding transactions...');
  const transactions = [];
  for (const client of clients) {
    const n = randomNumber(3, 8);
    for (let i = 0; i < n; i++) {
      const amt = parseFloat(faker.finance.amount({ min: 50, max: 5000 }));
      const tx = await prisma.transaction.create({
        data: {
          orderId: `ORD-${faker.string.alphanumeric(10).toUpperCase()}`,
          accountName: faker.person.fullName(),
          paymentAccount: faker.finance.accountNumber(10),
          receiverName: faker.person.fullName(),
          receiverNumber: faker.finance.accountNumber(10),
          amount: amt,
          fee: parseFloat((amt * 0.02).toFixed(2)),
          status: randomItem([
            Status.PENDING,
            Status.SUCCESS,
            Status.FAILED,
            Status.CANCELED,
            Status.IN_REVIEW,
          ]),
          orderType: randomItem([
            OrderType.TRANSFER,
            OrderType.WITHDRAWAL,
            OrderType.DEPOSIT,
            OrderType.PAYMENT,
            OrderType.EXCHANGE,
            OrderType.NONE,
          ]),
          reason: Math.random() > 0.7 ? faker.lorem.sentence() : null,
          clientId: client.id,
          createdAt: faker.date.recent({ days: 30 }),
        },
      });
      transactions.push(tx);
    }
  }
  console.log(`✅ Created ${transactions.length} transactions`);

  // Seed Applications
  console.log('🧾 Seeding applications...');
  const applications = [];
  for (const client of clients) {
    const count = randomNumber(1, 5);
    for (let i = 0; i < count; i++) {
      const amount = parseFloat(faker.finance.amount({ min: 100, max: 3000 }));
      const rate = parseFloat(
        faker.finance.amount({ min: 0.5, max: 1.5, dec: 4 })
      );
      const fee = parseFloat(faker.finance.amount({ min: 5, max: 100 }));
      const app = await prisma.applications.create({
        data: {
          clientId: client.id,
          area: faker.location.country(),
          vaBankAccount: faker.finance.accountNumber(12),
          transactionType: randomItem(['buy', 'sell', 'transfer']),
          toCurrency: randomItem(currencies),
          fromCurrency: randomItem(currencies),
          amount,
          cryptoAddress: faker.finance.ethereumAddress(),
          referenceRate: rate,
          totalAmount: amount * rate,
          estimatedFee: fee,
          estimatedAmount: amount * rate - fee,
          approverId: Math.random() > 0.3 ? randomItem(users).id : null,
          approvalComments: faker.lorem.sentence(),
          remark: faker.lorem.sentence(),
          status: randomItem([
            StatusApplication.Pending,
            StatusApplication.Approved,
            StatusApplication.Rejected,
            StatusApplication.InReview,
          ]),
          createdAt: faker.date.recent({ days: 60 }),
        },
      });
      applications.push(app);
    }
  }
  console.log(`✅ Created ${applications.length} applications`);

  // Seed KYC
  console.log('🪪 Seeding KYC...');
  const kycs = [];
  for (const client of clients) {
    const kyc = await prisma.kYC.create({
      data: {
        email: faker.internet.email(),
        type: randomItem(['individual', 'business']),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: Math.random() > 0.5 ? faker.person.middleName() : null,
        phone: faker.phone.number(),
        agentId: randomNumber(1000, 9999),
        status: randomItem([
          Status.PENDING,
          Status.SUCCESS,
          Status.FAILED,
          Status.CANCELED,
          Status.IN_REVIEW,
        ]),
        reason: Math.random() > 0.6 ? faker.lorem.sentence() : null,
        area: faker.location.state(),
        corporateEmail: Math.random() > 0.5 ? faker.internet.email() : null,
        dateOfBirth: faker.date.birthdate({ min: 18, max: 70, mode: 'age' }),
        contactNumber: faker.phone.number(),
        companyCountry: randomItem(countries),
        companyAddress: faker.location.streetAddress(),
        city: faker.location.city(),
        postalCode: faker.location.zipCode(),
        headquarters: faker.location.city(),
        state: faker.location.state(),
        companyCity: faker.location.city(),
        companyStreet: faker.location.street(),
        clientId: client.id,
      },
    });
    kycs.push(kyc);
  }
  console.log(`✅ Created ${kycs.length} KYC records`);

  // Seed Onboarding
  console.log('🚀 Seeding onboarding...');
  const onboardings = await Promise.all(
    Array.from({ length: 8 }).map(() =>
      prisma.onBoarding.create({
        data: {
          clientName: faker.person.fullName(),
          accountErrorMessage:
            Math.random() > 0.7 ? faker.lorem.sentence() : null,
          bankAccountStatusMsg:
            Math.random() > 0.5
              ? 'Account verified successfully'
              : 'Pending verification',
          reason: Math.random() > 0.6 ? faker.lorem.sentence() : null,
        },
      })
    )
  );
  console.log(`✅ Created ${onboardings.length} onboarding records`);

  // Seed VA
  console.log('🏢 Seeding virtual accounts...');
  const vas = await Promise.all(
    Array.from({ length: 12 }).map(() =>
      prisma.vA.create({
        data: {
          purpose: randomItem([
            'business_operations',
            'payment_collection',
            'investment',
          ]),
          currency: randomItem(currencies),
          paymentMethod: randomItem(['bank_transfer', 'card', 'crypto']),
          headquaters: faker.location.country(),
          state: faker.location.state(),
          city: faker.location.city(),
          street: faker.location.streetAddress(),
          postalCode: faker.location.zipCode(),
          businessCategory: randomItem([
            'retail',
            'technology',
            'finance',
            'services',
          ]),
          region: faker.location.state(),
          fundingSource: randomItem(['revenue', 'investment', 'loan']),
          storePhotos: Array.from({ length: randomNumber(0, 4) }, () =>
            faker.image.url()
          ),
          declineReason: Math.random() > 0.8 ? faker.lorem.sentence() : null,
          status: randomItem([
            Status.PENDING,
            Status.SUCCESS,
            Status.FAILED,
            Status.CANCELED,
            Status.IN_REVIEW,
          ]),
        },
      })
    )
  );
  console.log(`✅ Created ${vas.length} virtual accounts`);

  // Seed Email Verifications
  console.log('📧 Seeding email verifications...');
  const emailVerifications = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.emailVerification.create({
        data: {
          email: faker.internet.email(),
          otp: faker.string.numeric(6),
          expiresAt: faker.date.future(),
        },
      })
    )
  );
  console.log(`✅ Created ${emailVerifications.length} email verifications`);

  // Seed Invites
  console.log('📨 Seeding invites...');
  const invites = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.invite.create({
        data: {
          code: faker.string.uuid(),
          used: faker.datatype.boolean(),
          usedAt: Math.random() > 0.5 ? faker.date.recent() : null,
        },
      })
    )
  );
  console.log(`✅ Created ${invites.length} invites`);

  // Seed Currency and Quotes
  console.log('💱 Seeding currencies and quotes...');
  const currencyData = [
    { symbol: 'USD', name: 'US Dollar' },
    { symbol: 'EUR', name: 'Euro' },
    { symbol: 'GBP', name: 'British Pound' },
    { symbol: 'CAD', name: 'Canadian Dollar' },
    { symbol: 'AUD', name: 'Australian Dollar' },
  ];

  const createdCurrencies = [];
  for (const curr of currencyData) {
    const currency = await prisma.currency.create({
      data: {
        symbol: curr.symbol,
        name: curr.name,
        amount: 1.0,
        lastUpdated: new Date(),
      },
    });
    createdCurrencies.push(currency);

    // Create quotes for each currency
    const cryptoTargets = ['USDT', 'BTC', 'ETH'];
    for (const target of cryptoTargets) {
      await prisma.quote.create({
        data: {
          baseSymbol: curr.symbol,
          targetSymbol: target,
          price: parseFloat(
            faker.finance.amount({ min: 0.5, max: 50000, dec: 4 })
          ),
          lastUpdated: new Date(),
          currencyId: currency.id,
        },
      });
    }
  }
  console.log(`✅ Created ${createdCurrencies.length} currencies with quotes`);

  console.log('\n🎉 Seeding completed successfully!');
  console.table({
    Users: users.length,
    Clients: clients.length,
    Accounts: accounts.length,
    Transactions: transactions.length,
    Applications: applications.length,
    KYC: kycs.length,
    OnBoardings: onboardings.length,
    VAs: vas.length,
    EmailVerifications: emailVerifications.length,
    Invites: invites.length,
    Currencies: createdCurrencies.length,
  });
  console.log('\n🔐 Test credentials: admin@example.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
