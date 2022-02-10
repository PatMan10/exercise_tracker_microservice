import { Router, StatusCodes } from "../../deps.ts";
import {
  Exercise,
  filterExercises,
  getUser,
  getUserExercises,
  getUsers,
  saveExercise,
  saveUser,
  User,
} from "./models.ts";
import { URLs, UserURLs } from "./utils.ts";
import { parseBody } from "./middleware.ts";
import { IndexPage } from "./ui.ts";

const controller = new Router();

controller.get(URLs.INDEX, (ctx) => {
  ctx.response.headers.set("content-type", "text/html");
  ctx.response.body = IndexPage();
});

controller.get(UserURLs.GET_USERS, (ctx) => {
  // 200 success
  ctx.response.body = getUsers();
});

controller.get(UserURLs.GET_EXERCISE_LOG, (ctx) => {
  const { userId } = ctx.params;
  const user = getUser(userId);
  let exercises = getUserExercises(userId);
  if (exercises) {
    exercises = filterExercises(exercises, ctx.request.url.searchParams);
  }

  // 200 success
  ctx.response.body = {
    ...user,
    count: exercises?.length,
    log: exercises,
  };
});

controller.post(
  UserURLs.POST_USER,
  async (ctx) => {
    const { username } = await parseBody(ctx);
    const user = new User(undefined, username);
    saveUser(user);

    // 201 success
    ctx.response.status = StatusCodes.CREATED.valueOf();
    ctx.response.body = user;
  },
);

controller.post(
  UserURLs.POST_EXERCISE,
  async (ctx) => {
    const { userId } = ctx.params;
    const body = await parseBody(ctx);
    const { description, duration, date } = body;
    const user = getUser(userId);
    const exercise = new Exercise(
      description,
      Number(duration),
      date,
    );
    saveExercise(userId, exercise);

    // 201 success
    const combined = { ...user, ...exercise };
    ctx.response.status = StatusCodes.CREATED.valueOf();
    ctx.response.body = combined;
  },
);

export default controller;
