import { z } from "https://deno.land/x/zod@v3.22.2/index.ts";

export const RefreshSchema = z.object({
  token: z.string().min(1, "The refresh token is required"),
});
