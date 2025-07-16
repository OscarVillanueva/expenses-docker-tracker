import { z } from "https://deno.land/x/zod@v3.22.2/mod.ts";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
