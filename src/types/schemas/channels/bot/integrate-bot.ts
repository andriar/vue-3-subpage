import { z } from 'zod';

import { createApiResponseSchema } from '../../common';

const IntegrateBotSchema = z.object({
  id: z.number(),
  name: z.string(),
  app_code: z.string(),
  secret_key: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  bot_webhook_url: z.url(),
  is_bot_enabled: z.boolean(),
  allocate_agent_webhook_url: z.url(),
  is_allocate_agent_webhook_enabled: z.boolean(),
  mark_as_resolved_webhook_url: z.url(),
  is_mark_as_resolved_webhook_enabled: z.boolean(),
  is_mobile_pn_enabled: z.boolean(),
  is_active: z.boolean(),
  is_sessional: z.boolean(),
  is_agent_allocation_enabled: z.boolean(),
  is_agent_takeover_enabled: z.boolean(),
  is_token_expiring: z.boolean(),
  paid_channel_approved: z.null().nullable(),
  use_latest: z.boolean(),
  free_sessions: z.number(),
  is_force_send_bot: z.boolean(),
  app_joined_status: z.number(),
  is_archieved: z.null().nullable(),
  archieve_status: z.null().nullable(),
  search_using_engine: z.boolean(),
  use_2fa: z.boolean(),
});

const IntegrateBotDataSchema = z.object({
  app: IntegrateBotSchema,
});
export const IntegrateBotResponseSchema = createApiResponseSchema(IntegrateBotDataSchema);

export type IntegrateBot = z.infer<typeof IntegrateBotSchema>;
export type IntegrateBotData = z.infer<typeof IntegrateBotDataSchema>;
export type IntegrateBotResponse = z.infer<typeof IntegrateBotResponseSchema>;
