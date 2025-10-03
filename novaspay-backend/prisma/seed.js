import { PrismaClient, Status, AccountStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// Helpers
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.applications.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.account.deleteMany();
  await prisma.kYC.deleteMany();
  await prisma.onBoarding.deleteMany();
  await prisma.vA.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();

  // Seed Users (Admins)
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
    ...Array.from({ length: 4 }, () =>
      prisma.user.create({
        data: {
          email: faker.internet.email(),
          password: hashedPassword,
          name: faker.person.fullName(),
          lastActive: faker.date.recent({ days: 30 }),
        },
      })
    ),
  ]);
  console.log(`✅ Created ${users.length} users`);

  // Seed Clients
  console.log('👥 Seeding clients...');
  const countries = [
    'USA',
    'UK',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'Singapore',
  ];
  const clientTypes = ['individual', 'business', 'corporate', 'enterprise'];

  const clients = [];
  for (let i = 0; i < 10; i++) {
    const client = await prisma.client.create({
      data: {
        name: faker.person.fullName(),
        loginTime: faker.date.recent({ days: 7 }),
        password: hashedPassword,
        type: randomItem(clientTypes),
        country: randomItem(countries),
        email: faker.internet.email(),
        agentName: faker.person.fullName(),
        bankAccountNumber: faker.finance.accountNumber(12),
        description: faker.company.catchPhrase(),
        invitationCode: faker.string.alphanumeric(8).toUpperCase(),
        accountInfo: faker.lorem.sentence(),
      },
    });
    clients.push(client);
  }
  console.log(`✅ Created ${clients.length} clients`);

  // Seed Accounts
  console.log('💳 Seeding accounts...');
  const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'SGD'];
  const bankNames = [
    'Chase Bank',
    'Bank of America',
    'Wells Fargo',
    'Citibank',
    'HSBC',
    'Barclays',
    'Deutsche Bank',
  ];
  const accountStatuses = [
    AccountStatus.ACTIVE,
    AccountStatus.INACTIVE,
    AccountStatus.SUSPENDED,
  ];

  const accounts = [];
  for (const client of clients) {
    const numAccounts = randomNumber(1, 3);
    for (let i = 0; i < numAccounts; i++) {
      const balance = parseFloat(
        faker.finance.amount({ min: 1000, max: 100000, dec: 2 })
      );
      const account = await prisma.account.create({
        data: {
          bankingName: randomItem(bankNames),
          currency: randomItem(currencies),
          clientName: client.name,
          ibanNumber: faker.finance.iban(),
          balance: balance,
          realBalance: balance * (0.95 + Math.random() * 0.1),
          accountNumber: faker.finance.accountNumber(10),
          accountName: `${client.name} ${randomItem([
            'Savings',
            'Checking',
            'Business',
          ])} Account`,
          bankingAddress: faker.location.streetAddress(true),
          status: randomItem(accountStatuses),
          clientId: client.id,
        },
      });
      accounts.push(account);
    }
  }
  console.log(`✅ Created ${accounts.length} accounts`);

  // Seed Transactions
  console.log('💸 Seeding transactions...');
  const transactionStatuses = [
    Status.SUCCESS,
    Status.PENDING,
    Status.FAILED,
    Status.CANCELED,
    Status.IN_REVIEW,
  ];
  const orderTypes = [
    'deposit',
    'withdrawal',
    'transfer',
    'payment',
    'exchange',
  ];

  const transactions = [];
  for (const client of clients) {
    const numTransactions = randomNumber(3, 10);
    for (let i = 0; i < numTransactions; i++) {
      const amount = parseFloat(
        faker.finance.amount({ min: 10, max: 5000, dec: 2 })
      );
      const transaction = await prisma.transaction.create({
        data: {
          orderId: `ORD-${faker.string.alphanumeric(10).toUpperCase()}`,
          accountName: faker.person.fullName(),
          paymentAccount: faker.finance.accountNumber(10),
          receiverName: faker.person.fullName(),
          receiverNumber: faker.finance.accountNumber(10),
          amount: amount,
          fee: parseFloat((amount * 0.02).toFixed(2)),
          status: randomItem(transactionStatuses),
          orderType: randomItem(orderTypes),
          reason: Math.random() > 0.7 ? faker.lorem.sentence() : null,
          clientId: client.id,
          createdAt: faker.date.recent({ days: 90 }),
        },
      });
      transactions.push(transaction);
    }
  }
  console.log(`✅ Created ${transactions.length} transactions`);

  // Seed Applications
  console.log('📄 Seeding applications...');
  const appStatuses = [
    Status.PENDING,
    Status.SUCCESS,
    Status.FAILED,
    Status.CANCELED,
    Status.IN_REVIEW,
  ];
  const transactionTypes = ['buy', 'sell', 'exchange', 'transfer'];
  const areas = [
    'North America',
    'Europe',
    'Asia Pacific',
    'Middle East',
    'Latin America',
  ];

  const applications = [];
  for (const client of clients) {
    const numApps = randomNumber(1, 5);
    for (let i = 0; i < numApps; i++) {
      const amount = parseFloat(
        faker.finance.amount({ min: 100, max: 5000, dec: 2 })
      );
      const estimatedFee = parseFloat(
        faker.finance.amount({ min: 5, max: 100, dec: 2 })
      );
      const referenceRate = parseFloat(
        faker.finance.amount({ min: 0.5, max: 1.5, dec: 4 })
      );

      const app = await prisma.applications.create({
        data: {
          clientId: client.id,
          area: randomItem(areas),
          vaBankAccount: faker.finance.accountNumber(12),
          transactionType: randomItem(transactionTypes),
          toCurrency: randomItem(currencies),
          fromCurrency: randomItem(currencies),
          amount: amount,
          cryptoAddress: faker.finance.ethereumAddress(),
          referenceRate: referenceRate,
          totalAmount: parseFloat((amount * referenceRate).toFixed(2)),
          estimatedFee: estimatedFee,
          estimatedAmount: parseFloat(
            (amount * referenceRate - estimatedFee).toFixed(2)
          ),
          approverId: Math.random() > 0.3 ? randomItem(users).id : null,
          approvalComments: Math.random() > 0.5 ? faker.lorem.sentence() : null,
          remark: faker.lorem.sentence(),
          status: randomItem(appStatuses),
          createdAt: faker.date.recent({ days: 60 }),
        },
      });
      applications.push(app);
    }
  }
  console.log(`✅ Created ${applications.length} applications`);

  // Seed KYC
  console.log('📋 Seeding KYC records...');
  const kycStatuses = [
    Status.PENDING,
    Status.SUCCESS,
    Status.FAILED,
    Status.IN_REVIEW,
  ];
  const kycTypes = ['individual', 'business', 'corporate'];

  const kycs = await Promise.all(
    Array.from({ length: 15 }, () =>
      prisma.kYC.create({
        data: {
          email: faker.internet.email(),
          type: randomItem(kycTypes),
          name: faker.person.fullName(),
          phone: faker.phone.number(),
          agentId: randomNumber(1000, 9999),
          status: randomItem(kycStatuses),
          reason: Math.random() > 0.6 ? faker.lorem.sentence() : null,
          createdAt: faker.date.recent({ days: 30 }),
        },
      })
    )
  );
  console.log(`✅ Created ${kycs.length} KYC records`);

  // Seed OnBoarding
  console.log('🚀 Seeding onboarding records...');
  const onboardings = await Promise.all(
    Array.from({ length: 8 }, () =>
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
          createdAt: faker.date.recent({ days: 45 }),
        },
      })
    )
  );
  console.log(`✅ Created ${onboardings.length} onboarding records`);

  // Seed VA (Virtual Accounts)
  console.log('🏦 Seeding virtual accounts...');
  const vaStatuses = [
    Status.PENDING,
    Status.SUCCESS,
    Status.FAILED,
    Status.IN_REVIEW,
  ];
  const purposes = [
    'business_operations',
    'payment_collection',
    'payroll',
    'investment',
    'trading',
  ];
  const paymentMethods = [
    'bank_transfer',
    'card',
    'wire',
    'crypto',
    'direct_debit',
  ];
  const businessCategories = [
    'retail',
    'technology',
    'finance',
    'healthcare',
    'manufacturing',
    'services',
  ];
  const fundingSources = [
    'revenue',
    'investment',
    'loan',
    'grants',
    'personal',
  ];

  const vas = await Promise.all(
    Array.from({ length: 12 }, () =>
      prisma.vA.create({
        data: {
          purpose: randomItem(purposes),
          currency: randomItem(currencies),
          paymentMethod: randomItem(paymentMethods),
          headquaters: faker.location.country(),
          state: faker.location.state(),
          city: faker.location.city(),
          street: faker.location.streetAddress(),
          postalCode: faker.location.zipCode(),
          businessCategory: randomItem(businessCategories),
          region: faker.location.state(),
          fundingSource: randomItem(fundingSources),
          storePhotos: Array.from({ length: randomNumber(0, 5) }, () =>
            faker.image.url()
          ),
          declineReason: Math.random() > 0.8 ? faker.lorem.sentence() : null,
          status: randomItem(vaStatuses),
          createdAt: faker.date.recent({ days: 60 }),
        },
      })
    )
  );
  console.log(`✅ Created ${vas.length} virtual accounts`);

  console.log('\n🎉 Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`  Users: ${users.length}`);
  console.log(`  Clients: ${clients.length}`);
  console.log(`  Accounts: ${accounts.length}`);
  console.log(`  Transactions: ${transactions.length}`);
  console.log(`  Applications: ${applications.length}`);
  console.log(`  KYC Records: ${kycs.length}`);
  console.log(`  Onboarding Records: ${onboardings.length}`);
  console.log(`  Virtual Accounts: ${vas.length}`);
  console.log('\n💡 Test login credentials:');
  console.log('  Email: admin@example.com');
  console.log('  Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
