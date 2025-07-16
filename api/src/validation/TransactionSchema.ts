import { z } from "https://deno.land/x/zod@v3.22.2/mod.ts";

export const TransactionSchema = z.object({
  date: z.string().datetime({ offset: true }),
  is_expense: z.boolean(),
  name: z.string().min(3, "The expense name at least 3 characters"),
  amount: z.number().min(1, "The minimum amount is 1"),
  is_cash: z.boolean(),
  included_in: z
    .number()
    .int("Should be included in a purpose")
    .min(1, "Should be included in a purpose"),
});
