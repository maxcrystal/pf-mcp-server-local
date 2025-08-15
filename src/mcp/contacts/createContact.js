import { z } from "zod";
import { ContactCreateRequestSchema } from "../../const/schemas.js";
import { createContact } from "../../api/contacts/createContact.js";

export const createContactTool = {
  annotations: {
    openWorldHint: true,
    readOnlyHint: false,
    title: "Create Contact",
  },
  description: `Create a new contact or company with specified parameters`,
  name: "createContact",
  parameters: z.object({
    contactData: ContactCreateRequestSchema.describe(
      "The data to create the contact with"
    ),
  }),
  execute: async args => {
    const result = await createContact(args);
    return JSON.stringify(result);
  },
};