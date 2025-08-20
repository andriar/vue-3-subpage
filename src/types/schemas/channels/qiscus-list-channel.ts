import { z } from 'zod';

import { createApiResponseSchema, createApiResponseSchemaPagination } from '../common';

export const QiscusChannelSchema = z.object({
  app_code: z.string(),
  badge_url: z.string().nullable(),
  id: z.number(),
  is_active: z.boolean(),
  is_secure: z.boolean(),
  secret_key: z.string(),
  name: z.string().nullable(),
  widget_version: z.string().nullable(),
});

export const QiscusChannelListSchema = z.array(QiscusChannelSchema);

export const QiscusChannelResponseSchema =
  createApiResponseSchemaPagination(QiscusChannelListSchema);

// --- Validations for enhance conversation security ---
const QiscusChannelDataSchema = z.object({ QiscusChannelSchema });

export const QiscusChannelDataResponseSchema = createApiResponseSchema(QiscusChannelDataSchema);

export type QiscusChannel = z.infer<typeof QiscusChannelSchema>;
export type QiscusChannelList = z.infer<typeof QiscusChannelListSchema>;
export type QiscusChannelData = z.infer<typeof QiscusChannelDataSchema>;
export type QiscusChannelResponse = z.infer<typeof QiscusChannelResponseSchema>;
