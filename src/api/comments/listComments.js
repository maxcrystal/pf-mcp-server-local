import { instance } from "../../mcp/server.js";

/**
 * Get list of comments from a task with specified parameters and return the comment list with specified fields.
 * @param {number} taskId - The unique identifier of the task
 * @param {Object} listParams - The parameters to filter the comment list and fields to return.
 * @returns {Promise<Object>} The response containing the list of comments
 */
export const listComments = async ({ taskId, listParams }) => {
  try {
    const response = await instance.post(
      `/task/${taskId}/comments/list`,
      listParams
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to list comments: " + error.message);
  }
};
