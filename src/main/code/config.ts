import { logger } from "./utils.ts";

export enum EnvKey {
  ENV = "EXERCISE_TRACKER_SERVICE_ENV",
  PORT = "EXERCISE_TRACKER_SERVICE_PORT",
}

export enum Env {
  DEV = "dev",
  PROD = "prod",
}

const env = ((): Env => {
  switch (Deno.env.get(EnvKey.ENV)) {
    case Env.PROD:
      return Env.PROD;

    default:
      return Env.DEV;
  }
})();

const port = Number(Deno.env.get(EnvKey.PORT)) || 8000;

export class Config {
  constructor(
    readonly ENV: Env = env,
    readonly PORT: number = port,
    readonly BASE_URL: string = "http://localhost:" + port,
  ) {}

  display() {
    logger.info(`ENV:\t\t${this.ENV}`);
    logger.info(`PORT:\t\t${this.PORT}`);
    logger.info(`BASE_URL:\t${this.BASE_URL}`);
  }
}

export const getConfig = (env: Env) => {
  switch (env) {
    case Env.PROD:
      return new Config(
        undefined,
        undefined,
        "https://pm10-exercise-tracker-service.deno.dev",
      );

    default:
      return new Config();
  }
};

export default getConfig(env);
