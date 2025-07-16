import { z } from "https://deno.land/x/zod@v3.22.2/index.ts";

export const SendCodeSchema = z.object({
  email: z.string().email("The email is required"),
});
