import { instance } from "../../mcp/server.js";

/**
 * Get user by ID and specified fields
 * @param {Number} userId - The ID of the user to fetch
 * @param {[String]} fields - The fields to include in the response
 * @returns
 */
export const getUser = async ({ userId, fields = ["id", "name", "email"] }) => {
  try {
    const response = await instance.get(`/user/${userId}`, {
      params: { fields: fields.join(",") },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get user: " + error.message);
  }
};
