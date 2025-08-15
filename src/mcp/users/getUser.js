import { z } from "zod";
import { getUser } from "../../api/users/getUser.js";

export const getUserTool = {
  annotations: {
    openWorldHint: true,
    readOnlyHint: true,
    title: "Get User",
  },
  description: `Fetch a user (employee) by its ID and specified fields, if no fields are provided, id, name and
    email will be returned. Possible fields are: id, name, midname, lastname, gender, isDeleted, birthDate, 
    groups, role, login, email, secondaryEmails, telegramId, telegram, status, phones, customFieldData, 
    languageCode, position, sourceObjectId, sourceDataVersion`,
  name: "getUser",
  parameters: z.object({
    userId: z
      .number()
      .int()
      .min(1)
      .describe("The unique identifier of the user."),
    fields: z
      .array(z.string())
      .optional()
      .default(["id", "name", "email"])
      .describe(`The fields to return for the user. 
          Possible fields are: id, name, midname, lastname, gender, isDeleted, birthDate, 
          groups, role, login, email, secondaryEmails, telegramId, telegram, status, phones, 
          customFieldData, languageCode, position, sourceObjectId, sourceDataVersion`),
  }),

  execute: async args => {
    const result = await getUser(args);
    return JSON.stringify(result);
  },
};