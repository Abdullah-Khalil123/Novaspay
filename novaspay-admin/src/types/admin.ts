import { z } from 'zod';

export const adminSchema = z.object({
  id: z.number().optional(),

  name: z.string().optional(),
  email: z.email(),
  password: z.string().optional(),
  lastActive: z.string().optional(),
  applications: z.array(z.any()).optional(),

  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Admin = z.infer<typeof adminSchema>;
