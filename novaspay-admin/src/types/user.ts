import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 6 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

const notification_settings = z.object({
  email_notifications: z.any().optional(),
  order_updates: z.any().optional(),
  promotional_emails: z.any().optional(),
  security_alerts: z.any().optional(),
  weekly_newsletter: z.any().optional(),
});

export const userSchema = z.object({
  id: z.number().optional(),
  email: z.string().email().optional(),
  nickname: z.string().nullable().optional(),
  avatar: z.any().optional(),
  status: z.string().optional(),
  vip_level: z.string().optional(),
  balance: z.string().optional(),
  balance_raw: z.string().optional(),
  phone: z.string().nullable().optional(),
  phone_verified_at: z.string().nullable().optional(),
  email_verified_at: z.string().nullable().optional(),
  discord: z.string().nullable().optional(),
  telegram: z.string().nullable().optional(),
  whatsapp: z.string().nullable().optional(),
  preferred_currency: z.string().optional(),
  timezone: z.string().optional(),
  language: z.string().optional(),
  two_factor_enabled: z.any().optional(),
  referrer_id: z.number().nullable().optional(),
  referral_code: z.string().nullable().optional(),
  notification_settings: notification_settings.optional(),
  last_login_at: z.string().nullable().optional(),
  vip_expires_at: z.string().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

export const fundSchema = z.object({
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Amount must be a positive number',
  }),
  type: z.enum(['credit', 'debit']),
  reason: z.string().min(3, 'Reason is required'),
});

export type FundForm = z.infer<typeof fundSchema>;

// ---------------- USER TRANSACTION  ----------------

export const transactionSchema = z.object({
  id: z.number(),
  transaction_id: z.string(),
  type: z.string(), // e.g. "admin_adjustment"
  status: z.string(), // e.g. "completed"
  amount: z.string(), // formatted amount: "$23.00"
  amount_raw: z.string(), // raw numeric string: "23.00"
  balance_before: z.string(),
  balance_after: z.string(),
  currency: z.string(),
  description: z.string().nullable().optional(),
  payment_method: z.string().nullable().optional(),
  payment_reference: z.string().nullable().optional(),
  metadata: z
    .object({
      adjustment_type: z.string().optional(), // e.g. "credit"
      admin_reason: z.string().optional(),
    })
    .passthrough()
    .optional(),
  completed_at: z.string().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Transaction = z.infer<typeof transactionSchema>;
