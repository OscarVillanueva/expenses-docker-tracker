import { Router, Status } from "@oak/oak";
import * as uuid from "jsr:@std/uuid";
import { AccumulatedManager } from "../db/AccumulatedManager.ts";
import { validate } from "../utils/validate.ts";
import { AccumulatedSchema } from "../validation/AccumulatedSchema.ts";

const router = new Router();

router.get("/accumulated", async (ctx) => {
  const { user } = ctx.state;

  const response = await AccumulatedManager.get({
    userID: user.sub,
  });

  ctx.response.status = response.data.status;
  ctx.response.body = response;
});

router.post("/accumulated", async (ctx) => {
  const { user } = ctx.state;
  const body = await ctx.request.body.json();

  const validation = validate({ data: body, schema: AccumulatedSchema });

  if (!validation.success) {
    ctx.response.body = validation;
    ctx.response.status = Status.UnprocessableEntity;
    return;
  }

  const response = await AccumulatedManager.insert({
    name: body.name,
    total: body.total,
    userID: user.sub,
  });

  ctx.response.status = response.data.status;
  ctx.response.body = response;
});

router.delete("/accumulated/:id", async (ctx) => {
  if(!uuid.validate(ctx.params.id)) {
    ctx.response.status = Status.BadRequest
    ctx.response.body = "Invalid uuid"
    return
  }

  const id = ctx.params.id;
  const { user } = ctx.state;

  const response = await AccumulatedManager.delete({
    accumulatedID: id,
    userID: user.sub,
  });

  ctx.response.status = response.data.status;
  ctx.response.body = response;
});

router.put("/accumulated/:id", async (ctx) => {
  if(!uuid.validate(ctx.params.id)) {
    ctx.response.status = Status.BadRequest
    ctx.response.body = "Invalid uuid"
    return
  }

  const { user } = ctx.state;
  const body = await ctx.request.body.json();

  const validation = validate({ data: body, schema: AccumulatedSchema });

  if (!validation.success) {
    ctx.response.body = validation;
    ctx.response.status = Status.UnprocessableEntity;
    return;
  }

  const response = await AccumulatedManager.update({
    name: body.name,
    total: body.total,
    accumulatedID: ctx.params.id,
    userID: user.sub,
  });

  ctx.response.status = response.data.status;
  ctx.response.body = response;
});

export default router;
