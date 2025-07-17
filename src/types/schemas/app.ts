import { z } from 'zod';

import { createApiResponseSchema } from './common';

const userSchema = z.object({
  expiration_day: z.number().int(),
  expired_on: z.number().int(),
  id: z.number().int(),
  last_password_update: z.iso.datetime(),
});

// Define the main schema for the application object
const appSchema = z.object({
  app_code: z.string(),
  bot_webhook_url: z.string(),
  created_at: z.iso.datetime({ offset: true, local: true }),
  id: z.number().int(),
  is_active: z.boolean(),
  is_bot_enabled: z.boolean(),
  is_sessional: z.boolean(),
  name: z.string(),
  paid_channel_approved: z.boolean().nullable(), // Can be boolean or null
  secret_key: z.string(),
  use_2fa: z.boolean(),
  user: userSchema, // Use the defined user schema
});

export const AppResponseSchema = createApiResponseSchema(appSchema);

export type AppSchemaType = z.infer<typeof appSchema>;
