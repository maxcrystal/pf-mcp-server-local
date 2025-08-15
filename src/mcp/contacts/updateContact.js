import { z } from "zod";
import { updateContact } from "../../api/contacts/updateContact.js";
import { ContactUpdateRequestSchema } from "../../const/schemas.js";

export const updateContactTool = {
  annotations: {
    openWorldHint: true,
    readOnlyHint: false,
    title: "Update Contact",
  },
  description: `Update an existing contact by its ID with specified fields`,
  name: "updateContact",
  parameters: z.object({
    contactId: z
      .union([z.number().int().min(1), z.string()])
      .describe("The unique identifier of the contact (can be number or 'contact:123' format)"),
    contactData: ContactUpdateRequestSchema.describe(
      "The data to update the contact with"
    ),
    silent: z
      .boolean()
      .default(false)
      .optional()
      .describe("Whether to suppress notifications"),
  }),
  execute: async args => {
    const result = await updateContact(args);
    return JSON.stringify(result);
  },
};