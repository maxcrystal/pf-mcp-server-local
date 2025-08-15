import { instance } from "../../mcp/server.js";

/**
 * Updates a contact with the provided data.
 * @param {Number|String} contactId - The ID of the contact to be updated (can be number or "contact:123" format)
 * @param {Object} contactData - The data for the contact to be updated
 * @param {Boolean} silent - If true, do not trigger any notifications
 * @returns
 */
export const updateContact = async ({
  contactId,
  contactData = {},
  silent = false,
}) => {
  try {
    const response = await instance.post(`/contact/${contactId}`, contactData, {
      params: { silent },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update contact: " + error.message);
  }
};
