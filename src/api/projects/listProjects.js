import { instance } from "../../mcp/server.js";

/**
 * Get list of projects with specified filters and return the project list with specified fields.
 * @param {Object} listParams - The parameters to filter the project list and fields to return.
 * @returns
 */
export const listProjects = async ({ listParams }) => {
  try {
    const response = await instance.post("/project/list", listParams);
    return response.data;
  } catch (error) {
    throw new Error("Failed to list projects: " + error.message);
  }
};
