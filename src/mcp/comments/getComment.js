import { z } from "zod";
import { getComment } from "../../api/comments/getComment.js";

export const getCommentTool = {
  annotations: {
    openWorldHint: true,
    readOnlyHint: true,
    title: "Get Comment",
  },
  description: `Fetch a comment by its ID and specified fields, if no fields are provided, id, description and
    dateTime will be returned. Possible fields are: id, dateTime, type, fromType, description, task, project, 
    contact, owner, isDeleted, isPinned, isHidden, isNotRead, recipients, reminders, dataTags, files, 
    changeTaskStartDate, changeTaskExpectDate, changeStatus, sourceObjectId, sourceDataVersion`,
  name: "getComment",
  parameters: z.object({
    commentId: z
      .number()
      .int()
      .min(1)
      .describe("The unique identifier of the comment."),
    fields: z
      .array(z.string())
      .optional()
      .default(["id", "description", "dateTime"])
      .describe(`The fields to return for the comment. 
          Possible fields are: id, dateTime, type, fromType, description, task, project, 
          contact, owner, isDeleted, isPinned, isHidden, isNotRead, recipients, reminders, dataTags, files, 
          changeTaskStartDate, changeTaskExpectDate, changeStatus, sourceObjectId, sourceDataVersion`),
  }),

  execute: async args => {
    const result = await getComment(args);
    return JSON.stringify(result);
  },
};