import { z } from 'zod';

// Schema for Pagination
export const PaginationSchema = z.object({
  page: z.number().int().min(0),
  limit: z.number().int().min(0),
  total_page: z.number().int().min(0),
  total: z.number().int().min(0),
});

// Schema for Qiscus Channel
export const QiscusChannelSchema = z.object({
  id: z.number().int().positive(),
  is_active: z.boolean(),
  app_code: z.string().min(1),
  name: z.string().min(1),
  badge_url: z.string().url().nullable(),
  is_secure: z.boolean(),
  secret_key: z.string().min(1).nullable(),
  widget_version: z.string(),
});

// Schema for Response API
export const QiscusResponseSchema = z.object({
  data: z.array(QiscusChannelSchema),
  meta: PaginationSchema,
  status: z.number().int().min(0),
});

// Schema for parameter fetch
export const FetchQiscusParamsSchema = z
  .object({
    page: z.number().int().min(0).optional(),
    limit: z.number().int().min(1).max(100).optional(),
    search: z.string().optional(),
  })
  .optional();

// Schema for Create Qiscus Channel
export const CreateQiscusChannelSchema = z.object({
  badge_url: z.string().url(),
  is_active: z.boolean(),
  is_secure: z.boolean(),
  is_secure_toc: z.boolean(),
  name: z.string().min(1),
});

// Schema for Update Qiscus Channel
export const UpdateQiscusChannelSchema = z.object({
  id: z.number().int().positive(),
  badge_url: z.string().url().optional(),
  is_active: z.boolean().optional(),
  is_secure: z.boolean().optional(),
  name: z.string().min(1).optional(),
});

// Export types from schema
export type QiscusChannel = z.infer<typeof QiscusChannelSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;
export type QiscusResponse = z.infer<typeof QiscusResponseSchema>;
export type FetchQiscusParams = z.infer<typeof FetchQiscusParamsSchema>;
export type CreateQiscusChannel = z.infer<typeof CreateQiscusChannelSchema>;
export type UpdateQiscusChannel = z.infer<typeof UpdateQiscusChannelSchema>;
