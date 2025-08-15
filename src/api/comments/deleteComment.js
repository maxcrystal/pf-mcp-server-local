import { instance } from "../../mcp/server.js";

/**
 * Delete comment by ID
 * @param {Number} commentId - The ID of the comment to delete
 * @returns
 */
export const deleteComment = async ({ commentId }) => {
  try {
    const response = await instance.delete(`/comment/${commentId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete comment: " + error.message);
  }
};
