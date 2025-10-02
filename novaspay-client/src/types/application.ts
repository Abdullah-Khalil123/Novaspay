import { z } from 'zod';

export const applicationSchema = z.object({
  id: z.number().optional(),
  amount: z.number().optional(),
  approvalComments: z.string().nullable().optional(),
  approverId: z.number().optional(),
  area: z.string().nullable().optional(),
  clientId: z.number().optional(),
  createdAt: z.string().optional(),
  cryptoAddress: z.string().nullable().optional(),
  estimatedAmount: z.number().optional(),
  estimatedFee: z.number().optional(),
  referenceRate: z.number().optional(),
  remark: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  toCurrency: z.string().nullable().optional(),
  fromCurrency: z.string().nullable().optional(),
  totalAmount: z.number().optional(),
  transactionType: z.string().nullable().optional(),
  updatedAt: z.string().optional(),
  vaBankAccount: z.string().nullable().optional(),

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
