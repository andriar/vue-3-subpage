import { type Ref } from 'vue';
import { z } from 'zod';

export const handleComposableError = (
  err: unknown,
  errorRef: Ref<Error | null>,
  context: string = 'Error'
) => {
  // Log all errors for debugging
  console.error(`${context}:`, err);

  // Handle Zod validation errors
  if (err instanceof z.ZodError) {
    console.error('Validation error:', err.issues);
    errorRef.value = new Error(`Validation failed: ${err.issues.map((e) => e.message).join(', ')}`);
  } else {
    errorRef.value = err instanceof Error ? err : new Error('An unknown error occurred');
  }
};
