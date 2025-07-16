import { z } from "zod";
import { createApiResponseSchemaPagination } from "./common";

const WhatsappChannelSchema = z.object({
    allocate_wa_call_webhook_url: z.string().nullable(),
    badge_url: z.string().nullable(),
    base_url: z.string(),
    business_id: z.string().nullable(),
    business_verification_status: z.string().nullable(),
    currency: z.string().nullable(),
    eligible_wa_call: z.boolean(),
    encoded_token: z.string(),
    forward_enabled: z.boolean(),
    forward_url: z.string().nullable(),
    id: z.number(),
    is_active: z.boolean(),
    is_allocate_wa_call_webhook_enabled: z.boolean(),
    is_auth_international: z.boolean(),
    is_auto_responder_enabled: z.boolean(),
    is_bot_enabled: z.boolean(),
    is_coex: z.boolean(),
    is_mmlite: z.boolean(),
    is_on_cloud: z.boolean(),
    is_postpaid: z.boolean().nullable(),
    is_ssl_enabled: z.boolean(),
    is_template_optimized: z.boolean(),
    name: z.string(),
    phone_number: z.string(),
    phone_number_id: z.string().nullable(),
    phone_number_status: z.string().nullable(),
    platform: z.string(),
    pricing_model: z.string(),
    primary_business_location: z.string().nullable(),
    read_enabled: z.boolean().nullable(),
});

const WhatsappChannelListSchema = z.array(WhatsappChannelSchema);

export const WhatsappChannelResponseSchema = createApiResponseSchemaPagination(WhatsappChannelListSchema);

export type WhatsappChannel = z.infer<typeof WhatsappChannelSchema>;
export type WhatsappChannelList = z.infer<typeof WhatsappChannelListSchema>;
export type WhatsappChannelResponse = z.infer<typeof WhatsappChannelResponseSchema>;