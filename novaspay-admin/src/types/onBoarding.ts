import { z } from 'zod';

export const onboardingSchema = z.object({
  id: z.number().optional(),
  clientName: z.string().nullable().optional(),
  accountErrorMessage: z.string().nullable().optional(),
  bankAccountStatusMsg: z.string().nullable().optional(),
  reason: z.string().nullable().optional(),
  clientId: z.any().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type OnBoarding = z.infer<typeof onboardingSchema>;
