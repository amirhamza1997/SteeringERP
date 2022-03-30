const cellStyle = { paddingTop: 8, paddingBottom: 8, fontSize: 15 }

export const tableColumns = [
  { title: "Employee Code", field: "employeeCode", cellStyle, type: "string" },
  { title: "Reader ID", field: "ReaderID", cellStyle, type: "string" },
  { title: "Full Name", field: "fullName", cellStyle, type: "string" },
  { title: "Email", field: "email", filtering: false, cellStyle, type: "string" },
  { title: "Designation", field: "designation.name", cellStyle, type: "string" },
  { title: "Department", field: "department.name", cellStyle, type: "string" },
  { title: "Shift", field: "shift.name", cellStyle, type: "string" },
  { title: "Status", field: "employeeStatus", cellStyle, type: "string", defaultFilter: "Active" },
  { title: "Company", field: "company.name", cellStyle, type: "string" },
  { title: "Reports To", field: "reportTo", cellStyle, type: "string" },
  { title: "Phone No", field: "phoneNo", filtering: false, cellStyle, type: "string" },
  { title: "DOB", field: "dateOfBirth", filtering: false, cellStyle, type: "date" },
]