import { instance } from "../../mcp/server.js";

/**
 * Create a new contact with specified parameters.
 * @param {Object} contactData - The contact data to create the contact with.
 * @returns {Promise<Object>} The created contact response.
 */
export const createContact = async ({ contactData }) => {
  try {
    const response = await instance.post("/contact/", contactData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create contact: " + error.message);
  }
};
