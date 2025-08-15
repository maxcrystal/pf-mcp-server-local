import { instance } from "../../mcp/server.js";

/**
 * Add a new comment to a task
 * @param {Number} taskId - The ID of the task to add comment to
 * @param {Object} commentData - The comment data to create the comment with
 * @returns {Promise<Object>} The created comment response
 */
export const addComment = async ({ taskId, commentData }) => {
  try {
    const response = await instance.post(
      `/task/${taskId}/comments/`,
      commentData
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add comment: " + error.message);
  }
};
