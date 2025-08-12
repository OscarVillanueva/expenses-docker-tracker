import { Router, Status } from "@oak/oak";
import * as uuid from "jsr:@std/uuid";
import { TransactionManager } from "../db/TransactionManager.ts";
import { validate } from "../utils/validate.ts";
import { TransactionSchema } from "../validation/TransactionSchema.ts";

const router = new Router();

router.get("/transaction", async (ctx: any) => {
  const { user } = ctx.state;

  const response = await TransactionManager.get({
    userID: user.sub,
  });

  ctx.response.status = response.data.status;
  ctx.response.body = response;
});

router.post("/transaction", async (ctx: any) => {
  const body = await ctx.request.body.json();
  const { user } = ctx.state;

  const validation = validate({ data: body, schema: TransactionSchema });

  if (!validation.success) {
    ctx.response.body = validation;
    ctx.response.status = validation.data.status;
    return;
  }

  const response = await TransactionManager.insert({
    transaction: body,
    userID: user.sub,
  });

  ctx.response.status = response.data.status;
  ctx.response.body = response;
});

router.delete("/transaction/:id", async (ctx: any) => {
  if(!uuid.validate(ctx.params.id)) {
    ctx.response.status = Status.BadRequest
    ctx.response.body = "Invalid uuid"
    return
  }

  const { user } = ctx.state;

  const response = await TransactionManager.delete({
    transactionID: ctx.params.id,
    userID: user.sub,
  });

  ctx.response.status = response.data.status;
  ctx.response.body = response;
});

export default router;
