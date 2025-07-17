import { z } from 'zod';

import { createApiResponseSchema } from '../../common';

const ForceSendBotSchema = z.object({
  is_force_send_bot: z.boolean(),
});

const ForceSendBotDataSchema = z.object({
  bot: ForceSendBotSchema,
});
export const ForceSendBotResponseSchema = createApiResponseSchema(ForceSendBotDataSchema);

export type ForceSendBot = z.infer<typeof ForceSendBotSchema>;
export type ForceSendBotData = z.infer<typeof ForceSendBotDataSchema>;
export type ForceSendBotResponse = z.infer<typeof ForceSendBotResponseSchema>;
