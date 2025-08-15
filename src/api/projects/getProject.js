import { instance } from "../../mcp/server.js";

/**
 * Get project by ID and specified fields
 * @param {Number} projectId - The ID of the project to fetch
 * @param {[String]} fields - The fields to include in the response
 * @returns
 */
export const getProject = async ({
  projectId,
  fields = ["id", "name", "description"],
}) => {
  try {
    const response = await instance.get(`/project/${projectId}`, {
      params: { fields: fields.join(",") },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get project: " + error.message);
  }
};
