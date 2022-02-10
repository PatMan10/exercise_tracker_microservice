import { Router, StatusCodes } from "../../deps.ts";
import {
  Exercise,
  getUser,
  getUserExercises,
  getUsers,
  saveExercise,
  saveUser,
  User,
} from "./models.ts";
import { URLs } from "./utils.ts";
import { parseBody } from "./middleware.ts";
import { IndexPage } from "./ui.ts";

const controller = new Router();

controller.get(URLs.INDEX, (ctx) => {
  ctx.response.headers.set("content-type", "text/html");
  ctx.response.body = IndexPage();
});

controller.get(URLs.GET_USERS, (ctx) => {
  ctx.response.body = getUsers();
});

controller.get(URLs.GET_EXERCISE_LOG, (ctx) => {
  console.log(`searchParams ====> ` + ctx.request.url.searchParams);
  const { userId } = ctx.params;
  const user = getUser(userId);
  const exercises = getUserExercises(userId);
  ctx.response.body = { ...user, count: exercises?.length, log: exercises };
});

controller.post(
  URLs.POST_USER,
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
  URLs.POST_EXERCISE,
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
