import { z } from "zod";
import { getTask } from "../../api/tasks/getTask.js";

export const getTaskTool = {
  annotations: {
    openWorldHint: true,
    readOnlyHint: true,
    title: "Get Task",
  },
  description: `Fetch a task by its ID and specified fields, if no fields are provided, id, name and
    description will be returned. Possible fields are: id, name, description, priority, status, processId,
    resultChecking, type, assigner, parent, object, template, project, counterparty, dateTime,
    startDateTime, endDateTime, hasStartDate, hasEndDate, hasStartTime, hasEndTime,
    delayedTillDate, actualCompletionDate, dateOfLastUpdate, duration, durationUnit,
    durationType, overdue, closeToDeadLine, notAcceptedInTime, inFavorites, isSummary,
    isSequential, assignees, participants, auditors, recurrence, isDeleted, files, dataTags,
    sourceObjectId, sourceDataVersion. This tool do not provide comments to the task, use listComments tool
    to get coments to the task.`,
  name: "getTask",
  parameters: z.object({
    taskId: z
      .number()
      .int()
      .min(1)
      .describe("The unique identifier of the task."),
    fields: z
      .array(z.string())
      .optional()
      .default(["id", "name", "description"])
      .describe(`The fields to return for the task. 
          Possible fields are: id, name, description, priority, status, processId,
          resultChecking, type, assigner, parent, object, template, project, counterparty, dateTime,
          startDateTime, endDateTime, hasStartDate, hasEndDate, hasStartTime, hasEndTime,
          delayedTillDate, actualCompletionDate, dateOfLastUpdate, duration, durationUnit,
          durationType, overdue, closeToDeadLine, notAcceptedInTime, inFavorites, isSummary,
          isSequential, assignees, participants, auditors, recurrence, isDeleted, files, dataTags,
          sourceObjectId, sourceDataVersion`),
  }),

  execute: async args => {
    const result = await getTask(args);
    return JSON.stringify(result);
  },
};
