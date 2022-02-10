import { Bson } from "../../deps.ts";

export interface iUser {
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

export interface iExercise extends iUser {
  description: string;
  duration: number;
  date: string;
}

export interface iExerciseLog extends iUser {
  count: number;
  log: Exercise[];
}

export class Exercise {
  constructor(
    public description: string,
    public duration: number,
    public date: string = new Date().toDateString(),
  ) {}
}

const exercises = new Map<string, Exercise[]>();
export const aiExercises = [
  new Exercise("yoga", 60),
  new Exercise("skip rope", 20),
];
exercises.set(AI._id, aiExercises);

export const saveExercise = (userId: string, exercise: Exercise): void => {
  const userExercises = exercises.get(userId);
  if (!userExercises) {
    exercises.set(userId, [exercise]);
    return;
  }
  userExercises.push(exercise);
};

export const getUserExercises = (userId: string): Exercise[] | undefined =>
  exercises.get(userId);
