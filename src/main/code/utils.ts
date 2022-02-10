// urls
export enum URLPlaceHolder {
  USER_ID = ":userId",
}

export class URLs {
  static readonly WILD = "*";
  static readonly INDEX = "/";
}

export class UserURLs {
  private static ROOT = "/api/users";

  static readonly GET_USERS = UserURLs.ROOT;
  static readonly GET_EXERCISE_LOG = UserURLs.ROOT +
    `/${URLPlaceHolder.USER_ID}/logs`;

  static readonly POST_USER = UserURLs.ROOT;
  static readonly POST_EXERCISE = UserURLs.ROOT +
    `/${URLPlaceHolder.USER_ID}/exercises`;

  static postExercise = (userId: string): string =>
    UserURLs.POST_EXERCISE.replace(URLPlaceHolder.USER_ID, userId);

  static getExerciseLog = (userId: string, params?: URLSearchParams): string =>
    UserURLs.GET_EXERCISE_LOG
      .replace(URLPlaceHolder.USER_ID, userId)
      .concat(params ? `?${params.toString()}` : "");
}

export class ErrorMessages {
  static readonly INTERNAL_SERVER_ERROR =
    "Uh oh, some unexpected error ocurred...";
}

// logger
class Logger {
  info(...data: unknown[]) {
    console.info(...data);
  }
  warn(...data: unknown[]) {
    console.warn(...data);
  }
  error(...data: unknown[]) {
    console.error(...data);
  }
}

export const logger = new Logger();
