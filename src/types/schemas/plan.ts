import { z } from "zod";
import { createApiResponseSchema } from "./common";

const PlanSchema = z.object({
    admin_agent_limit: z.number(),
    annual_price: z.string(),
    currency: z.string(),
    exclusive_user: z.object({}),
    extra_mau: z.number(),
    extra_mau_charge: z.string(),
    is_sku: z.boolean().nullable(),
    mau_limit: z.number(),
    max_wa_channel: z.number(),
    monthly_price: z.string(),
    name: z.string(),
    plan_group: z.string(),
    sku_expired_date: z.string().nullable(),
    subscription_date: z.string(),
    subscription_status: z.string(),
    subscription_type: z.string(),
    trial_remaining_days: z.number().nullable(),
    type: z.string(),
    usage_info: z.object({
        admin_agent_usage: z.number(),
        current_mau: z.number(),
        extra_mau: z.number(),
        extra_mau_charge: z.number(),
        mau_usage: z.number(),
    }),
})

export const PlaneResponseSchema = createApiResponseSchema(PlanSchema);

export type PlanData = z.infer<typeof PlanSchema>;
export type PlanResponse = z.infer<typeof PlaneResponseSchema>;