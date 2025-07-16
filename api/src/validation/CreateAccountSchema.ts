import { z } from "https://deno.land/x/zod@v3.22.2/mod.ts";

export const CreateAccountSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
