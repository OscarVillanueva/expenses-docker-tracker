import { Router, Status } from "@oak/oak";
import { PurposeManager } from "../db/PurposeManager.ts";
import { supClient } from "../config/supabase.ts";
import { PurposeSchema } from "../validation/PurposeSchema.ts";
import { validate } from "../utils/validate.ts";

const router = new Router();

router.get("/purpose", async (ctx) => {
  const { user } = ctx.state;

  const response = await PurposeManager.get({
    userID: user.sub,
    client: supClient,
  });

  ctx.response.status = response.data.status;
  ctx.response.body = response;
});

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
    client: supClient,
  });

  ctx.response.status = response.data.status;
  ctx.response.body = response;
});

router.delete("/purpose/:id", async (ctx) => {
  const id = isNaN(Number(ctx.params.id)) ? 0 : Number(ctx.params.id);
  const { user } = ctx.state;

  const response = await PurposeManager.delete({
    purposeID: id,
    userID: user.sub,
    client: supClient,
  });

  ctx.response.status = response.data.status;
  ctx.response.body = response;
});

router.put("/purpose/:id", async (ctx) => {
  const { user } = ctx.state;
  const body = await ctx.request.body.json();
  const id = isNaN(Number(ctx.params.id)) ? 0 : Number(ctx.params.id);

  const validation = validate({ data: body, schema: PurposeSchema });

  if (!validation.success) {
    ctx.response.body = validation;
    ctx.response.status = Status.UnprocessableEntity;
    return;
  }

  const response = await PurposeManager.update({
    client: supClient,
    name: body.name,
    purposeID: id,
    userID: user.sub,
  });

  ctx.response.status = response.data.status;
  ctx.response.body = response;
});

export default router;
