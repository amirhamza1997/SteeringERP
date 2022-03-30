import { Box } from "@material-ui/core";
import { iTimeSheet } from "./interface";

const cellStyle = { paddingTop: 8, paddingBottom: 8, fontSize: 15 }

export const tableColumns = [
  { title: "Task", field: "task.title", cellStyle, type: "string", },
  { title: "Employee", field: "employee.fullName", cellStyle, type: "string", },
  { title: "Date", field: "date", filtering: false, cellStyle, type: "date", },
  { title: "Dev Hours", field: "billedHoursDev", filtering: false, cellStyle, type: "numeric", },
  { title: "Pm Hours", field: "billedHoursPM", filtering: false, cellStyle, type: "numeric" },
  { title: "Billable", field: "billable", filtering: false, cellStyle, type: "boolean" },
  { title: "Approved by Supv", field: "approvedBySupervisor", filtering: false, cellStyle, type: "boolean" },
  { title: "Approved by PM", field: "approvedByProjectManager", filtering: false, cellStyle, type: "boolean" },
  {
    title: "Notes", field: "notes", filtering: false, cellStyle, type: "string",
    render: (rowData: iTimeSheet) => (
      <Box style={{ maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>{rowData.notes}</Box>
    )
  },
]