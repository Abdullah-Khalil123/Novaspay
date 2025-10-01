import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// Helper function to get random item from array
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper function to get random number in range
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
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

  // Create specific test clients first
  const specificClients = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      type: 'individual',
      country: 'USA',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      type: 'business',
      country: 'UK',
    },
    {
      name: 'Test Client',
      email: 'test@example.com',
      type: 'individual',
      country: 'Canada',
    },
  ];

  const clients = [];

  // Create specific clients
  for (const clientData of specificClients) {
    const client = await prisma.client.create({
      data: {
        name: clientData.name,
        loginTime: faker.date.recent({ days: 7 }),
        password: hashedPassword,
        type: clientData.type,
        country: clientData.country,
        email: clientData.email,
        agentName: faker.person.fullName(),
        bankAccountNumber: faker.finance.accountNumber(12),
        description: faker.company.catchPhrase(),
        invitationCode: faker.string.alphanumeric(8).toUpperCase(),
        accountInfo: faker.lorem.sentence(),
      },
    });
    clients.push(client);
  }

  // Create random clients
  for (let i = 0; i < 17; i++) {
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
          realBalance: balance * (0.95 + Math.random() * 0.1), // Real balance slightly different
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
  const reasons = [
    'Payment for services',
    'Refund',
    'Salary payment',
    'Invoice settlement',
    'Bank transfer',
    null,
  ];

  const transactions = [];
  for (const client of clients) {
    const numTransactions = randomNumber(5, 15);
    for (let i = 0; i < numTransactions; i++) {
      const amount = parseFloat(faker.finance.amount(10, 10000, 2));
      const transaction = await prisma.transaction.create({
        data: {
          orderId: `ORD-${faker.string.alphanumeric(10).toUpperCase()}`,
          accountName: faker.person.fullName(),
          paymentAccount: faker.finance.accountNumber(10),
          receiverName: faker.person.fullName(),
          receiverNumber: faker.finance.accountNumber(10),
          amount: amount,
          fee: parseFloat((amount * 0.02).toFixed(2)), // 2% fee
          status: randomItem(statuses),
          orderType: randomItem(orderTypes),
          reason: randomItem(reasons),
          clientId: client.id,
          createdAt: faker.date.recent({ days: 90 }),
        },
      });
      transactions.push(transaction);
    }
  }
  console.log(`✅ Created ${transactions.length} transactions`);

  // Seed KYC
  console.log('📋 Seeding KYC records...');
  const kycTypes = ['individual', 'business', 'corporate'];
  const kycStatuses = ['pending', 'approved', 'rejected', 'under_review'];

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
          reason: Math.random() > 0.7 ? faker.lorem.sentence() : null,
        },
      })
    )
  );
  console.log(`✅ Created ${kycs.length} KYC records`);

  // Seed OnBoarding
  console.log('🚀 Seeding onboarding records...');
  const onboardings = await Promise.all(
    Array.from({ length: 10 }, () =>
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

  // Seed VA (Virtual Accounts)
  console.log('🏦 Seeding virtual accounts...');
  const purposes = [
    'business_operations',
    'payment_collection',
    'payroll',
    'vendor_payments',
  ];
  const paymentMethods = ['bank_transfer', 'card', 'wire', 'ach'];
  const businessCategories = [
    'retail',
    'technology',
    'healthcare',
    'finance',
    'education',
    'manufacturing',
  ];
  const vaStatuses = ['pending', 'approved', 'rejected', 'under_review'];
  const fundingSources = ['revenue', 'investment', 'loan', 'grant'];

  const vas = await Promise.all(
    Array.from({ length: 12 }, () => {
      const numPhotos = randomNumber(0, 5);
      return prisma.vA.create({
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
          storePhotos: Array.from({ length: numPhotos }, () =>
            faker.image.url()
          ),
          declineReason: Math.random() > 0.8 ? faker.lorem.sentence() : null,
          status: randomItem(vaStatuses),
        },
      });
    })
  );
  console.log(`✅ Created ${vas.length} virtual account records`);

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`  Users: ${users.length}`);
  console.log(`  Clients: ${clients.length}`);
  console.log(`  Accounts: ${accounts.length}`);
  console.log(`  Transactions: ${transactions.length}`);
  console.log(`  KYC Records: ${kycs.length}`);
  console.log(`  Onboarding Records: ${onboardings.length}`);
  console.log(`  Virtual Accounts: ${vas.length}`);
  console.log('\n🔑 Default admin credentials:');
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
