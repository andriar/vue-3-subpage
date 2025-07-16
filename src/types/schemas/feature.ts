import { z } from 'zod';
import { createApiResponseSchema } from './common';

const FeatureSchema: z.ZodType<{
    caption: string;
    feature_id: number;
    features: any[];
    id: number | null;
    level: number;
    name: string;
    section: string;
    status: number
}> = z.lazy(() => z.object({
    caption: z.string(),
    feature_id: z.number(),
    features: z.array(FeatureSchema),
    id: z.number().nullable(),
    level: z.number(),
    name: z.string(),
    section: z.string(),
    status: z.number()
}));

export const FeatureDataSchema = z.object({
    features: z.array(FeatureSchema)
})

export const FeatureResponseSchema = createApiResponseSchema(FeatureDataSchema);

export type Feature = z.infer<typeof FeatureSchema>;
export type FeatureData = z.infer<typeof FeatureDataSchema>;
export type FeatureResponse = z.infer<typeof FeatureResponseSchema>;