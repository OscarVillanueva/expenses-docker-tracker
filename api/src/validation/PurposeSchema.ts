import { z } from "https://deno.land/x/zod@v3.22.2/mod.ts";

export const PurposeSchema = z.object({
  name: z.string().min(3, "The name must be at least 5 characters"),
});
