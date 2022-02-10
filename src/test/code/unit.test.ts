import { Rhum } from "../../deps.ts";
import { aiExercises, filterExercises } from "../../main/code/models.ts";

const { assertEquals } = Rhum.asserts;

const title = "*-*-*-*-*-*-*-*-*-*- Unit tests *-*-*-*-*-*-*-*-*-*-";
Rhum.testPlan(
  title,
  () => {
    console.log(title);

    Rhum.testSuite(`---------- filterExercises ----------`, () => {
      Rhum.testCase("success 3", () => {
        const params = new URLSearchParams();
        params.set("from", "2005-01-01");
        params.set("limit", "3");

        const filtered = filterExercises(aiExercises, params);
        assertEquals(filtered.length, 3);
      });

      Rhum.testCase("success 4", () => {
        const params = new URLSearchParams();
        params.set("from", "2003-01-01");
        params.set("to", "2007-12-30");
        params.set("limit", "4");

        const filtered = filterExercises(aiExercises, params);
        assertEquals(filtered.length, 4);
      });

      Rhum.testCase("success 5", () => {
        const params = new URLSearchParams();
        params.set("from", "2003-01-01");
        params.set("to", "2007-12-30");

        const filtered = filterExercises(aiExercises, params);
        assertEquals(filtered.length, 5);
      });
    });
  },
);

Rhum.run();
