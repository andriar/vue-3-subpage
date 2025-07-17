import { z } from "zod";
import { createApiResponseSchemaPagination } from "./common";

const FbChannelSchema = z.object({
   badge_url: z.string(),
   id: z.number(),
   is_active: z.boolean(),
   name: z.string(),
   page_id: z.string(),
});

const FbChannelListSchema = z.array(FbChannelSchema);

export const FbChannelResponseSchema = createApiResponseSchemaPagination(FbChannelListSchema);

export type FbChannel = z.infer<typeof FbChannelSchema>;
export type FbChannelList = z.infer<typeof FbChannelListSchema>;
export type FbChannelResponse = z.infer<typeof FbChannelResponseSchema>;