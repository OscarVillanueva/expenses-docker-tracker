import z from "https://deno.land/x/zod@v3.22.2/index.ts";

export const ResetPasswordSchema = z.object({
  email: z.string().email("The email is required"),
  token: z.string().min(1, "The token is required"),
  password: z.string().min(1, "Password must be at least 6 characters"),
});
