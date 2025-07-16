import { Application, Status } from "@oak/oak";
import purposeRouter from "./routes/purpose.ts";
import transactionRouter from "./routes/transaction.ts";
import accumulatedRouter from "./routes/accumulated.ts";
import { privateRoutes, regexPrivateRoutes } from "./routes/privateRoutes.ts";
import { validate } from "./auth/basic.ts"

const app = new Application();

app.use(async (ctx:any, next:any) => {
  const match = ctx.request.url.pathname.match(regexPrivateRoutes);
  const path = match ? match[0] : "";

  if (!privateRoutes.includes(path)) {
    await next();
    return;
  }

  const token = ctx.request.headers.get("Authorization") || "";

  const payload = validate(token.replace("Basic ", ""));

  if (payload) {
    ctx.state.user = { sub: payload }
    await next();
  } else {
    ctx.throw(Status.Unathorized, "Invalid Token")
  }
});

app.use(purposeRouter.routes());
app.use(transactionRouter.routes());
app.use(accumulatedRouter.routes());
app.use(accumulatedRouter.allowesMethods())

app.listen({ port: 5173 });
