import { z } from 'zod';

import { createApiResponseSchema } from './common';

const BillingPhoneNumberSchema = z.object({
  id: z.number().int(),
  user_id: z.number().int(),
  phone_number: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

const ProfileSchema = z.object({
  name: z.string().nullable(),
  avatar_url: z.string().nullable(),
  company_name: z.string().nullable(),
  address: z.string().nullable(),
  phone_number: z.string().nullable(),
  industry: z.string().nullable(),
  email_address: z.string().nullable(),
  billing_emails: z.array(z.string()),
  billing_phone_numbers: z.array(BillingPhoneNumberSchema).optional(),
  type: z.number().int(),
  last_password_update: z.string(),
  sdk_email: z.email(),
  email: z.email(),
  npwp_number: z.string().nullable(),
});

export const ProfileResponseSchema = createApiResponseSchema(ProfileSchema);

export type ProfileData = z.infer<typeof ProfileSchema>;
export type ProfileResponse = z.infer<typeof ProfileResponseSchema>;
