import { z } from "zod";
import { getProject } from "../../api/projects/getProject.js";

export const getProjectTool = {
  annotations: {
    openWorldHint: true,
    readOnlyHint: true,
    title: "Get Project",
  },
  description: `Fetch a project by its ID and specified fields, if no fields are provided, id, name and
    description will be returned. Possible fields are: id, name, description, status, owner, parent, template, group, counterparty, startDate, endDate, hiddenForEmployees, hiddenForClients, overdue, isCloseToDeadline, hasEndDate, assignees, participants, auditors, clientManagers, isDeleted, sourceObjectId, sourceDataVersion`,
  name: "getProject",
  parameters: z.object({
    projectId: z
      .number()
      .int()
      .min(1)
      .describe("The unique identifier of the project."),
    fields: z
      .array(z.string())
      .optional()
      .default(["id", "name", "description"])
      .describe(`The fields to return for the project. 
          Possible fields are: id, name, description, status, owner, parent, template, group, counterparty, startDate, endDate, hiddenForEmployees, hiddenForClients, overdue, isCloseToDeadline, hasEndDate, assignees, participants, auditors, clientManagers, isDeleted, sourceObjectId, sourceDataVersion`),
  }),

  execute: async args => {
    const result = await getProject(args);
    return JSON.stringify(result);
  },
};