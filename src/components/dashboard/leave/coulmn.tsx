const cellStyle = { paddingTop: 8, paddingBottom: 8, fontSize: 15 }

export const leaveHistoryColoumns = [
  { title: "Employee", field: "requestBy.fullName", cellStyle, type: "string" },
  { title: "Leave Type", field: "leaveType.title", filtering: false, cellStyle, type: "date" },
  { title: "Request Date", field: "requestDate", filtering: false, cellStyle, type: "date" },
  { title: "Requested From", field: "requestedFrom", filtering: false, cellStyle, type: "date" },
  { title: "Requested To", field: "requestedTo", filtering: false, cellStyle, type: "date" },
  { title: "Approved On", field: "approvedOn", filtering: false, cellStyle, type: "date" },
  { title: "Approved From", field: "approvedFrom", filtering: false, cellStyle, type: "date" },
  { title: "Approved To", field: "approvedTo", filtering: false, cellStyle, type: "date" },
  { title: "Recommended By", field: "recommendedByHod.fullName", filtering: false, cellStyle, type: "string" },
  { title: "Approved By", field: "approvedBy.fullName", filtering: false, cellStyle, type: "string" },
  {
    title: "Recommendation Status", field: "recommendationStatus", cellStyle, type: "string",
    render: (rowData: any) => (
      rowData.recommendationStatus === "Declined" ? <p style={{ color: "red" }}>{rowData.recommendationStatus}</p> : <p style={{ color: "green" }}>{rowData.recommendationStatus}</p>
    )
  },
  {
    title: "Leave Status", field: "status", cellStyle, type: "string",
    render: (rowData: any) => <p style={{ color: rowData.status === "Declined" ? "red" : "green" }}>{rowData.status.toUpperCase()}</p>
  },
  { title: "Remaining", field: "remaining", filtering: false, cellStyle, type: "string" },
  { title: "Hours", field: "hours", filtering: false, cellStyle, type: "string" },
]

export const leaveRecordColumns = [
  { title: "Employee", field: "employeeName", cellStyle, type: "string" },
  { title: "Medical Leave", field: "Medical Leave", filtering: false, cellStyle, type: "string" },
  { title: "Casual Leave", field: "Casual Leave", filtering: false, cellStyle, type: "string" },
  { title: "Maternity Leave", field: "Maternity Leave", filtering: false, cellStyle, type: "string" },
  { title: "Paternity Leave", field: "Paternity Leave", filtering: false, cellStyle, type: "string" },
]