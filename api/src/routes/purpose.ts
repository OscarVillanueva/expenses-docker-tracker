import { Router, Status } from "@oak/oak";
import * as uuid from "jsr:@std/uuid";
import { PurposeManager } from "../db/PurposeManager.ts";
import { PurposeSchema } from "../validation/PurposeSchema.ts";
import { validate } from "../utils/validate.ts";

const router = new Router();

router.get("/purpose", async (ctx) => {
  const { user } = ctx.state;

  const response = await PurposeManager.get({
    userID: user.sub,
  });

  ctx.response.status = response.data.status;
  ctx.response.body = response;
});

router.get("/purpose/:id/transaction", async (ctx) => {
  if(!uuid.validate(ctx.params.id)) {
    ctx.response.status = Status.BadRequest
    ctx.response.body = "Invalid uuid"
    return
  }

  const { user } = ctx.state;

  const response = await PurposeManager.transactions({
    purposeID: ctx.params.id,
    userID: user.sub
  })

  ctx.response.status = response.data.status;
  ctx.response.body = response;
})

router.post("/purpose", async (ctx) => {
  const { user } = ctx.state;
  const body = await ctx.request.body.json();

  const validation = validate({ data: body, schema: PurposeSchema });

  if (!validation.success) {
    ctx.response.body = validation;
    ctx.response.status = Status.UnprocessableEntity;
    return;
  }

  const response = await PurposeManager.insert({
    name: body.name,
    userID: user.sub,
  });

  ctx.response.status = response.data.status;
  ctx.response.body = response;
});

router.delete("/purpose/:id", async (ctx) => {
  if(!uuid.validate(ctx.params.id)) {
    ctx.response.status = Status.BadRequest
    ctx.response.body = "Invalid uuid"
    return
  }

  const { user } = ctx.state;

  const response = await PurposeManager.delete({
    purposeID: ctx.params.id,
    userID: user.sub,
  });

  ctx.response.status = response.data.status;
  ctx.response.body = response;
});

router.put("/purpose/:id", async (ctx) => {
  if(!uuid.validate(ctx.params.id)) {
    ctx.response.status = Status.BadRequest
    ctx.response.body = "Invalid uuid"
    return
  }

  const { user } = ctx.state;
  const body = await ctx.request.body.json();

  const validation = validate({ data: body, schema: PurposeSchema });

  if (!validation.success) {
    ctx.response.body = validation;
    ctx.response.status = Status.UnprocessableEntity;
    return;
  }

  const response = await PurposeManager.update({
    name: body.name,
    purposeID: ctx.params.id,
    userID: user.sub,
  });

  ctx.response.status = response.data.status;
  ctx.response.body = response;
});

export default router;
