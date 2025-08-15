import { instance } from "../mcp/server.js";

/**
 * Check if Planfix REST API is available using the /ping endpoint
 * @returns {Object} Response from the ping endpoint with status information
 */
export const ping = async () => {
  try {
    const response = await instance.get("/ping");
    const isSuccess = response.status === 200;

    return {
      success: isSuccess,
      status: isSuccess ? "available" : "unavailable",
      message: isSuccess
        ? "Planfix REST API is available"
        : `Planfix REST API responded with status ${response.status}`,
      data: response.data,
      statusCode: response.status,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      success: false,
      status: "unavailable",
      message: "Planfix REST API is not available",
      error: error.message,
      statusCode: error.response?.status || null,
      timestamp: new Date().toISOString(),
    };
  }
};
