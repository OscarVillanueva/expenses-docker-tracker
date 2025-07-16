import { Router } from "@oak/oak";
import { supClient } from "../config/supabase.ts";
import { TransactionManager } from "../db/TransactionManager.ts";
import { validate } from "../utils/validate.ts";
import { TransactionSchema } from "../validation/TransactionSchema.ts";

const router = new Router();

router.get("/transaction", async (ctx) => {
  const { user } = ctx.state;

  const response = await TransactionManager.get({
    userID: user.sub,
    client: supClient,
  });

  ctx.response.status = response.data.status;
  ctx.response.body = response;
});

router.post("/transaction", async (ctx) => {
  const body = await ctx.request.body.json();
  const { user } = ctx.state;

  const validation = validate({ data: body, schema: TransactionSchema });

  if (!validation.success) {
    ctx.response.body = validation;
    ctx.response.status = validation.data.status;
    return;
  }

  const response = await TransactionManager.insert({
    client: supClient,
    transaction: body,
    userID: user.sub,
  });

  ctx.response.status = response.data.status;
  ctx.response.body = response;
});

router.delete("/transaction/:id", async (ctx) => {
  const id = isNaN(Number(ctx.params.id)) ? 0 : Number(ctx.params.id);
  const { user } = ctx.state;

  const response = await TransactionManager.delete({
    transactionID: id,
    userID: user.sub,
    client: supClient,
  });

  ctx.response.status = response.data.status;
  ctx.response.body = response;
});

export default router;
