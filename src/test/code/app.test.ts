import { Bson, Rhum, StatusCodes, superoak } from "../../deps.ts";
import app from "../../main/code/app.ts";
import { UserURLs } from "../../main/code/utils.ts";
import {
  AI,
  aiExercises,
  Exercise,
  iExercise,
  iExerciseLog,
  iUser,
  User,
} from "../../main/code/models.ts";

const { assertEquals, assertExists } = Rhum.asserts;

const title = "*-*-*-*-*-*-*-*-*-*- URL Shortener Service *-*-*-*-*-*-*-*-*-*-";
Rhum.testPlan(
  title,
  () => {
    console.log(title);

    Rhum.testSuite(`---------- GET ${UserURLs.GET_USERS} ----------`, () => {
      const exec = async () => (await superoak(app)).get(UserURLs.GET_USERS);

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

    Rhum.testSuite(
      `---------- GET ${UserURLs.GET_EXERCISE_LOG} ----------`,
      () => {
        const exec = async (userId: string, params?: URLSearchParams) =>
          (await superoak(app)).get(UserURLs.getExerciseLog(userId, params));

        Rhum.testCase("200 success, return user's exercise log\n", async () => {
          const res = await exec(AI._id);
          const exerciseLog: iExerciseLog = res.body;

          assertEquals(res.status, StatusCodes.OK);
          assertEquals(exerciseLog._id, AI._id);
          assertEquals(exerciseLog.username, AI.username);
          assertEquals(exerciseLog.count, aiExercises.length);
          assertEquals(Array.isArray(exerciseLog.log), true);
          assertEquals(exerciseLog.log.length, aiExercises.length);
          exerciseLog.log.forEach((e) => {
            assertExists(e.description);
            assertExists(e.duration);
            assertExists(e.date);
          });
        });

        Rhum.testCase(
          "200 success, return user's exercise log based of search params\n",
          async () => {
            const params = new URLSearchParams();
            params.set("from", "2003-01-01");
            params.set("to", "2007-12-30");
            params.set("limit", "4");
            const res = await exec(AI._id, params);
            const exerciseLog: iExerciseLog = res.body;

            assertEquals(res.status, StatusCodes.OK);
            assertEquals(exerciseLog._id, AI._id);
            assertEquals(exerciseLog.username, AI.username);
            assertEquals(exerciseLog.count, 4);
            assertEquals(Array.isArray(exerciseLog.log), true);
            assertEquals(exerciseLog.log.length, 4);
            exerciseLog.log.forEach((e) => {
              assertExists(e.description);
              assertExists(e.duration);
              assertExists(e.date);
            });
          },
        );
      },
    );

    Rhum.testSuite(`---------- POST ${UserURLs.POST_USER} ----------`, () => {
      const exec = async (user: iUser) =>
        (await superoak(app)).post(UserURLs.POST_USER).send(user);

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

    Rhum.testSuite(
      `---------- POST ${UserURLs.POST_EXERCISE} ----------`,
      () => {
        const exec = async (userId: string, exercise: Exercise) =>
          (await superoak(app)).post(UserURLs.postExercise(userId)).send(
            exercise,
          );

        Rhum.testCase("201 success, return saved exercise\n", async () => {
          const newExercise = new Exercise("skip roap", 20, "1995-09-30");
          const res = await exec(AI._id, newExercise);
          const exercise: iExercise = res.body;

          assertEquals(res.status, StatusCodes.CREATED);
          assertEquals(exercise._id, AI._id);
          assertEquals(exercise.username, AI.username);
          assertEquals(exercise.description, newExercise.description);
          assertEquals(exercise.duration, newExercise.duration);
          assertExists(exercise.date);
        });
      },
    );
  },
);

Rhum.run();
