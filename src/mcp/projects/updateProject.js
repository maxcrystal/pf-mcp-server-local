import { z } from "zod";
import { updateProject } from "../../api/projects/updateProject.js";
import { ProjectUpdateRequestSchema } from "../../const/schemas.js";

export const updateProjectTool = {
  annotations: {
    openWorldHint: true,
    readOnlyHint: false,
    title: "Update Project",
  },
  description: `Fetch a project by its ID and update specified fields`,
  name: "updateProject",
  parameters: z.object({
    projectId: z
      .number()
      .int()
      .min(1)
      .describe("The unique identifier for the project"),
    projectData: ProjectUpdateRequestSchema.describe(
      "The data to update the project with"
    ),
    silent: z
      .boolean()
      .default(false)
      .optional()
      .describe("Whether to suppress notifications"),
  }),
  execute: async args => {
    const result = await updateProject(args);
    return JSON.stringify(result);
  },
};