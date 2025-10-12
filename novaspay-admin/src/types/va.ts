import { z } from 'zod';

export const vaSchema = z.object({
  id: z.number().optional(),
  purpose: z.string().nullable().optional(),
  currency: z.string().nullable().optional(),
  paymentMethod: z.string().nullable().optional(),
  headquaters: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  street: z.string().nullable().optional(),
  postalCode: z.string().nullable().optional(),
  businessCategory: z.string().nullable().optional(),
  region: z.string().nullable().optional(),
  fundingSource: z.string().nullable().optional(),
  storePhotos: z.array(z.string()).optional(),
  declineReason: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  clientId: z.any().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type VA = z.infer<typeof vaSchema>;
