import { z } from "zod";
import { deleteComment } from "../../api/comments/deleteComment.js";

export const deleteCommentTool = {
  annotations: {
    openWorldHint: true,
    readOnlyHint: false,
    title: "Delete Comment",
  },
  description: `Delete a comment by its ID. This action permanently removes the comment from Planfix.`,
  name: "deleteComment",
  parameters: z.object({
    commentId: z
      .number()
      .int()
      .min(1)
      .describe("The unique identifier of the comment to delete."),
  }),

  execute: async args => {
    const result = await deleteComment(args);
    return JSON.stringify(result);
  },
};