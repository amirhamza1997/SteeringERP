import { Box } from "@material-ui/core"

const cellStyle = { paddingTop: 8, paddingBottom: 8, fontSize: 15 }
const getTime = (time: string) => `${((new Date(time).getUTCHours() + 11) % 12 + 1)} : ${new Date(time).getUTCMinutes()} ${(new Date(time).getUTCHours() >= 12) ? 'pm' : 'am'}`

export const tableColumns = [
  {
    title: 'S.No', field: 'tableData.id', cellStyle: { width: 100, minWidth: 100, paddingTop: 8, paddingBottom: 8, fontSize: 15 }, headerStyle: { width: 100, minWidth: 100 },
    filtering: false, render: (rowData: any) => rowData.tableData.id + 1
  },
  {
    title: "Employee code", field: "employeeCode", type: "string", editable: 'never',
    cellStyle: { width: 100, minWidth: 100, paddingTop: 8, paddingBottom: 8, fontSize: 15 }, headerStyle: { width: 100, minWidth: 100 },
  },
  { title: "Full Name", field: "fullName", cellStyle, type: "string", editable: 'never' },
  { title: "Department", field: "department", cellStyle, type: "string", editable: 'never' },
  { title: "Office shift", field: "shift", cellStyle, type: "string", editable: 'never' },
  { title: "Designation", field: "designation", cellStyle, type: "string", editable: 'never' },
  { title: "Date", field: "EntDate", defaultFilter: Date.now(), cellStyle, type: "date", editable: 'never' },
  {
    title: "In Time", field: "inTime", filtering: false, cellStyle, type: "time", editable: 'never',
    render: (rowData: any) => <Box>{new Date(rowData.inTime).getUTCHours() !== 0 ? getTime(rowData.inTime) : `0 : 0`}</Box>
  },
  {
    title: "Out Time", field: "outTime", filtering: false, cellStyle, type: "time", editable: 'never',
    render: (rowData: any) => <Box>{new Date(rowData.outTime).getUTCHours() !== 0 ? getTime(rowData.outTime) : `0 : 0`}</Box>
  },
  { title: "Status", field: "status", cellStyle, type: "string", lookup: { present: "Present", remote: "Remote", absent: "Absent", leave: "Leave" } },
  {
    title: "Late", field: "late", type: "string", lookup: { true: "Late", false: "On Time", null: "No Record" }, editable: 'never',
    cellStyle: { width: 140, minWidth: 140, paddingTop: 8, paddingBottom: 8, fontSize: 15 }, headerStyle: { width: 140, minWidth: 140 },
  },
]