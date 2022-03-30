const cellStyle = { paddingTop: 8, paddingBottom: 8, fontSize: 15 }

export const tableColumns = [
  { title: "Shift Title", field: "name", cellStyle, type: "string" },
  { title: "Time Start", field: "timeStart", filtering: false, cellStyle, type: "time" },
  { title: "Hours Duration", field: "hoursDuration", filtering: false, cellStyle, type: "string", render: (rowData: any) => rowData.hoursDuration && `${rowData.hoursDuration} hours` },
  { title: "Late Flexibility", field: "lateFlexibility", cellStyle, filtering: false, type: "string", render: (rowData: any) => rowData.lateFlexibility && `${rowData.lateFlexibility} minutes` },
  { title: "Early Leave Flexibility", field: "earlyLeaveFlexibility", filtering: false, cellStyle, type: "string", render: (rowData: any) => rowData.earlyLeaveFlexibility && `${rowData.earlyLeaveFlexibility} minutes` },
]