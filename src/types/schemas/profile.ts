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
  name: z.string(),
  avatar_url: z.string(),
  company_name: z.string(),
  address: z.string(),
  phone_number: z.string(),
  industry: z.string(),
  email_address: z.string(),
  billing_emails: z.array(z.string()),
  billing_phone_numbers: z.array(BillingPhoneNumberSchema).optional(),
  type: z.number().int(),
  last_password_update: z.string(),
  sdk_email: z.email(),
  email: z.email(),
  npwp_number: z.string(),
});

export const ProfileResponseSchema = createApiResponseSchema(ProfileSchema);

export type ProfileData = z.infer<typeof ProfileSchema>;
export type ProfileResponse = z.infer<typeof ProfileResponseSchema>;
