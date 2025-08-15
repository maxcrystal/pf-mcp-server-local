import dotenv from "dotenv";
import { FastMCP } from "fastmcp";
import { zodToJsonSchema } from "zod-to-json-schema";

import { createAxiosInstance } from "../api/axios.js";
import { pingTool } from "./ping.js";
import { getTaskTool } from "./tasks/getTask.js";
import { createTaskTool } from "./tasks/createTask.js";
import { updateTaskTool } from "./tasks/updateTask.js";
import { listTasksTool } from "./tasks/listTasks.js";
import { getProjectTool } from "./projects/getProject.js";
import { listProjectsTool } from "./projects/listProjects.js";
import { createProjectTool } from "./projects/createProject.js";
import { updateProjectTool } from "./projects/updateProject.js";
import { getCommentTool } from "./comments/getComment.js";
import { deleteCommentTool } from "./comments/deleteComment.js";
import { addCommentTool } from "./comments/addComment.js";
import { updateCommentTool } from "./comments/updateComment.js";
import { listCommentsTool } from "./comments/listComments.js";
import { getUserTool } from "./users/getUser.js";
import { listUsersTool } from "./users/listUsers.js";
import { getContactTool } from "./contacts/getContact.js";
import { createContactTool } from "./contacts/createContact.js";
import { updateContactTool } from "./contacts/updateContact.js";
import { listContactsTool } from "./contacts/listContacts.js";

dotenv.config();

const { PLANFIX_API_URL, PLANFIX_API_TOKEN } = process.env;
if (!PLANFIX_API_URL || !PLANFIX_API_TOKEN) {
  throw new Error(
    "Missing required environment variables: " +
      [
        !PLANFIX_API_URL && "PLANFIX_API_URL",
        !PLANFIX_API_TOKEN && "PLANFIX_API_TOKEN",
      ]
        .filter(Boolean)
        .join(", ")
  );
}

export const instance = createAxiosInstance({
  url: PLANFIX_API_URL,
  token: PLANFIX_API_TOKEN,
});

export const startMcpServer = () => {
  const server = new FastMCP({
    name: "Planfix MCP Server",
    version: "1.0.0",
  });

  const tools = [
    pingTool,
    getTaskTool,
    createTaskTool,
    updateTaskTool,
    listTasksTool,
    getProjectTool,
    listProjectsTool,
    createProjectTool,
    updateProjectTool,
    getCommentTool,
    deleteCommentTool,
    addCommentTool,
    updateCommentTool,
    listCommentsTool,
    getUserTool,
    listUsersTool,
    getContactTool,
    createContactTool,
    updateContactTool,
    listContactsTool,
  ];

  for (const tool of tools) {
    tool.description = `${tool.description} Parameters schema: ${JSON.stringify(
      zodToJsonSchema(tool.parameters)
    )}`;
    server.addTool(tool);
  }

  server.start({
    transportType: "httpStream",
    httpStream: {
      port: process.env.MCP_SERVER_PORT || 3030,
      endpoint: "/mcp",
    },
  });

  return server;
};
