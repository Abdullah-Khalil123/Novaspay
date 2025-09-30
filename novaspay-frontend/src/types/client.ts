import { z } from 'zod';

// Client Schema
export const clientSchema = z.object({
  id: z.number().optional(),
  name: z.string().nullable().optional(),
  loginTime: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  agentName: z.string().nullable().optional(),
  bankAccountNumber: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  invitationCode: z.string().nullable().optional(),
  accountInfo: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type Client = z.infer<typeof clientSchema>;
