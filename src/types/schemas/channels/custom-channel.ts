import { z } from 'zod';

import { createApiResponseSchemaPagination } from '../common';

const CustomChannelSchema = z.object({
  app_id: z.number(),
  created_at: z.string(),
  id: z.number(),
  identifier_key: z.string(),
  is_active: z.boolean(),
  is_limit_character_enable: z.boolean(),
  is_reply_enable: z.boolean(),
  limit_character: z.number().nullable(),
  logo_url: z.string(),
  name: z.string().nullable(),
  updated_at: z.string(),
  use_channel_responder: z.boolean(),
  webhook_url: z.string(),
});

const CustomChannelListSchema = z.array(CustomChannelSchema);

export const CustomChannelResponseSchema =
  createApiResponseSchemaPagination(CustomChannelListSchema);

export type CustomChannel = z.infer<typeof CustomChannelSchema>;
export type CustomChannelList = z.infer<typeof CustomChannelListSchema>;
export type CustomChannelResponse = z.infer<typeof CustomChannelResponseSchema>;
