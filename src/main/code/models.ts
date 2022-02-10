import { Bson } from "../../deps.ts";

export interface IUser {
  readonly _id?: string;
  username: string;
}

export class User {
  constructor(
    readonly _id: string = new Bson.ObjectID().toHexString(),
    public username: string,
  ) {}
}

const users = new Map<string, User>();
export const AI = new User(undefined, "AI");
users.set(AI._id, AI);

export const saveUser = (user: User): void => {
  users.set(user._id, user);
};

export const getUser = (_id: string): User | undefined => users.get(_id);

export const getUsers = (): User[] => Array.from(users, ([_k, v]) => v);

export const deleteUser = (_id: string): void => {
  users.delete(_id);
};

export interface IExercise extends IUser {
  description: string;
  duration: number;
  date: string;
}

export class Exercise {
  constructor(
    public description: string,
    public duration: number,
    public date: string = new Date().toDateString(),
  ) {}
}

const exercises = new Map<string, Exercise[]>();

export const saveExercise = (userId: string, exercise: Exercise): void => {
  const userExercises = exercises.get(userId);
  if (!userExercises) {
    exercises.set(userId, [exercise]);
    return;
  }
  userExercises.push(exercise);
};
