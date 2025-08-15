import { z } from "zod";
import { CommentUpdateRequestSchema } from "../../const/schemas.js";
import { updateComment } from "../../api/comments/updateComment.js";

export const updateCommentTool = {
  annotations: {
    openWorldHint: true,
    readOnlyHint: false,
    title: "Update Comment",
  },
  description: `Update an existing comment in a task. This tool allows you to modify comment text content, 
    change pinning and visibility settings, update recipients for notifications, and manage attached files.`,
  name: "updateComment",
  parameters: z.object({
    taskId: z
      .number()
      .int()
      .min(1)
      .describe("The unique identifier of the task containing the comment"),
    commentId: z
      .number()
      .int()
      .min(1)
      .describe("The unique identifier of the comment to update"),
    commentData: CommentUpdateRequestSchema.describe(
      "The data to update the comment with"
    ),
    silent: z
      .boolean()
      .optional()
      .describe("Whether to suppress notifications")
  }),
  execute: async args => {
    const result = await updateComment(args);
    return JSON.stringify(result);
  },
};