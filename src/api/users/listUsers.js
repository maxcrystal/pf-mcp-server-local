import { instance } from "../../mcp/server.js";

/**
 * Get list of users (employees) with specified filters and return the user list with specified fields.
 * @param {Object} listParams - The parameters to filter the user list and fields to return.
 * @returns
 */
export const listUsers = async ({ listParams }) => {
  try {
    const response = await instance.post("/user/list", listParams);
    return response.data;
  } catch (error) {
    throw new Error("Failed to list users: " + error.message);
  }
};
