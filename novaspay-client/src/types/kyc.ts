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

  clientId: z.number().int().optional(),
  firstName: z.string().nullable().optional(),
  middleName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  dateOfBirth: z.string().nullable().optional(),
  contactNumber: z.string().nullable().optional(),
  corporateEmail: z.string().nullable().optional(),
  area: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  postalCode: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  companyStreet: z.string().nullable().optional(),
  companyCity: z.string().nullable().optional(),
  companyAddress: z.string().nullable().optional(),
  companyCountry: z.string().nullable().optional(),
  headquarters: z.string().nullable().optional(),

  backFacingImage: z.any().optional(),
  frontFacingImage: z.any().optional(),

  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type KYC = z.infer<typeof KYCschema>;
