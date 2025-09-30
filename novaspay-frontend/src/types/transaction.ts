import { z } from 'zod';

export const transactionSchema = z.object({
  id: z.number().optional(),
  accountName: z.string().optional(),
  amount: z.number().optional(),
  createdAt: z.string().optional(),
  fee: z.number().optional(),
  orderId: z.string().nullable().optional(),
  orderType: z.string().nullable().optional(),
  paymentAccount: z.string().optional(),
  reason: z.string().nullable().optional(),
  receiverName: z.string().nullable().optional(),
  receiverNumber: z.string().nullable().optional(),
  status: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Transaction = z.infer<typeof transactionSchema>;
