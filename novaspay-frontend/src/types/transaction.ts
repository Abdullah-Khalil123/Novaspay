import { z } from 'zod';

export const transactionSchema = z.object({
  id: z.number().optional(),

  // core transaction fields
  accountName: z.string().nullable().optional(),
  amount: z.number().nullable().optional(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
  fee: z.number().nullable().optional(),
  orderId: z.string().nullable().optional(),
  orderType: z.string().nullable().optional(),
  paymentAccount: z.string().nullable().optional(),
  reason: z.string().nullable().optional(),
  receiverName: z.string().nullable().optional(),
  receiverNumber: z.string().nullable().optional(),
  status: z.string().nullable().optional(),

  // extended fields from related client/account/kyc
  fromAccountId: z.string().nullable().optional(),
  customerName: z.string().nullable().optional(),
  customerAddress: z.string().nullable().optional(),
  iban: z.string().nullable().optional(),
  bankName: z.string().nullable().optional(),
  bankCurrency: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  street: z.string().nullable().optional(),
  postalCode: z.string().nullable().optional(),
  orderingCustomer: z.string().nullable().optional(),
});

export type Transaction = z.infer<typeof transactionSchema>;
