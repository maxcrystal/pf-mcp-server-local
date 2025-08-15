import { instance } from "../../mcp/server.js";

/**
 * Updates a task with the provided data.
 * @param {Number} taskId - The ID of the task to be updated
 * @param {Object} taskData - The data for the task to be updated
 * @param {Boolean} silent - If true, do not trigger any notifications
 * @returns
 */
export const updateTask = async ({ taskId, taskData = {}, silent = false }) => {
  try {
    const response = await instance.post(`/task/${taskId}`, taskData, {
      params: { silent },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update task: " + error.message);
  }
};
