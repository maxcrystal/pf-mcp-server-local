# Planfix MCP Server

A Model Context Protocol (MCP) server that provides seamless integration with the Planfix project management platform. This server enables AI assistants to interact with Planfix tasks through a standardized interface.

## Features

- **API Health Check**: Check if the Planfix REST API is available and responding
- **Task Management**: Create, read, update, and list tasks in Planfix
- **Project Management**: Create, read, update, and list projects in Planfix
- **Comment Management**: Create, read, update, list, and delete comments from tasks and projects in Planfix
- **User Management**: Retrieve user (employee) information from Planfix
- **Contact Management**: Create, read, update, and list contact information in Planfix
- **Comprehensive Field Support**: Access all task, project, comment, user, and contact fields including priority, status, dates, assignees, and more
- **HTTP Stream Transport**: Runs as an HTTP server for easy integration
- **Type Safety**: Built with Zod schemas for robust parameter validation
- **FastMCP Framework**: Leverages the FastMCP library for efficient MCP server implementation

## Available Tools

### `ping`
Check if the Planfix REST API is available and responding using the /ping endpoint.

**Parameters:**
- None required

**Returns:**
- `success` (boolean): Whether the API responded with status code 200
- `status` (string): "available" or "unavailable"
- `message` (string): Descriptive message about the API status
- `data` (object): Response data from the ping endpoint (when successful)
- `statusCode` (number): HTTP status code from the response
- `error` (string): Error message (when unsuccessful)
- `timestamp` (string): ISO timestamp of the check

**Example Response (Success):**
```json
{
  "success": true,
  "status": "available",
  "message": "Planfix REST API is available",
  "data": { /* API response data */ },
  "statusCode": 200,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Example Response (Failure):**
```json
{
  "success": false,
  "status": "unavailable",
  "message": "Planfix REST API is not available",
  "error": "Network timeout",
  "statusCode": null,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### `getTask`
Fetch a task by its ID with customizable field selection.

**Parameters:**
- `taskId` (number): The unique identifier of the task
- `fields` (array, optional): Specific fields to return (defaults to id, name, description)

**Available Fields:**
id, name, description, priority, status, processId, resultChecking, type, assigner, parent, object, template, project, counterparty, dateTime, startDateTime, endDateTime, hasStartDate, hasEndDate, hasStartTime, hasEndTime, delayedTillDate, actualCompletionDate, dateOfLastUpdate, duration, durationUnit, durationType, overdue, closeToDeadLine, notAcceptedInTime, inFavorites, isSummary, isSequential, assignees, participants, auditors, recurrence, isDeleted, files, dataTags, sourceObjectId, sourceDataVersion

### `getProject`
Fetch a project by its ID with customizable field selection.

**Parameters:**
- `projectId` (number): The unique identifier of the project
- `fields` (array, optional): Specific fields to return (defaults to id, name, description)

**Available Fields:**
id, name, description, status, owner, parent, template, group, counterparty, startDate, endDate, hiddenForEmployees, hiddenForClients, overdue, isCloseToDeadline, hasEndDate, assignees, participants, auditors, clientManagers, isDeleted, sourceObjectId, sourceDataVersion

### `getUser`
Fetch a user (employee) by its ID with customizable field selection.

**Parameters:**
- `userId` (number): The unique identifier of the user
- `fields` (array, optional): Specific fields to return (defaults to id, name, email)

**Available Fields:**
id, name, midname, lastname, gender, isDeleted, birthDate, groups, role, login, email, secondaryEmails, telegramId, telegram, status, phones, customFieldData, languageCode, position, sourceObjectId, sourceDataVersion

### `getContact`
Fetch a contact by its ID with customizable field selection.

**Parameters:**
- `contactId` (number|string): The unique identifier of the contact (can be number or "contact:123" format)
- `fields` (array, optional): Specific fields to return (defaults to id, name, email)

**Available Fields:**
id, template, name, midname, lastname, gender, description, address, site, email, additionalEmailAddresses, skype, telegramId, telegram, facebook, instagram, vk, position, group, isCompany, isDeleted, birthDate, createdDate, dateOfLastUpdate, supervisors, phones, companies, contacts, files, dataTags, sourceObjectId, sourceDataVersion

### `getComment`
Fetch a comment by its ID with customizable field selection.

**Parameters:**
- `commentId` (number): The unique identifier of the comment
- `fields` (array, optional): Specific fields to return (defaults to id, description, dateTime)

**Available Fields:**
id, dateTime, type, fromType, description, task, project, contact, owner, isDeleted, isPinned, isHidden, isNotRead, recipients, reminders, dataTags, files, changeTaskStartDate, changeTaskExpectDate, changeStatus, sourceObjectId, sourceDataVersion

### `deleteComment`
Delete a comment by its ID. This action permanently removes the comment from Planfix.

**Parameters:**
- `commentId` (number): The unique identifier of the comment to delete

### `updateComment`
Update an existing comment in a task.

**Parameters:**
- `taskId` (number): The unique identifier of the task containing the comment
- `commentId` (number): The unique identifier of the comment to update
- `commentData` (object): The data to update the comment with
- `silent` (boolean, optional): Whether to suppress notifications

### `addComment`
Add a new comment to a task in Planfix.

**Parameters:**
- `taskId` (number): The unique identifier of the task to add the comment to
- `commentData` (object): The data to create the comment with

### `createTask`
Create a new task in Planfix.

**Parameters:**
- `taskData` (object): The data to create the task with

### `createProject`
Create a new project in Planfix.

**Parameters:**
- `projectData` (object): The data to create the project with

### `createContact`
Create a new contact or company in Planfix.

**Parameters:**
- `contactData` (object): The data to create the contact with

### `listContacts`
Get a list of contacts with filtering and pagination options.

**Parameters:**
- `listParams` (object): Parameters for listing contacts, including pagination, filters, and fields to return

**Available Fields:**
id, template, name, midname, lastname, gender, description, address, site, email, additionalEmailAddresses, skype, telegramId, telegram, facebook, instagram, vk, position, group, isCompany, isDeleted, birthDate, createdDate, dateOfLastUpdate, supervisors, phones, companies, contacts, files, dataTags, sourceObjectId, sourceDataVersion

**Filter Types:**
- 6001: Contact name
- 6002: Contact group
- 6003: Contact company
- 6004: Contact email
- 6005: Contact phone
- 6006: Contact position
- 6007: Contact address
- Other and custom field identifiers (6008+)

### `updateContact`
Update an existing contact by its ID.

**Parameters:**
- `contactId` (number|string): The unique identifier of the contact (can be number or "contact:123" format)
- `contactData` (object): The data to update the contact with
- `silent` (boolean, optional): Whether to suppress notifications

### `updateProject`
Update an existing project by its ID.

**Parameters:**
- `projectId` (number): The unique identifier for the project
- `projectData` (object): The data to update the project with
- `silent` (boolean, optional): Whether to suppress notifications

### `updateTask`
Update an existing task by its ID.

**Parameters:**
- `taskId` (number): The unique identifier for the task
- `taskData` (object): The data to update the task with
- `silent` (boolean, optional): Whether to suppress notifications

### `listTasks`
Get a list of tasks with filtering and pagination options.

**Parameters:**
- `listParams` (object): Parameters for listing tasks, including pagination, filters, and fields to return

**Filter Types:**
- 1: Task assignee
- 5: Task project
- 9: Task priority
- 10: Task status
- Other and custom field identifiers (2-4, 6-8, 11+)

### `listProjects`
Get a list of projects with filtering and pagination options.

**Parameters:**
- `listParams` (object): Parameters for listing projects, including pagination, filters, and fields to return

**Available Fields:**
id, name, description, status, owner, parent, template, group, counterparty, startDate, endDate, hiddenForEmployees, hiddenForClients, overdue, isCloseToDeadline, hasEndDate, assignees, participants, auditors, clientManagers, isDeleted, sourceObjectId, sourceDataVersion

**Filter Types:**
- 5001: Project name
- 5002: Project group
- 5003: Project counterparty
- 5004: Project owner
- Other and custom field identifiers (5005+)

### `listComments`
Get a list of comments from a task with filtering and pagination options.

**Parameters:**
- `taskId` (number): The unique identifier of the task to list comments from
- `listParams` (object): Parameters for listing comments, including pagination, sorting, and fields to return

**Available Fields:**
id, dateTime, type, fromType, description, task, project, contact, owner, isDeleted, isPinned, isHidden, isNotRead, recipients, reminders, dataTags, files, changeTaskStartDate, changeTaskExpectDate, changeStatus, sourceObjectId, sourceDataVersion

**Type List Options:**
- Comments: Regular comments only
- All: All comment types
- New: New comments only
- Deleted: Deleted comments only

**Sort Fields:**
- id: Comment ID
- dateTime: Comment date and time

### `listUsers`
Get a list of users (employees) with filtering and pagination options.

**Parameters:**
- `listParams` (object): Parameters for listing users, including pagination, filters, and fields to return

**Available Fields:**
id, name, midname, lastname, gender, isDeleted, birthDate, groups, role, login, email, secondaryEmails, telegramId, telegram, status, phones, customFieldData, languageCode, position, sourceObjectId, sourceDataVersion

**Filter Types:**
- 9001: Employee group
- 9002: Employee phone
- 9003: Employee external email
- 9004: Employee extension number
- 9005: Employee position name
- 9006: Employee part of name
- 9008: Employee number
- 9009: Employee role
- 9120: Employee birth date
- 9121: Employee First name
- 9122: Employee Middle name
- 9123: Employee Last name
- 9126: Employee telegramId
- 9127: Employee position id
- Other and custom field identifiers (9101-9118)

**Additional Options:**
- `onlyActive` (boolean): Flag for retrieving only active employees
- `prefixedId` (boolean): Flag for retrieving id with a prefix (e.g., 'user:123')

## Installation

1. Clone the repository:
```bash
git clone https://github.com/maxcrystal/pf-mcp-server-local
cd pf-mcp-server-local
```

2. Install dependencies:
```bash
npm install
```

3. Configure your credentials in `.env`:
```bash
cp .env.example .env
```

Edit `.env` to set your Planfix API credentials and server configuration:
```bash
# MCP Configuration
PLANFIX_API_URL=https://your-account.planfix.ru/rest
PLANFIX_API_TOKEN=YOUR_PLANFIX_API_TOKEN
API_TIMEOUT=10000
MCP_SERVER_PORT=3030

# Optional Configuration
NODE_ENV=development
```

4. Configure your MCP client:
```json
"mcp": {
  "servers": {
    "pf-mcp-server": {
      "url": "localhost:3030/mcp"
    }
  }
}
```

## Usage

### Starting the Server

```bash
npm start
```

The server will start on port 3030 with the MCP endpoint at `/mcp`.

### Development Tools

#### MCP Inspector
- **Use MCP Jam Inspector**: `npm run jam`
  - Opens the MCP Inspector on port 4000 for interactive debugging
  - Provides a web-based interface to test MCP tools and inspect server responses
  - Useful for validating tool parameters and testing API integrations
  - Access at: `http://localhost:4000`

#### Debugging Tools
- **API Request Logging**: Enabled automatically in development mode
- **Zod Schema Validation**: Built-in parameter validation with detailed error messages
- **HTTP Stream Transport**: Direct HTTP endpoint testing at `http://localhost:3030/mcp`
- **Error Handling**: Comprehensive error responses with status codes and descriptive messages

#### Testing API Endpoints
You can test individual API endpoints using curl or any HTTP client:

```bash
# Test API connectivity
curl -X POST http://localhost:3030/mcp \
  -H "Content-Type: application/json" \
  -d '{"method": "ping", "params": {}}'
```

### Integration with AI Assistants

Once running, the server can be connected to MCP-compatible AI assistants. The server provides HTTP stream transport on:

```
http://localhost:3030/mcp
```

## Project Structure

```
src/
├── api/
│   ├── axios.js          # Axios configuration for Planfix API
│   ├── tasks/            # Task-related API functions
│   │   ├── createTask.js
│   │   ├── getTask.js
│   │   ├── listTasks.js
│   │   └── updateTask.js
│   ├── projects/         # Project-related API functions
│   │   ├── createProject.js
│   │   ├── getProject.js
│   │   ├── listProjects.js
│   │   └── updateProject.js
│   ├── comments/         # Comment-related API functions
│   │   ├── addComment.js
│   │   ├── getComment.js
│   │   ├── listComments.js
│   │   ├── updateComment.js
│   │   └── deleteComment.js
│   ├── contacts/         # Contact-related API functions
│   │   ├── createContact.js
│   │   ├── getContact.js
│   │   ├── listContacts.js
│   │   └── updateContact.js
│   └── users/            # User-related API functions
|       ├── listUsers.js
│       └── getUser.js
├── const/
│   └── schemas.js        # Zod schemas for validation
├── mcp/
│   ├── server.js         # Main MCP server setup
│   ├── tasks/            # Task-related MCP tool definitions
│   │   ├── createTask.js
│   │   ├── getTask.js
│   │   ├── listTasks.js
│   │   └── updateTask.js
│   ├── projects/         # Project-related MCP tool definitions
│   │   ├── createProject.js
│   │   ├── getProject.js
│   │   ├── listProjects.js
│   │   └── updateProject.js
│   ├── comments/         # Comment-related MCP tool definitions
│   │   ├── addComment.js
│   │   ├── getComment.js
│   │   ├── listComments.js
│   │   ├── updateComment.js
│   │   └── deleteComment.js
│   ├── contacts/         # Contact-related MCP tool definitions
│   │   ├── createContact.js
│   │   ├── getContact.js
│   │   ├── listContacts.js
│   │   └── updateContact.js
│   └── users/            # User-related MCP tool definitions
|       ├── listUsers.js
│       └── getUser.js
└── index.js              # Application entry point
```

## Dependencies

- **[FastMCP](https://github.com/jlowin/fastmcp)**: Framework for building MCP servers
- **[Axios](https://axios-http.com/)**: HTTP client for API requests
- **[Zod](https://zod.dev/)**: TypeScript-first schema validation

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -am 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Max Crystal** - ✉️ [info@maxcrystal.ru](mailto:info@maxcrystal.ru), [@maxcrystalbot](https://t.me/maxcrystalbot)

## Links

- [Homepage](https://maxcrystal.ru)
- [Repository](https://github.com/maxcrystal/pf-mcp-server-local)
- [Planfix API Documentation](https://planfix.ru/docs/api/)
- [Model Context Protocol](https://modelcontextprotocol.io/)

## Support

For support and questions, please open an issue on the GitHub repository or contact the author directly.