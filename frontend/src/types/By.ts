// Contains column names of many tables
// Used as arguments for filter, and sort  query actions
// Change this enum if you rename any columns in the DB tables
export enum By{
    TASK_TITLE = "title",
    TASK_DESCRIPTION = "description",
    TASK_STATUS = "status",
    TASK_PRIORITY = "priority",
    TASK_CREATION_DATE = "created_at",
    TASK_MODIFICATION_DATE = "updated_at",
    TASK_ID="id",
    OWNER_ID="user_id"

}