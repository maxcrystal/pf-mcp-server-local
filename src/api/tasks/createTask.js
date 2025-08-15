import { instance } from "../../mcp/server.js";

/**
 * Create a new task with specified parameters.
 * @param {Object} taskData - The task data to create the task with.
 * @returns {Promise<Object>} The created task response.
 */
export const createTask = async ({ taskData }) => {
  try {
    const response = await instance.post("/task/", taskData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create task: " + error.message);
  }
};
