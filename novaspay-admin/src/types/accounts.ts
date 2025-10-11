import { z } from 'zod';

export const accountSchema = z.object({
  id: z.number().optional(),
  bankingName: z.string().nullable().optional(),
  currency: z.string().nullable().optional(),
  clientName: z.string().nullable().optional(),
  ibanNumber: z.string().nullable().optional(),
  balance: z.number().optional(),
  realBalance: z.number().optional(),
  accountNumber: z.string().nullable().optional(),
  accountName: z.string().nullable().optional(),
  bankingAddress: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  clientId: z.number().optional(),
});

export type Account = z.infer<typeof accountSchema>;
