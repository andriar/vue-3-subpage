import { z } from 'zod';

import { createApiResponseSchema, createApiResponseSchemaPagination } from '../../common';

export const TelegramChannelSchema = z.object({
  badge_url: z.string().nullable(),
  bot_token: z.string(),
  id: z.number(),
  is_active: z.boolean(),
  username: z.string(),
  name: z.string().nullable(),
  webhook_url: z.string().nullable(),
});

// ----- Validation for fetch telegram channel -----
export const TelegramChannelListSchema = z.array(TelegramChannelSchema);

export const TelegramChannelResponseSchema =
  createApiResponseSchemaPagination(TelegramChannelListSchema);

// ----- Validation for update telegram channel -----
export const TelegramChannelUpdateSchema = z.object({
  telegram_channel: TelegramChannelSchema,
});

export const TelegramChannelUpdateResponseSchema = createApiResponseSchema(
  TelegramChannelUpdateSchema
);

export type TelegramChannel = z.infer<typeof TelegramChannelSchema>;
export type TelegramChannelList = z.infer<typeof TelegramChannelListSchema>;
export type TelegramChannelResponse = z.infer<typeof TelegramChannelResponseSchema>;
