import { instance } from "../../mcp/server.js";

/**
 * Get list of tasks with specified filters and return the task list with specified fields.
 * @param {Object} listParams - The parameters to filter the task list and fields to return.
 * @returns
 */
export const listTasks = async ({ listParams }) => {
  try {
    const response = await instance.post("/task/list", listParams);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update task: " + error.message);
  }
};
