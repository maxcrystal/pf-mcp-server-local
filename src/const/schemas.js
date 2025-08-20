import { z } from "zod";

const TASK_STATUSES = {
  DRAFT: { id: 0, name: "Черновик" },
  NEW: { id: 1, name: "Новая" },
  IN_PROGRESS: { id: 2, name: "В работе" },
  COMPLETED: { id: 6, name: "Выполненная" },
  DEFERRED: { id: 4, name: "Отложенная" },
  FINISHED: { id: 3, name: "Завершенная" },
};

// Validation schemas based on actual Planfix API specification

const BaseEntitySchema = z
  .object({
    id: z
      .union([z.number(), z.string()])
      .optional()
      .describe("The unique identifier for the entity"),
    name: z.string().optional().describe("The name of the entity - not used"),
  })
  .strict();

const PersonRequestSchema = z
  .object({
    id: z.string().describe("Format: 'user:1' or 'contact:3'"),
  })
  .strict();

const GroupRequestSchema = z
  .object({
    id: z.number().describe("The ID of the group"),
  })
  .strict();

const PeopleRequestSchema = z
  .object({
    users: z.array(PersonRequestSchema).optional(),
    groups: z.array(GroupRequestSchema).optional(),
  })
  .strict();

const TimePointSchema = z
  .object({
    date: z.string().optional().describe("Format: dd-MM-yyyy"),
    time: z.string().optional().describe("Format: HH:mm"),
    datetime: z.string().optional().describe("Format: yyyy-MM-dd'T'HH:mm'Z"),
    dateTimeUtcSeconds: z
      .string()
      .optional()
      .describe("Format: yyyy-MM-dd'T'HH:mm:ssZ"),
  })
  .strict();

const CustomFieldValueRequestSchema = z.object({
  field: z.object({
    id: z.number().describe("Field identifier"),
  }),
  value: z.any(),
});

const FileRequestSchema = z
  .object({
    id: z.number(),
  })
  .strict();

// TODO: Add filter ids.
// Task filter schema for complex filtering
const TaskFilterSchema = z
  .object({
    type: z
      .number()
      .int()
      .describe(
        `Type of the filter: 5 - by project ID the task belongs to, 1 - by task assigner ID as "user:id" or "contact:id", 
        2 - by task assignees IDs as "user:id", "contact:id", "group:id", or array of IDs, 9 - by task priority, 
        10 - by task status ID ${JSON.stringify(
          TASK_STATUSES
        )}, 13 - by task start date, 14 - by task end date, 
        25 - by boolean if task has start date time, 7 - by task counterparty IDs as "user:id", "contact:id", "group:id", or array of IDs, 
        3 - by task auditors IDs as "user:id", "contact:id", "group:id", or array of IDs, 24 - by task process ID, and other custom field identifiers`
      ),
    operator: z
      .enum(["equal", "notequal", "gt", "lt"])
      .describe("Filter operator"),
    value: z.any().describe("Filter value"),
    field: z.number().int().optional().describe("Custom field identifier"),
  })
  .strict();

// Project filter schema for complex filtering
const ProjectFilterSchema = z
  .object({
    type: z
      .number()
      .int()
      .describe(
        `Type of the filter: 5001 - Project name, 5002 - Project group ID, 5003 - Project counterparty IDs as "user:id", "contact:id", "group:id", or array of IDs, 
        5004 - Project owner ID as "user:id" or "contact:id", and other custom field identifiers (5005+)`
      ),
    operator: z
      .enum(["equal", "notequal", "gt", "lt"])
      .describe("Filter operator"),
    value: z.any().describe("Filter value"),
    field: z.number().int().optional().describe("Custom field identifier"),
  })
  .strict();

// Task creation schema based on Planfix API TaskCreateRequest
export const TaskCreateRequestSchema = z
  .object({
    sourceId: z
      .string()
      .uuid()
      .optional()
      .describe("Source identifier in UUID format"),
    sourceObjectId: z
      .string()
      .uuid()
      .optional()
      .describe("Source object identifier in UUID format"),
    sourceDataVersion: z
      .string()
      .max(100)
      .optional()
      .describe("Source data version (e.g., 'AADJIgAAAAA=')"),
    name: z.string().min(1).describe("Task name"),
    description: z.string().optional().describe("Task description"),
    priority: z
      .number()
      .int()
      .min(1)
      .max(3)
      .optional()
      .describe("Task priority: 1 - Low, 2 - Normal, 3 - High"),
    status: BaseEntitySchema.optional().describe(
      `Task status ID ${JSON.stringify(TASK_STATUSES)}`
    ),
    type: BaseEntitySchema.optional().describe("Task type with id field"),
    assigner: PersonRequestSchema.optional().describe(
      "Task assigner with id field (format: 'user:1' or 'contact:3')"
    ),
    parent: BaseEntitySchema.optional().describe("Parent task with id field"),
    object: BaseEntitySchema.optional().describe("Task object with id field"),
    template: BaseEntitySchema.optional().describe(
      "Task template with id field"
    ),
    project: BaseEntitySchema.optional().describe("Task project with id field"),
    counterparty: PersonRequestSchema.optional().describe(
      "Task counterparty with id field (format: 'user:1' or 'contact:3')"
    ),
    dateTime: z
      .union([z.string(), TimePointSchema])
      .optional()
      .describe("Task creation date"),
    startDateTime: z
      .union([z.string(), TimePointSchema])
      .optional()
      .describe("Task start date and time"),
    endDateTime: z
      .union([z.string(), TimePointSchema])
      .optional()
      .describe("Task end date and time"),
    hasStartDate: z.boolean().optional(),
    hasEndDate: z.boolean().optional(),
    hasStartTime: z.boolean().optional(),
    hasEndTime: z.boolean().optional(),
    delayedTillDate: z
      .union([z.string(), TimePointSchema])
      .optional()
      .describe("Task delayed till date"),
    duration: z.number().optional().describe("Task duration"),
    durationUnit: z
      .enum(["minute", "hour", "day", "week", "month"])
      .optional()
      .describe("Duration unit"),
    durationType: z
      .enum(["work", "calendar"])
      .optional()
      .describe("Duration type"),
    assignees: PeopleRequestSchema.optional().describe(
      "Task assignees with users and groups arrays"
    ),
    participants: PeopleRequestSchema.optional().describe(
      "Task participants with users and groups arrays"
    ),
    auditors: PeopleRequestSchema.optional().describe(
      "Task auditors with users and groups arrays"
    ),
    customFieldData: z
      .array(CustomFieldValueRequestSchema)
      .optional()
      .describe("Custom field data"),
    files: z.array(FileRequestSchema).optional().describe("Attached files"),
  })
  .strict();

// Task update schema based on Planfix API TaskUpdateRequest
export const TaskUpdateRequestSchema = z
  .object({
    sourceId: z
      .string()
      .uuid()
      .optional()
      .describe("Source identifier in UUID format"),
    sourceObjectId: z
      .string()
      .uuid()
      .optional()
      .describe("Source object identifier in UUID format"),
    sourceDataVersion: z
      .string()
      .max(100)
      .optional()
      .describe("Source data version (e.g., 'AADJIgAAAAA=')"),
    name: z.string().optional().describe("Updated task name"),
    description: z.string().optional().describe("Updated task description"),
    priority: z
      .number()
      .int()
      .min(1)
      .max(3)
      .optional()
      .describe("Updated task priority: 1 - Low, 2 - Normal, 3 - High"),
    status: BaseEntitySchema.optional().describe(
      `Update task status ID ${JSON.stringify(TASK_STATUSES)}`
    ),
    type: BaseEntitySchema.optional().describe(
      "Updated task type with id field"
    ),
    assigner: PersonRequestSchema.optional().describe(
      "Updated task assigner with id field (format: 'user:1' or 'contact:3')"
    ),
    parent: BaseEntitySchema.optional().describe(
      "Updated parent task with id field"
    ),
    object: BaseEntitySchema.optional().describe(
      "Updated task object with id field"
    ),
    template: BaseEntitySchema.optional().describe(
      "Updated task template with id field"
    ),
    project: BaseEntitySchema.optional().describe(
      "Updated task project with id field"
    ),
    counterparty: PersonRequestSchema.optional().describe(
      "Updated task counterparty with id field (format: 'user:1' or 'contact:3')"
    ),
    startDateTime: z
      .union([z.string(), TimePointSchema])
      .optional()
      .describe("Updated task start date and time"),
    endDateTime: z
      .union([z.string(), TimePointSchema])
      .optional()
      .describe("Updated task end date and time"),
    hasStartDate: z.boolean().optional(),
    hasEndDate: z.boolean().optional(),
    hasStartTime: z.boolean().optional(),
    hasEndTime: z.boolean().optional(),
    delayedTillDate: z
      .union([z.string(), TimePointSchema])
      .optional()
      .describe("Updated task delayed till date"),
    duration: z.number().optional().describe("Updated task duration"),
    durationUnit: z
      .enum(["minute", "hour", "day", "week", "month"])
      .optional()
      .describe("Updated duration unit"),
    durationType: z
      .enum(["work", "calendar"])
      .optional()
      .describe("Updated duration type"),
    assignees: PeopleRequestSchema.optional().describe(
      "Updated task assignees with users and groups arrays"
    ),
    participants: PeopleRequestSchema.optional().describe(
      "Updated task participants with users and groups arrays"
    ),
    auditors: PeopleRequestSchema.optional().describe(
      "Updated task auditors with users and groups arrays"
    ),
    customFieldData: z
      .array(CustomFieldValueRequestSchema)
      .optional()
      .describe("Updated custom field data"),
    files: z
      .array(FileRequestSchema)
      .optional()
      .describe("Updated attached files"),
  })
  .strict();

// Task list request schema based on Planfix API
export const TaskListRequestSchema = z
  .object({
    offset: z
      .number()
      .min(0)
      .optional()
      .default(0)
      .describe("The offset for pagination, starting from 0"),
    pageSize: z
      .number()
      .min(1)
      .max(100)
      .optional()
      .default(100)
      .describe("The number of tasks to return per page"),
    fields: z
      .string()
      .optional()
      .default("id,name,description")
      .describe(
        `Fields to return in the task list response separated by commas. Possible fields are: id, name, 
        description, priority, status, processId, resultChecking, type, assigner, parent, object, template, 
        project, counterparty, dateTime, startDateTime, endDateTime, hasStartDate, hasEndDate, hasStartTime,
        hasEndTime, delayedTillDate, actualCompletionDate, dateOfLastUpdate, duration, durationUnit,
        durationType, overdue, closeToDeadLine, notAcceptedInTime, inFavorites, isSummary,
        isSequential, assignees, participants, auditors, recurrence, isDeleted, files, dataTags,
        sourceObjectId, sourceDataVersion`
      ),
    sourceId: z
      .string()
      .uuid()
      .optional()
      .describe("Unique identifier of external application"),
    filters: z
      .array(TaskFilterSchema)
      .optional()
      .describe("Array of filters to apply to the task list"),
  })
  .strict();

// Project creation schema based on Planfix API ProjectCreateRequest
export const ProjectCreateRequestSchema = z
  .object({
    sourceId: z
      .string()
      .uuid()
      .optional()
      .describe("Source identifier in UUID format"),
    sourceObjectId: z
      .string()
      .uuid()
      .optional()
      .describe("Source object identifier in UUID format"),
    sourceDataVersion: z
      .string()
      .max(100)
      .optional()
      .describe("Source data version (e.g., 'AADJIgAAAAA=')"),
    name: z.string().min(1).describe("Project name"),
    description: z.string().optional().describe("Project description"),
    status: BaseEntitySchema.optional().describe(
      "Project status with id field"
    ),
    owner: PersonRequestSchema.optional().describe(
      "Project owner with id field (format: 'user:1' or 'contact:3')"
    ),
    parent: BaseEntitySchema.optional().describe(
      "Parent project with id field"
    ),
    template: BaseEntitySchema.optional().describe(
      "Project template with id field"
    ),
    group: GroupRequestSchema.optional().describe(
      "Project group with id field"
    ),
    counterparty: PersonRequestSchema.optional().describe(
      "Project counterparty with id field (format: 'user:1' or 'contact:3')"
    ),
    startDate: z
      .union([z.string(), TimePointSchema])
      .optional()
      .describe("Project start date"),
    endDate: z
      .union([z.string(), TimePointSchema])
      .optional()
      .describe("Project end date"),
    hiddenForEmployees: z
      .boolean()
      .optional()
      .describe("Whether the project is hidden for employees"),
    hiddenForClients: z
      .boolean()
      .optional()
      .describe("Whether the project is hidden for clients"),
    overdue: z.boolean().optional(),
    isCloseToDeadline: z.boolean().optional(),
    assignees: PeopleRequestSchema.optional().describe(
      "Project assignees with users and groups arrays"
    ),
    participants: PeopleRequestSchema.optional().describe(
      "Project participants with users and groups arrays"
    ),
    auditors: PeopleRequestSchema.optional().describe(
      "Project auditors with users and groups arrays"
    ),
    clientManagers: PeopleRequestSchema.optional().describe(
      "Project client managers with users array"
    ),
    isDeleted: z.boolean().optional(),
    customFieldData: z
      .array(CustomFieldValueRequestSchema)
      .optional()
      .describe("Custom field data"),
    files: z.array(FileRequestSchema).optional().describe("Attached files"),
  })
  .strict();

// Project update schema based on Planfix API ProjectUpdateRequest
export const ProjectUpdateRequestSchema = z
  .object({
    sourceId: z
      .string()
      .uuid()
      .optional()
      .describe("Source identifier in UUID format"),
    sourceObjectId: z
      .string()
      .uuid()
      .optional()
      .describe("Source object identifier in UUID format"),
    sourceDataVersion: z
      .string()
      .max(100)
      .optional()
      .describe("Source data version (e.g., 'AADJIgAAAAA=')"),
    name: z.string().optional().describe("Updated project name"),
    description: z.string().optional().describe("Updated project description"),
    status: BaseEntitySchema.optional().describe(
      "Updated project status with id field"
    ),
    owner: PersonRequestSchema.optional().describe(
      "Updated project owner with id field (format: 'user:1' or 'contact:3')"
    ),
    parent: BaseEntitySchema.optional().describe(
      "Updated parent project with id field"
    ),
    template: BaseEntitySchema.optional().describe(
      "Project template with id field"
    ),
    group: GroupRequestSchema.optional().describe(
      "Project group with id field"
    ),
    counterparty: PersonRequestSchema.optional().describe(
      "Project counterparty with id field (format: 'user:1' or 'contact:3')"
    ),
    startDate: z
      .union([z.string(), TimePointSchema])
      .optional()
      .describe("Project start date"),
    endDate: z
      .union([z.string(), TimePointSchema])
      .optional()
      .describe("Project end date"),
    hiddenForEmployees: z
      .boolean()
      .optional()
      .describe("Whether the project is hidden for employees"),
    hiddenForClients: z
      .boolean()
      .optional()
      .describe("Whether the project is hidden for clients"),
    overdue: z.boolean().optional(),
    isCloseToDeadline: z.boolean().optional(),
    assignees: PeopleRequestSchema.optional().describe(
      "Project assignees with users and groups arrays"
    ),
    participants: PeopleRequestSchema.optional().describe(
      "Project participants with users and groups arrays"
    ),
    auditors: PeopleRequestSchema.optional().describe(
      "Project auditors with users and groups arrays"
    ),
    clientManagers: PeopleRequestSchema.optional().describe(
      "Project client managers with users array"
    ),
    isDeleted: z.boolean().optional(),
    customFieldData: z
      .array(CustomFieldValueRequestSchema)
      .optional()
      .describe("Custom field data"),
    files: z.array(FileRequestSchema).optional().describe("Attached files"),
  })
  .strict();

// Project list request schema based on Planfix API
export const ProjectListRequestSchema = z
  .object({
    offset: z
      .number()
      .min(0)
      .optional()
      .default(0)
      .describe("The offset for pagination, starting from 0"),
    pageSize: z
      .number()
      .min(1)
      .max(100)
      .optional()
      .default(100)
      .describe("The number of projects to return per page"),
    fields: z
      .string()
      .optional()
      .default("id,name,description")
      .describe(
        `Fields to return in the project list response separated by commas. Possible fields are: id, name, 
        description, status, owner, parent, template, group, counterparty, startDate, endDate, 
        hiddenForEmployees, hiddenForClients, overdue, isCloseToDeadline, hasEndDate, assignees, 
        participants, auditors, clientManagers, isDeleted, sourceObjectId, sourceDataVersion`
      ),
    sourceId: z
      .string()
      .uuid()
      .optional()
      .describe("Unique identifier of external application"),
    filters: z
      .array(ProjectFilterSchema)
      .optional()
      .describe("Array of filters to apply to the project list"),
  })
  .strict();

// Comment creation schema based on Planfix API CommentCreateRequest
export const CommentCreateRequestSchema = z
  .object({
    sourceId: z
      .string()
      .uuid()
      .optional()
      .describe("Source identifier in UUID format"),
    sourceObjectId: z
      .string()
      .uuid()
      .optional()
      .describe("Source object identifier in UUID format"),
    sourceDataVersion: z
      .string()
      .max(100)
      .optional()
      .describe("Source data version (e.g., 'AADJIgAAAAA=')"),
    dateTime: TimePointSchema.optional().describe("Comment date and time"),
    description: z.string().min(1).describe("Comment text content"),
    owner: PersonRequestSchema.optional().describe(
      "Comment owner with id field (format: 'user:1' or 'contact:3')"
    ),
    isPinned: z.boolean().optional().describe("Whether the comment is pinned"),
    isHidden: z.boolean().optional().describe("Whether the comment is hidden"),
    recipients: PeopleRequestSchema.optional().describe(
      "Comment recipients with users, groups or roles arrays"
    ),
    files: z.array(FileRequestSchema).optional().describe("Attached files"),
  })
  .strict();

// Comment update schema based on Planfix API CommentUpdateRequest
export const CommentUpdateRequestSchema = z
  .object({
    sourceId: z
      .string()
      .uuid()
      .optional()
      .describe("Source identifier in UUID format"),
    sourceObjectId: z
      .string()
      .uuid()
      .optional()
      .describe("Source object identifier in UUID format"),
    sourceDataVersion: z
      .string()
      .max(100)
      .optional()
      .describe("Source data version (e.g., 'AADJIgAAAAA=')"),
    description: z.string().optional().describe("Updated comment text content"),
    isPinned: z.boolean().optional().describe("Whether the comment is pinned"),
    isHidden: z.boolean().optional().describe("Whether the comment is hidden"),
    recipients: PeopleRequestSchema.optional().describe(
      "Comment recipients with users, groups or roles arrays"
    ),
    files: z.array(FileRequestSchema).optional().describe("Attached files"),
  })
  .strict();

// Comment list request schema based on Planfix API
export const CommentListRequestSchema = z
  .object({
    offset: z
      .number()
      .min(0)
      .optional()
      .default(0)
      .describe("The offset for pagination, starting from 0"),
    pageSize: z
      .number()
      .min(1)
      .max(100)
      .optional()
      .default(100)
      .describe("The number of comments to return per page"),
    fields: z
      .string()
      .optional()
      .default("id,description,dateTime")
      .describe(
        `Fields to return in the comment list response separated by commas. Possible fields are: id, dateTime, type, fromType, description, task, project,
        contact, owner, isDeleted, isPinned, isHidden, isNotRead, recipients, reminders, dataTags, files,
        changeTaskStartDate, changeTaskExpectDate, changeStatus, sourceObjectId, sourceDataVersion`
      ),
    typeList: z
      .enum(["Comments", "All", "New", "Deleted"])
      .optional()
      .default("Comments")
      .describe("Type of comments to retrieve"),
    resultOrder: z
      .array(
        z.object({
          field: z
            .string()
            .describe(
              "System field name - Possible for system fields: id, dateTime"
            ),
          direction: z.enum(["Asc", "Desc"]).describe("Sort direction"),
        })
      )
      .optional()
      .describe("Sorting order for the results"),
  })
  .strict();

// User filter schema for complex filtering
const UserFilterSchema = z
  .object({
    type: z
      .number()
      .int()
      .describe(
        `Type of the filter: 9001 - Employee group ID, 9002 - Employee phone, 9003 - Employee external email, 
        9004 - Employee extension number, 9005 - Employee position name, 9006 - Employee part of name, 
        9008 - Employee number, 9009 - Employee role, 9120 - Employee birth date, 9121 - Employee First name, 
        9122 - Employee Middle name, 9123 - Employee Last name, 9126 - Employee telegramId, 9127 - Employee position ID,
        and other custom field identifiers (9101-9118)`
      ),
    operator: z
      .enum(["equal", "notequal", "gt", "lt"])
      .describe("Filter operator"),
    value: z.any().describe("Filter value"),
  })
  .strict();

// User list request schema based on Planfix API
export const UserListRequestSchema = z
  .object({
    offset: z
      .number()
      .min(0)
      .optional()
      .default(0)
      .describe("The offset for pagination, starting from 0"),
    pageSize: z
      .number()
      .min(1)
      .max(100)
      .optional()
      .default(100)
      .describe("The number of users to return per page"),
    onlyActive: z
      .boolean()
      .optional()
      .default(false)
      .describe("Flag for retrieving only active employees"),
    prefixedId: z
      .boolean()
      .optional()
      .describe("Flag for retrieving id with a prefix (e.g., 'user:123')"),
    fields: z
      .string()
      .optional()
      .default("id,name,email")
      .describe(
        `Fields to return in the user list response separated by commas. Possible fields are: id, name,
        midname, lastname, gender, isDeleted, birthDate, groups, role, login, email, secondaryEmails,
        telegramId, telegram, status, phones, customFieldData, languageCode, position, sourceObjectId,
        sourceDataVersion`
      ),
    sourceId: z
      .string()
      .uuid()
      .optional()
      .describe("Unique identifier of external application"),
    filters: z
      .array(UserFilterSchema)
      .optional()
      .describe("Array of filters to apply to the user list"),
  })
  .strict();

// Phone request schema for contact creation
const PhoneRequestSchema = z
  .object({
    number: z.string().describe("Phone number"),
    type: z
      .enum([1, 2, 3, 4])
      .describe("Phone type: 1 - Mobile, 2 - Work, 3 - Home, 4 - Other"),
  })
  .strict();

// Contact create request schema based on Planfix API
export const ContactCreateRequestSchema = z
  .object({
    template: BaseEntitySchema.default({ id: 1 }).describe(
      "Contact template with id field. Default value is '{id : 1}'"
    ),
    sourceObjectId: z
      .string()
      .uuid()
      .optional()
      .describe("Unique identifier of external application"),
    sourceDataVersion: z
      .string()
      .max(100)
      .optional()
      .describe("Version identifier for external data synchronization"),
    name: z.string().describe("Contact first name"),
    midname: z.string().optional().describe("Contact middle name"),
    lastname: z.string().optional().describe("Contact last name"),
    gender: z
      .enum(["NotDefined", "Female", "Male"])
      .optional()
      .describe("Contact gender"),
    description: z.string().optional().describe("Contact description"),
    address: z.string().optional().describe("Contact address"),
    site: z.string().url().optional().describe("Contact website URL"),
    email: z.string().email().optional().describe("Contact email address"),
    additionalEmailAddresses: z
      .array(z.string().email())
      .optional()
      .describe("Additional email addresses"),
    skype: z.string().optional().describe("Skype username"),
    telegramId: z.string().optional().describe("Telegram ID"),
    telegram: z.string().optional().describe("Telegram username"),
    facebook: z.string().optional().describe("Facebook profile"),
    instagram: z.string().optional().describe("Instagram profile"),
    vk: z.string().optional().describe("VK profile"),
    position: z.string().optional().describe("Contact position/job title"),
    group: BaseEntitySchema.optional().describe("Contact group with id field"),
    isCompany: z
      .boolean()
      .optional()
      .default(false)
      .describe("Whether this contact is a company"),
    isDeleted: z
      .boolean()
      .optional()
      .default(false)
      .describe("Whether this contact is deleted"),
    birthDate: TimePointSchema.optional().describe("Contact birth date"),
    supervisors: PeopleRequestSchema.optional().describe(
      "Contact supervisors (users and groups)"
    ),
    phones: z
      .array(PhoneRequestSchema)
      .optional()
      .describe("Contact phone numbers"),
    companies: z
      .array(BaseEntitySchema)
      .optional()
      .describe("Companies associated with this contact"),
    contacts: z.array(BaseEntitySchema).optional().describe("Related contacts"),
    customFieldData: z
      .array(CustomFieldValueRequestSchema)
      .optional()
      .describe("Custom field values for the contact"),
    files: z
      .array(FileRequestSchema)
      .optional()
      .describe("Files attached to the contact"),
  })
  .strict();
// Contact update request schema based on Planfix API
export const ContactUpdateRequestSchema = z
  .object({
    template: BaseEntitySchema.optional().describe(
      "Contact template with id field"
    ),
    sourceObjectId: z
      .string()
      .uuid()
      .optional()
      .describe("Unique identifier of external application"),
    sourceDataVersion: z
      .string()
      .max(100)
      .optional()
      .describe("Version identifier for external data synchronization"),
    name: z.string().optional().describe("Contact first name"),
    midname: z.string().optional().describe("Contact middle name"),
    lastname: z.string().optional().describe("Contact last name"),
    gender: z
      .enum(["NotDefined", "Female", "Male"])
      .optional()
      .describe("Contact gender"),
    description: z.string().optional().describe("Contact description"),
    address: z.string().optional().describe("Contact address"),
    site: z.string().url().optional().describe("Contact website URL"),
    email: z.string().email().optional().describe("Contact email address"),
    additionalEmailAddresses: z
      .array(z.string().email())
      .optional()
      .describe("Additional email addresses"),
    skype: z.string().optional().describe("Skype username"),
    telegramId: z.string().optional().describe("Telegram ID"),
    telegram: z.string().optional().describe("Telegram username"),
    facebook: z.string().optional().describe("Facebook profile"),
    instagram: z.string().optional().describe("Instagram profile"),
    vk: z.string().optional().describe("VK profile"),
    position: z.string().optional().describe("Contact position/job title"),
    group: BaseEntitySchema.optional().describe("Contact group with id field"),
    isCompany: z
      .boolean()
      .optional()
      .describe("Whether this contact is a company"),
    isDeleted: z
      .boolean()
      .optional()
      .describe("Whether this contact is deleted"),
    birthDate: TimePointSchema.optional().describe("Contact birth date"),
    supervisors: PeopleRequestSchema.optional().describe(
      "Contact supervisors (users and groups)"
    ),
    phones: z
      .array(PhoneRequestSchema)
      .optional()
      .describe("Contact phone numbers"),
    companies: z
      .array(BaseEntitySchema)
      .optional()
      .describe("Companies associated with this contact"),
    contacts: z.array(BaseEntitySchema).optional().describe("Related contacts"),
    customFieldData: z
      .array(CustomFieldValueRequestSchema)
      .optional()
      .describe("Custom field values for the contact"),
    files: z
      .array(FileRequestSchema)
      .optional()
      .describe("Files attached to the contact"),
  })
  .strict();

// Contact filter schema for complex filtering
const ContactFilterSchema = z
  .object({
    type: z
      .number()
      .int()
      .describe(
        `Type of the filter: 12 - Create date, 4223 - Birth date with year, 4008 - Group ID, 4003 - Phone, 4005 - Part of email, 
        4026 - Email, 4011 - Birth date without year, 4002 - Position, 4019 - Gender, 4001 - Part of name, 4014 - First name,
        4222 - Middle name, 4015 - Last name, 4226 - Telegram username, 4234 - Telegram ID, and other custom field identifiers.`
      ),
    operator: z
      .enum(["equal", "notequal", "gt", "lt"])
      .describe("Filter operator"),
    value: z.any().describe("Filter value"),
  })
  .strict();

// Contact list request schema based on Planfix API
export const ContactListRequestSchema = z
  .object({
    offset: z
      .number()
      .min(0)
      .optional()
      .default(0)
      .describe("The offset for pagination, starting from 0"),
    pageSize: z
      .number()
      .min(1)
      .max(100)
      .optional()
      .default(100)
      .describe("The number of contacts to return per page"),
    fields: z
      .string()
      .optional()
      .default("id,name,email")
      .describe(
        `Fields to return in the contact list response separated by commas. Possible fields are: id, template,
        name, midname, lastname, gender, description, address, site, email, additionalEmailAddresses, skype,
        telegramId, telegram, facebook, instagram, vk, position, group, isCompany, isDeleted, birthDate,
        createdDate, dateOfLastUpdate, supervisors, phones, companies, contacts, files, dataTags,
        sourceObjectId, sourceDataVersion`
      ),
    prefixedId: z
      .boolean()
      .optional()
      .default(true)
      .describe("Flag for retrieving id with a prefix (e.g., 'contact:123')"),
    sourceId: z
      .string()
      .uuid()
      .optional()
      .describe("Unique identifier of external application"),
    filters: z
      .array(ContactFilterSchema)
      .optional()
      .describe("Array of filters to apply to the contact list"),
  })
  .strict();
