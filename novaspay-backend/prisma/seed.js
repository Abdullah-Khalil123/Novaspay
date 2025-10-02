import { PrismaClient } from '@prisma/client';
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

  const accounts = [];
  for (const client of clients) {
    const numAccounts = randomNumber(1, 3);
    for (let i = 0; i < numAccounts; i++) {
      const balance = parseFloat(faker.finance.amount(1000, 100000, 2));
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
          clientId: client.id,
        },
      });
      accounts.push(account);
    }
  }
  console.log(`✅ Created ${accounts.length} accounts`);

  // Seed Transactions
  console.log('💸 Seeding transactions...');
  const statuses = ['completed', 'pending', 'failed', 'cancelled'];
  const orderTypes = ['deposit', 'withdrawal', 'transfer', 'payment'];

  const transactions = [];
  for (const client of clients) {
    const numTransactions = randomNumber(3, 10);
    for (let i = 0; i < numTransactions; i++) {
      const amount = parseFloat(faker.finance.amount(10, 5000, 2));
      const transaction = await prisma.transaction.create({
        data: {
          orderId: `ORD-${faker.string.alphanumeric(10).toUpperCase()}`,
          accountName: faker.person.fullName(),
          paymentAccount: faker.finance.accountNumber(10),
          receiverName: faker.person.fullName(),
          receiverNumber: faker.finance.accountNumber(10),
          amount: amount,
          fee: parseFloat((amount * 0.02).toFixed(2)),
          status: randomItem(statuses),
          orderType: randomItem(orderTypes),
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
  const appStatuses = ['pending', 'approved', 'rejected'];
  const applications = [];
  for (const client of clients) {
    const numApps = randomNumber(1, 5);
    for (let i = 0; i < numApps; i++) {
      const app = await prisma.applications.create({
        data: {
          clientId: client.id,
          area: faker.location.city(),
          vaBankAccount: faker.finance.accountNumber(12),
          transactionType: randomItem(['buy', 'sell']),
          toCurrency: randomItem(currencies),
          amount: parseFloat(faker.finance.amount(100, 5000, 2)),
          cryptoAddress: faker.finance.ethereumAddress(),
          referenceRate: parseFloat(faker.finance.amount(0.5, 1.5, 4)),
          totalAmount: parseFloat(faker.finance.amount(200, 10000, 2)),
          estimatedFee: parseFloat(faker.finance.amount(5, 100, 2)),
          estimatedAmount: parseFloat(faker.finance.amount(100, 5000, 2)),
          approverId: Math.random() > 0.5 ? randomItem(users).id : null,
          approvalComments: Math.random() > 0.5 ? faker.lorem.sentence() : null,
          remark: faker.lorem.sentence(),
          status: randomItem(appStatuses),
        },
      });
      applications.push(app);
    }
  }
  console.log(`✅ Created ${applications.length} applications`);

  // Seed KYC
  console.log('📋 Seeding KYC records...');
  const kycs = await Promise.all(
    Array.from({ length: 10 }, () =>
      prisma.kYC.create({
        data: {
          email: faker.internet.email(),
          type: randomItem(['individual', 'business']),
          name: faker.person.fullName(),
          phone: faker.phone.number(),
          agentId: randomNumber(1000, 9999),
          status: randomItem(['pending', 'approved', 'rejected']),
          reason: Math.random() > 0.5 ? faker.lorem.sentence() : null,
        },
      })
    )
  );
  console.log(`✅ Created ${kycs.length} KYC records`);

  // Seed OnBoarding
  console.log('🚀 Seeding onboarding records...');
  await Promise.all(
    Array.from({ length: 5 }, () =>
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
  console.log(`✅ Created onboarding records`);

  // Seed VA
  console.log('🏦 Seeding virtual accounts...');
  await Promise.all(
    Array.from({ length: 8 }, () =>
      prisma.vA.create({
        data: {
          purpose: randomItem([
            'business_operations',
            'payment_collection',
            'payroll',
          ]),
          currency: randomItem(currencies),
          paymentMethod: randomItem(['bank_transfer', 'card', 'wire']),
          headquaters: faker.location.country(),
          state: faker.location.state(),
          city: faker.location.city(),
          street: faker.location.streetAddress(),
          postalCode: faker.location.zipCode(),
          businessCategory: randomItem(['retail', 'technology', 'finance']),
          region: faker.location.state(),
          fundingSource: randomItem(['revenue', 'investment', 'loan']),
          storePhotos: Array.from({ length: randomNumber(0, 3) }, () =>
            faker.image.url()
          ),
          declineReason: Math.random() > 0.8 ? faker.lorem.sentence() : null,
          status: randomItem(['pending', 'approved', 'rejected']),
        },
      })
    )
  );
  console.log(`✅ Created virtual accounts`);

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`  Users: ${users.length}`);
  console.log(`  Clients: ${clients.length}`);
  console.log(`  Accounts: ${accounts.length}`);
  console.log(`  Transactions: ${transactions.length}`);
  console.log(`  Applications: ${applications.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
