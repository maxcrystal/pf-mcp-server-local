import { z } from "zod";
import { listProjects } from "../../api/projects/listProjects.js";
import { ProjectListRequestSchema } from "../../const/schemas.js";

export const listProjectsTool = {
  annotations: {
    openWorldHint: true,
    readOnlyHint: true,
    title: "List Projects",
  },
  description: `Get project list with specified filters and return the project list with specified fields.`,
  name: "listProjects",
  parameters: z
    .object({
      listParams: ProjectListRequestSchema.describe(
        "The parameters for listing projects, including pagination and filters and fields to return"
      ),
    })
    .strict(),
  execute: async args => {
    const result = await listProjects(args);
    return JSON.stringify(result);
  },
};