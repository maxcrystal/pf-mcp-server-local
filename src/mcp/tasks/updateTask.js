import { z } from "zod";
import { updateTask } from "../../api/tasks/updateTask.js";
import { TaskUpdateRequestSchema } from "../../const/schemas.js";

export const updateTaskTool = {
  annotations: {
    openWorldHint: true,
    readOnlyHint: false,
    title: "Update Task",
  },
  description: `Fetch a task by its ID and update specified fields`,
  name: "updateTask",
  parameters: z.object({
    taskId: z
      .number()
      .int()
      .min(1)
      .describe("The unique identifier for the task"),
    taskData: TaskUpdateRequestSchema.describe(
      "The data to update the task with"
    ),
    silent: z
      .boolean()
      .default(false)
      .optional()
      .describe("Whether to suppress notifications"),
  }),
  execute: async args => {
    const result = await updateTask(args);
    return JSON.stringify(result);
  },
};
