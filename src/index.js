import { startMcpServer } from "./mcp/server.js";

try {
  const server = startMcpServer();
  console.log("Planfix MCP Server started successfully");
} catch (error) {
  console.error("Failed to start MCP server:", error.message);
  process.exit(1);
}
