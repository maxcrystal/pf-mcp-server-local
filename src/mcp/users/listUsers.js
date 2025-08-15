import { z } from "zod";
import { listUsers } from "../../api/users/listUsers.js";
import { UserListRequestSchema } from "../../const/schemas.js";

export const listUsersTool = {
  annotations: {
    openWorldHint: true,
    readOnlyHint: true,
    title: "List Users",
  },
  description: `Get user (employee) list with specified filters and return the user list with specified fields.`,
  name: "listUsers",
  parameters: z
    .object({
      listParams: UserListRequestSchema.describe(
        "The parameters for listing users, including pagination and filters and fields to return"
      ),
    })
    .strict(),
  execute: async args => {
    const result = await listUsers(args);
    return JSON.stringify(result);
  },
};