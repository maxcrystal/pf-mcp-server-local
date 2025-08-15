import { z } from "zod";
import { ProjectCreateRequestSchema } from "../../const/schemas.js";
import { createProject } from "../../api/projects/createProject.js";

export const createProjectTool = {
  annotations: {
    openWorldHint: true,
    readOnlyHint: false,
    title: "Create Project",
  },
  description: `Create a new project with specified parameters`,
  name: "createProject",
  parameters: z.object({
    projectData: ProjectCreateRequestSchema.describe(
      "The data to create the project with"
    ),
  }),
  execute: async args => {
    const result = await createProject(args);
    return JSON.stringify(result);
  },
};