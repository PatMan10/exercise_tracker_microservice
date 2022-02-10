// urls
export enum URLPlaceHolder {
  ID = ":_id",
}

export class URLs {
  static readonly WILD = "*";
  static readonly INDEX = "/";

  static readonly GET_USERS = `/api/users`;
  static readonly POST_NEW_USER = `/api/users`;
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
