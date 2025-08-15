import { instance } from "../../mcp/server.js";

/**
 * Get list of contacts with specified filters and return the contact list with specified fields.
 * @param {Object} listParams - The parameters to filter the contact list and fields to return.
 * @returns
 */
export const listContacts = async ({ listParams }) => {
  try {
    const response = await instance.post("/contact/list", listParams);
    return response.data;
  } catch (error) {
    throw new Error("Failed to list contacts: " + error.message);
  }
};
