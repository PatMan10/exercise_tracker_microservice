import { Bson } from "../../deps.ts";

export interface IUser {
  readonly _id?: string;
  username: string;
}

export class User {
  constructor(
    readonly _id: string = new Bson.ObjectID().toHexString(),
    public username: string,
  ) {
  }
}

const users = new Map<string, User>();

export const saveUser = (user: User): void => {
  users.set(user._id, user);
};

export const getUser = (_id: string): User | undefined => users.get(_id);

export const deleteUser = (_id: string): void => {
  users.delete(_id);
};
