import { instance } from "../../mcp/server.js";

/**
 * Update an existing comment
 * @param {Number} taskId - The ID of the task containing the comment
 * @param {Number} commentId - The ID of the comment to update
 * @param {Object} commentData - The comment data to update the comment with
 * @param {Boolean} silent - Whether to suppress notifications (optional)
 * @returns {Promise<Object>} The updated comment response
 */
export const updateComment = async ({
  taskId,
  commentId,
  commentData,
  silent = false,
}) => {
  try {
    const response = await instance.post(
      `/task/${taskId}/comments/${commentId}`,
      commentData,
      {
        params: { silent },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update comment: " + error.message);
  }
};
