import { instance } from "../../mcp/server.js";

/**
 * Updates a project with the provided data.
 * @param {Number} projectId - The ID of the project to be updated
 * @param {Object} projectData - The data for the project to be updated
 * @param {Boolean} silent - If true, do not trigger any notifications
 * @returns
 */
export const updateProject = async ({
  projectId,
  projectData = {},
  silent = false,
}) => {
  try {
    const response = await instance.post(`/project/${projectId}`, projectData, {
      params: { silent },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update project: " + error.message);
  }
};
