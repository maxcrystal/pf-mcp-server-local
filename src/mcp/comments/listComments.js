import { z } from "zod";
import { listComments } from "../../api/comments/listComments.js";
import { CommentListRequestSchema } from "../../const/schemas.js";

export const listCommentsTool = {
  annotations: {
    openWorldHint: true,
    readOnlyHint: true,
    title: "List Comments",
  },
  description: `Get comment list from a task with specified parameters and return the comment list with specified fields.`,
  name: "listComments",
  parameters: z
    .object({
      taskId: z
        .number()
        .int()
        .positive()
        .describe("The unique identifier of the task to list comments from"),
      listParams: CommentListRequestSchema.describe(
        "The parameters for listing comments, including pagination, filters, and fields to return"
      ),
    })
    .strict(),
  execute: async args => {
    const result = await listComments(args);
    return JSON.stringify(result);
  },
};