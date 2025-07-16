import { Router, Status } from "@oak/oak";

import { supClient } from "../config/supabase.ts";
import { CreateAccountSchema } from "../validation/CreateAccountSchema.ts";
import { LoginSchema } from "../validation/LoginSchema.ts";
import { validate } from "../utils/validate.ts";
import { SupAuth } from "../auth/SupAuth.ts";
import { RefreshSchema } from "../validation/RefreshSchema.ts";
import { SendCodeSchema } from "../validation/SendCodeSchema.ts";
import { ResetPasswordSchema } from "../validation/ResetPassword.ts";

const router = new Router();

router.post("/create-account", async (ctx) => {
  const body = await ctx.request.body.json();

  const validation = validate({ data: body, schema: CreateAccountSchema });

  if (!validation.success) {
    ctx.response.body = validation;
    ctx.response.status = Status.UnprocessableEntity;
    return;
  }

  const response = await SupAuth.signup({ ...body, client: supClient });

  let status = Status.Created;

  if (!response.success) status = response.data.status;

  // This to avoid that the server keep the session open, but the JWT will be still valid
  await SupAuth.signOut({ client: supClient });

  ctx.response.body = response;
  ctx.response.status = status;
});

router.post("/login", async (ctx) => {
  const body = await ctx.request.body.json();

  const validation = validate({ data: body, schema: LoginSchema });

  if (!validation.success) {
    ctx.response.body = validation;
    ctx.response.status = Status.UnprocessableEntity;
    return;
  }

  const response = await SupAuth.signin({ ...body, client: supClient });

  let status = Status.Accepted;

  if (!response.success) status = response.data.status;

  // This to avoid that the server keep the session open, but the JWT will be still valid
  await SupAuth.signOut({ client: supClient });

  ctx.response.body = response;
  ctx.response.status = status;
});

router.post("/refresh", async (ctx) => {
  const body = await ctx.request.body.json();

  const validation = validate({ data: body, schema: RefreshSchema });

  if (!validation.success) {
    ctx.response.body = validation;
    ctx.response.status = Status.UnprocessableEntity;
    return;
  }

  const response = await SupAuth.refreshToken({ ...body, client: supClient });

  let status = Status.Accepted;

  if (!response.success) status = response.data.status;

  ctx.response.body = response;
  ctx.response.status = status;
});

router.post("/send-code", async (ctx) => {
  const body = await ctx.request.body.json();

  const validation = validate({ data: body, schema: SendCodeSchema });

  if (!validation.success) {
    ctx.response.body = validation;
    ctx.response.status = Status.UnprocessableEntity;
    return;
  }

  const response = await SupAuth.sendCodeToEmail({
    ...body,
    client: supClient,
  });

  ctx.response.body = response;
  ctx.response.status = response.data.status;
});

router.post("/reset-password", async (ctx) => {
  const body = await ctx.request.body.json();

  const validation = validate({ data: body, schema: ResetPasswordSchema });

  if (!validation.success) {
    ctx.response.status = Status.UnprocessableEntity;
    ctx.response.body = validation;
    return;
  }

  const validateCode = await SupAuth.verifyOTP({
    email: body.email,
    code: body.token,
    client: supClient,
  });

  if (!validateCode.success) {
    ctx.response.status = validateCode.data.status;
    ctx.response.body = validateCode;
    return;
  }

  const uid = validateCode.data.data?.user.id || "";

  const updatePasswordResponse = await SupAuth.updateUserPassword({
    uid,
    password: body.password,
    client: supClient,
  });

  if (!updatePasswordResponse.success) {
    ctx.response.status = updatePasswordResponse.data.status;
    ctx.response.body = updatePasswordResponse;
    return;
  }

  ctx.response.status = Status.OK;
  ctx.response.body = updatePasswordResponse;
});

router.get("/expense/:id", (ctx) => {
  console.log(ctx);
  ctx.response.body = "Hello deno world";
});

router.post("/expense", async (ctx) => {
  console.log(await ctx.request.body.json());
  ctx.response.body = { message: "success" };
});

export default router;
