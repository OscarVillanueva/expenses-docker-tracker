import { Application, Status } from "@oak/oak";
import router from "./routes/router.ts";
import purposeRouter from "./routes/purpose.ts";
import transactionRouter from "./routes/transaction.ts";
import accumulatedRouter from "./routes/accumulated.ts";
import { privateRoutes, regexPrivateRoutes } from "./routes/privateRoutes.ts";
import { jwt } from "./auth/jwt.ts";

const app = new Application();

app.use(async (ctx, next) => {
  const match = ctx.request.url.pathname.match(regexPrivateRoutes);
  const path = match ? match[0] : "";

  if (!privateRoutes.includes(path)) {
    await next();
    return;
  }

  const token = ctx.request.headers.get("Authorization") || "";

  const payload = await jwt.validate(token);

  if (payload) {
    ctx.state.user = payload;
    await next();
  } else {
    ctx.response.status = Status.Unauthorized;
    ctx.response.body = {
      success: false,
      data: {
        message: "Invalid token",
        status: Status.Unauthorized,
      },
    };
  }
});

app.use(router.routes());
app.use(purposeRouter.routes());
app.use(transactionRouter.routes());
app.use(accumulatedRouter.routes());
app.use(router.allowedMethods());

app.listen({ port: 5173 });
