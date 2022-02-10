import { Context, ReasonPhrases, StatusCodes } from "../../deps.ts";
import { ErrorMessages, logger } from "./utils.ts";

type MiddlewareContext = Context<Record<string, any>, Record<string, any>>;
type NextFun = () => Promise<unknown>;

export async function parseBody(ctx: MiddlewareContext) {
  const contentType: string = ctx.request.headers.get("content-type") || "";
  const body = await ctx.request.body().value;

  switch (contentType) {
    case "application/x-www-form-urlencoded": {
      const data = (body as URLSearchParams);
      const json: any = {};
      data.forEach((v, k) => {
        json[k] = v;
      });
      return json;
    }

    default:
      return body;
  }
}

export async function reqLogger(
  ctx: MiddlewareContext,
  next: NextFun,
) {
  await next();
  const rt = ctx.response.headers.get("x-response-time");
  logger.info(
    `${ctx.request.method} ${ctx.request.url} ${ctx.response.status} - ${rt}`,
  );
}

export async function reqTimer(
  ctx: MiddlewareContext,
  next: NextFun,
) {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("x-response-time", `${ms}ms`);
}

export async function errorHandler(
  ctx: MiddlewareContext,
  next: NextFun,
) {
  try {
    await next();
  } catch (err) {
    logger.error(err.message, err);
    ctx.response.status = StatusCodes.INTERNAL_SERVER_ERROR.valueOf();
    ctx.response.body = { error: ErrorMessages.INTERNAL_SERVER_ERROR };
  }
}

export function notFound(
  ctx: MiddlewareContext,
) {
  ctx.response.headers.set("content-type", "text/html");
  ctx.response.status = StatusCodes.NOT_FOUND.valueOf();
  ctx.response.body = ReasonPhrases.NOT_FOUND;
}
