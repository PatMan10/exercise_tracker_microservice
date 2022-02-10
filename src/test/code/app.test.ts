import { Bson, Rhum, StatusCodes, superoak } from "../../deps.ts";
import app from "../../main/code/app.ts";
import { URLs } from "../../main/code/utils.ts";
import { IUser, User } from "../../main/code/models.ts";

const { assertEquals, assertExists } = Rhum.asserts;

const title = "*-*-*-*-*-*-*-*-*-*- URL Shortener Service *-*-*-*-*-*-*-*-*-*-";
Rhum.testPlan(
  title,
  () => {
    console.log(title);

    Rhum.testSuite(`---------- GET ${URLs.GET_USERS} ----------`, () => {
      const exec = async () => (await superoak(app)).get(URLs.GET_USERS);

      Rhum.testCase("200 success, return list of users\n", async () => {
        const res = await exec();
        const users: User[] = res.body;

        assertEquals(res.status, StatusCodes.OK);
        assertEquals(Array.isArray(users), true);
        assertEquals(users.length > 0, true);
        const user = users[0];
        assertExists(user._id);
        assertExists(user.username);
      });
    });

    Rhum.testSuite(`---------- POST ${URLs.POST_NEW_USER} ----------`, () => {
      const exec = async (user: IUser) =>
        (await superoak(app)).post(URLs.POST_NEW_USER).send(user);

      Rhum.testCase("201 success, return saved user\n", async () => {
        const newUser = { username: "username" };
        const res = await exec(newUser);
        const user: User = res.body;

        assertEquals(res.status, StatusCodes.CREATED);
        assertExists(user._id);
        assertEquals(Bson.ObjectID.isValid(user._id), true);
        assertEquals(user.username, newUser.username);
      });
    });
  },
);

Rhum.run();
