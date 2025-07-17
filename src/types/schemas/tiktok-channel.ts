import { z } from "zod";
import { createApiResponseSchemaPagination } from "./common";

const TiktokChannelSchema = z.object({
    access_token: z.string(),
    badge_url: z.string(),
    forward_enabled: z.boolean(),
    forward_url: z.string().nullable(),
    id: z.number(),
    is_active: z.boolean(),
    is_bot_enabled: z.boolean(),
    name: z.string(),
    source: z.string(),
    unique_id: z.string(),
    use_channel_responder: z.boolean(),
});

const TiktokChannelListSchema = z.array(TiktokChannelSchema);

export const TiktokChannelResponseSchema = createApiResponseSchemaPagination(TiktokChannelListSchema);

export type TiktokChannel = z.infer<typeof TiktokChannelSchema>;
export type TiktokChannelList = z.infer<typeof TiktokChannelListSchema>;
export type TiktokChannelResponse = z.infer<typeof TiktokChannelResponseSchema>;