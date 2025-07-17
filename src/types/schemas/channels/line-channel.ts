import { z } from "zod";
import { createApiResponseSchemaPagination } from "../common";

const LineChannelSchema = z.object({
    access_token: z.string(),
    badge_url: z.string(),
    id: z.number(),
    is_active: z.boolean(),
    name: z.string(),
    secret_key: z.string(),
    webhook_url: z.string(),
});

const LineChannelListSchema = z.array(LineChannelSchema);

export const LineChannelResponseSchema = createApiResponseSchemaPagination(LineChannelListSchema);

export type LineChannel = z.infer<typeof LineChannelSchema>;
export type LineChannelList = z.infer<typeof LineChannelListSchema>;
export type LineChannelResponse = z.infer<typeof LineChannelResponseSchema>;