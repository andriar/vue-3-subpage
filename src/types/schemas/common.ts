import { z } from 'zod';

/**
 * Creates a generic API response schema for object-based data schemas
 *
 * @template T - The shape of the data object
 * @param dataSchema - Zod object schema for the data field
 * @returns Zod schema for API response with data and status fields
 *
 * @example
 * ```typescript
 * const userSchema = z.object({ id: z.number(), name: z.string() });
 * const userResponseSchema = createApiResponseSchema(userSchema);
 * ```
 */
export const createApiResponseSchema = <T extends z.ZodRawShape>(dataSchema: z.ZodObject<T>) => {
  return z.object({
    data: dataSchema,
    status: z.number().optional(),
  });
};

/**
 * Creates a generic API response schema for any data structure
 *
 * @template T - Any Zod type
 * @param dataSchema - Zod schema for the data field (can be any type)
 * @returns Zod schema for API response with data and status fields
 *
 * @example
 * ```typescript
 * const stringArraySchema = z.array(z.string());
 * const responseSchema = createApiResponseSchemaGeneric(stringArraySchema);
 * ```
 */
export const createApiResponseSchemaGeneric = <T extends z.ZodTypeAny>(dataSchema: T) => {
  return z.object({
    data: dataSchema,
    status: z.number(),
  });
};

// Schema for meta pagination
export const MetaPaginationSchema = z.object({
  limit: z.number(),
  page: z.number(),
  total: z.number(),
  total_page: z.number(),
});

/**
 * Creates an extended API response schema with additional common fields
 *
 * @template T - Any Zod type
 * @param dataSchema - Zod schema for the data field
 * @returns Zod schema for extended API response with data, status, message, and meta fields
 *
 * @example
 * ```typescript
 * const userListSchema = z.array(z.object({ id: z.number(), name: z.string() }));
 * const extendedResponseSchema = createApiResponseSchemaExtended(userListSchema);
 * ```
 */
export const createApiResponseSchemaPagination = <T extends z.ZodTypeAny>(dataSchema: T) => {
  return z.object({
    data: dataSchema,
    meta: MetaPaginationSchema,
    status: z.number(),
  });
};

// Extract type from schema for use as interface
export type MetaPagination = z.infer<typeof MetaPaginationSchema>;
/**
 * Generic type for basic API responses
 *
 * @template T - The type of the data field
 */
export type ApiResponse<T> = {
  data: T;
  status: number;
};

/**
 * Generic type for extended API responses with additional metadata
 *
 * @template T - The type of the data field
 */
export type ApiResponseExtended<T> = {
  data: T;
  status: number;
  message?: string;
  meta?: {
    page?: number;
    per_page?: number;
    total?: number;
  };
};
