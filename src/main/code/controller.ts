import { Router, StatusCodes } from "../../deps.ts";
import { saveUser, User } from "./models.ts";
import { URLs } from "./utils.ts";
import { parseBody } from "./middleware.ts";
import { IndexPage } from "./ui.ts";

const controller = new Router();

controller.get(URLs.INDEX, (ctx) => {
  ctx.response.headers.set("content-type", "text/html");
  ctx.response.body = IndexPage();
});

controller.post(
  URLs.POST_NEW_USER,
  async (ctx) => {
    const { username } = await parseBody(ctx);
    const user = new User(undefined, username);
    saveUser(user);
    // 201 success
    ctx.response.status = StatusCodes.CREATED.valueOf();
    ctx.response.body = user;
  },
);

export default controller;
