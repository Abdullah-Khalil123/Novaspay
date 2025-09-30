import { z } from 'zod';

export const KYCschema = z.object({
  id: z.number().int().optional(),
  email: z.string().optional(),
  type: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  agentId: z.number().int().nullable().optional(),
  status: z.string().nullable().optional(),
  reason: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type KYC = z.infer<typeof KYCschema>;
