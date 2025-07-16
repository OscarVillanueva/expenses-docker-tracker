import { z } from "https://deno.land/x/zod@v3.22.2/mod.ts";

export const AccumulatedSchema = z.object({
  name: z.string().min(3, "The name must be at least 5 characters"),
  total: z.number().min(1, "The minimum amount is 1"),
});
