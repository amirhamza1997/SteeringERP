import { iLists } from "./interface"

const cellStyle = { paddingTop: 8, paddingBottom: 8, fontSize: 15 }

export const tableColumns = [
  { title: "Title", field: "title", cellStyle, type: "string", validate: (rowData: iLists) => Boolean(rowData.title) },
  { title: "Boold Group", field: "", filtering: false, cellStyle, type: "string" },
  { title: "Client Location", field: "", filtering: false, cellStyle, type: "string" },
  { title: "TimeZone", field: "", filtering: false, cellStyle, type: "string" },
  { title: "Billing Mode", field: "", filtering: false, cellStyle, type: "string" },
  { title: "Billing Cycle", field: "", filtering: false, cellStyle, type: "string" },
  { title: "Project Term", field: "", filtering: false, cellStyle, type: "string" },
  { title: "Task Status", field: "", filtering: false, cellStyle, type: "string" },
  { title: "Task Rating", field: "", filtering: false, cellStyle, type: "string" },
]