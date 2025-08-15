import { instance } from "../../mcp/server.js";

/**
 * Create a new project with specified parameters.
 * @param {Object} projectData - The project data to create the project with.
 * @returns {Promise<Object>} The created project response.
 */
export const createProject = async ({ projectData }) => {
  try {
    const response = await instance.post("/project/", projectData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create project: " + error.message);
  }
};
