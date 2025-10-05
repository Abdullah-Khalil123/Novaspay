import { z } from 'zod';

export const applicationSchema = z.object({
  id: z.number().optional(),
  amount: z.number().min(0, 'Amount must be greater than 0'),
  approvalComments: z.string().nullable().optional(),
  approverId: z.number().optional(),
  area: z.string().min(1, 'Area must be selected'),
  clientId: z.number().optional(),
  createdAt: z.string().optional(),
  cryptoAddress: z
    .string()
    .min(5, 'Crypto address must be at least 5 characters'),
  estimatedAmount: z.number().optional(),
  estimatedFee: z.number().optional(),
  referenceRate: z.number().optional(),
  remark: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  toCurrency: z.string().min(1, 'To Currency must be selected').nullable(),
  fromCurrency: z.string().min(1, 'From Currency must be selected'),
  totalAmount: z.number().optional(),
  transactionType: z.string(),
  updatedAt: z.string().optional(),
  vaBankAccount: z.string(),

  client: z
    .object({
      name: z.string().optional(),
    })
    .optional(),
  approver: z
    .object({
      name: z.string().optional(),
    })
    .optional(),
});

export type Application = z.infer<typeof applicationSchema>;
