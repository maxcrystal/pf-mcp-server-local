import { z } from "zod";
import { ping } from "../api/ping.js";

export const pingTool = {
  annotations: {
    openWorldHint: true,
    readOnlyHint: true,
    title: "Ping Planfix API",
  },
  description: `Check if the Planfix REST API is available and responding. This tool uses the /ping 
    endpoint to verify connectivity and API status. Returns success status, availability information,
    and timestamp. Returns:
      - "success" (boolean): Whether the API responded with status code 200
      - "status" (string): "available" or "unavailable"
      - "message" (string): Descriptive message about the API status
      - "data" (object): Response data from the ping endpoint (when successful)
      - "statusCode" (number): HTTP status code from the response
      - "error" (string): Error message (when unsuccessful)
      - "timestamp" (string): ISO timestamp of the check`,
  name: "ping",
  parameters: z.object({}),

  execute: async () => {
    const result = await ping();
    return JSON.stringify(result, null, 2);
  },
};