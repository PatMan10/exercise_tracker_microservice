import { Application, cors } from "../../deps.ts";
import { errorHandler, notFound, reqLogger, reqTimer } from "./middleware.ts";
import controller from "./controller.ts";
import config from "./config.ts";
import { logger } from "./utils.ts";

const app = new Application();

app.use(errorHandler);
app.use(reqLogger);
app.use(reqTimer);
app.use(cors());
app.use(controller.routes());
app.use(controller.allowedMethods());
app.use(notFound);

export default app;

if (import.meta.main) {
  app.addEventListener("listen", () => {
    logger.info(`timestamp service running...`);
    config.display();
  });
  app.listen({ port: config.PORT });
}
