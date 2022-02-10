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
  public date: string;
  constructor(
    public description: string,
    public duration: number,
    date?: string,
  ) {
    this.date = date
      ? new Date(date).toDateString()
      : new Date().toDateString();
  }
}

const exercises = new Map<string, Exercise[]>();
export const aiExercises: Exercise[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  .map((i) =>
    new Exercise(
      `exercise ${i}`,
      i * 10,
      `200${i}-0${i}-0${i}`,
    )
  );
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

export const filterExercises = (
  exercises: Exercise[],
  params: URLSearchParams,
): Exercise[] => {
  let _exercises = exercises;
  const _from = params.get("from");
  const _to = params.get("to");
  const _limit = params.get("limit");

  if (_from) {
    const from = new Date(_from).getTime();
    _exercises = _exercises.filter((e) => new Date(e.date).getTime() >= from);
  }

  if (_to) {
    const to = new Date(_to).getTime();
    _exercises = _exercises.filter((e) => new Date(e.date).getTime() <= to);
  }

  if (_limit) {
    const limit = Number(_limit);
    return limit > _exercises.length ? _exercises : _exercises.slice(0, limit);
  }
  return _exercises;
};
