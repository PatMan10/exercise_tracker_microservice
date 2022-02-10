// urls
export enum URLPlaceHolder {
  USER_ID = ":userId",
}

export class URLs {
  static readonly WILD = "*";
  static readonly INDEX = "/";

  static readonly GET_USERS = `/api/users`;
  static readonly GET_EXERCISE_LOG =
    `/api/users/${URLPlaceHolder.USER_ID}/logs`;

  static readonly POST_USER = `/api/users`;
  static readonly POST_EXERCISE =
    `/api/users/${URLPlaceHolder.USER_ID}/exercises`;

  static postExercise = (userId: string): string =>
    URLs.POST_EXERCISE.replace(URLPlaceHolder.USER_ID, userId);

  static getExerciseLog = (userId: string): string =>
    URLs.GET_EXERCISE_LOG.replace(URLPlaceHolder.USER_ID, userId);
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
