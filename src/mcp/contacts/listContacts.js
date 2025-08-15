import { z } from "zod";
import { listContacts } from "../../api/contacts/listContacts.js";
import { ContactListRequestSchema } from "../../const/schemas.js";

export const listContactsTool = {
  annotations: {
    openWorldHint: true,
    readOnlyHint: true,
    title: "List Contacts",
  },
  description: `Get contact list with specified filters and return the contact list with specified fields.`,
  name: "listContacts",
  parameters: z
    .object({
      listParams: ContactListRequestSchema.describe(
        "The parameters for listing contacts, including pagination and filters and fields to return"
      ),
    })
    .strict(),
  execute: async args => {
    const result = await listContacts(args);
    return JSON.stringify(result);
  },
};