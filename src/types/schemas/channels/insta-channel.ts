import { z } from 'zod';

import { createApiResponseSchemaPagination } from '../common';

const InstaChannelSchema = z.object({
  badge_url: z.string(),
  id: z.number(),
  ig_id: z.string(),
  is_active: z.boolean(),
  name: z.string().nullable(),
  page_id: z.string(),
  private_replies_enabled: z.boolean(),
  private_replies_text: z.string().nullable(),
});

const InstaChannelListSchema = z.array(InstaChannelSchema);

export const InstaChannelResponseSchema = createApiResponseSchemaPagination(InstaChannelListSchema);

export type InstaChannel = z.infer<typeof InstaChannelSchema>;
export type InstaChannelList = z.infer<typeof InstaChannelListSchema>;
export type InstaChannelResponse = z.infer<typeof InstaChannelResponseSchema>;
