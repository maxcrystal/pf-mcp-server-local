import { z } from "zod";
import { getContact } from "../../api/contacts/getContact.js";

export const getContactTool = {
  annotations: {
    openWorldHint: true,
    readOnlyHint: true,
    title: "Get Contact",
  },
  description: `Fetch a contact by its ID and specified fields, if no fields are provided, id, name and
    email will be returned. Possible fields are: id, template, name, midname, lastname, gender, description, 
    address, site, email, additionalEmailAddresses, skype, telegramId, telegram, facebook, instagram, vk, 
    position, group, isCompany, isDeleted, birthDate, createdDate, dateOfLastUpdate, supervisors, phones, 
    companies, contacts, files, dataTags, sourceObjectId, sourceDataVersion`,
  name: "getContact",
  parameters: z.object({
    contactId: z
      .union([z.number().int().min(1), z.string()])
      .describe("The unique identifier of the contact (can be number or 'contact:123' format)."),
    fields: z
      .array(z.string())
      .optional()
      .default(["id", "name", "email"])
      .describe(`The fields to return for the contact. 
          Possible fields are: id, template, name, midname, lastname, gender, description, 
          address, site, email, additionalEmailAddresses, skype, telegramId, telegram, facebook, 
          instagram, vk, position, group, isCompany, isDeleted, birthDate, createdDate, 
          dateOfLastUpdate, supervisors, phones, companies, contacts, files, dataTags, 
          sourceObjectId, sourceDataVersion`),
  }),

  execute: async args => {
    const result = await getContact(args);
    return JSON.stringify(result);
  },
};