import { z } from 'zod';

import { createApiResponseSchema } from '../../common';

export const BotDataSchema = z.object({
  bot_webhook_url: z.url().nullable(),
  is_bot_enabled: z.boolean(),
  is_force_send_bot: z.boolean(),
});

export const BotResponseSchema = createApiResponseSchema(BotDataSchema);

export type BotData = z.infer<typeof BotDataSchema>;
export type BotResponse = z.infer<typeof BotResponseSchema>;
