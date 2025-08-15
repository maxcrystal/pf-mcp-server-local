import { instance } from "../../mcp/server.js";

/**
 * Get contact by ID and specified fields
 * @param {Number|String} contactId - The ID of the contact to fetch (can be number or "contact:123" format)
 * @param {[String]} fields - The fields to include in the response
 * @returns
 */
export const getContact = async ({
  contactId,
  fields = ["id", "name", "email"],
}) => {
  try {
    const response = await instance.get(`/contact/${contactId}`, {
      params: { fields: fields.join(",") },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get contact: " + error.message);
  }
};
