import { z } from "zod";
import { listTasks } from "../../api/tasks/listTasks.js";
import { TaskListRequestSchema } from "../../const/schemas.js";

export const listTasksTool = {
  annotations: {
    openWorldHint: true,
    readOnlyHint: true,
    title: "List Tasks",
  },
  description: `Get task list with specified filters and return the task list with specified fields.`,
  name: "listTasks",
  parameters: z
    .object({
      listParams: TaskListRequestSchema.describe(
        "The parameters for listing tasks, including pagination and filters and fields to return"
      ),
    })
    .strict(),
  execute: async args => {
    const result = await listTasks(args);
    return JSON.stringify(result);
  },
};
