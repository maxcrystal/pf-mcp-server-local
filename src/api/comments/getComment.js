import { instance } from "../../mcp/server.js";

/**
 * Get comment by ID and specified fields
 * @param {Number} commentId - The ID of the comment to fetch
 * @param {[String]} fields - The fields to include in the response
 * @returns
 */
export const getComment = async ({
  commentId,
  fields = ["id", "description", "dateTime"],
}) => {
  try {
    const response = await instance.get(`/comment/${commentId}`, {
      params: { fields: fields.join(",") },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get comment: " + error.message);
  }
};
