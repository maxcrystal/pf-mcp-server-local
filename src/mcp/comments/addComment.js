import { z } from "zod";
import { CommentCreateRequestSchema } from "../../const/schemas.js";
import { addComment } from "../../api/comments/addComment.js";

export const addCommentTool = {
  annotations: {
    openWorldHint: true,
    readOnlyHint: false,
    title: "Add Comment",
  },
  description: `Add a new comment to a task in Planfix. This tool allows you to create comments with text content, 
    attach files, set recipients for notifications, and configure comment properties like pinning and visibility.`,
  name: "addComment",
  parameters: z.object({
    taskId: z
      .number()
      .int()
      .min(1)
      .describe("The unique identifier of the task to add the comment to"),
    commentData: CommentCreateRequestSchema.describe(
      "The data to create the comment with"
    ),
  }),
  execute: async args => {
    const result = await addComment(args);
    return JSON.stringify(result);
  },
};