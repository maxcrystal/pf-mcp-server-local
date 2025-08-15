import { z } from "zod";
import { TaskCreateRequestSchema } from "../../const/schemas.js";
import { createTask } from "../../api/tasks/createTask.js";

export const createTaskTool = {
  annotations: {
    openWorldHint: true,
    readOnlyHint: false,
    title: "Create Task",
  },
  description: `Create a new task with specified parameters`,
  name: "createTask",
  parameters: z.object({
    taskData: TaskCreateRequestSchema.describe(
      "The data to create the task with"
    ),
  }),
  execute: async args => {
    const result = await createTask(args);
    return JSON.stringify(result);
  },
};
