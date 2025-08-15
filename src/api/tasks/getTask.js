import { instance } from "../../mcp/server.js";

/**
 * Get task by ID and specified fields
 * @param {Number} taskId - The ID of the task to fetch
 * @param {[String]} fields - The fields to include in the response
 * @returns
 */
export const getTask = async ({
  taskId,
  fields = ["id", "name", "description"],
}) => {
  try {
    const response = await instance.get(`/task/${taskId}`, {
      params: { fields: fields.join(",") },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get task: " + error.message);
  }
};
