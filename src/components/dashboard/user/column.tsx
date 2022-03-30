const cellStyle = { paddingTop: 8, paddingBottom: 8, fontSize: 15 }

export const tableColumns = [
  { title: "User Name", field: "fullName", cellStyle, type: "string" },
  { title: "Email", field: "email", filtering: false, cellStyle, type: "time" },
  { title: "Type", field: "type", filtering: false, cellStyle, type: "string" },
  { title: "Role", field: "role", filtering: false, cellStyle, type: "string", render: (rowData: any) => rowData.roles.map((x: any) => x.name).join(', ') },
  { title: "Status", field: "status", cellStyle, filtering: false, type: "string" },
  { title: "Created By", field: "createdBy", cellStyle, filtering: false, type: "string" },
  { title: "Updated By", field: "updatedBy", cellStyle, filtering: false, type: "string" },
]