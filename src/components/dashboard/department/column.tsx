import { MenuItem, Select } from "@material-ui/core"
import { iDepartment } from "./interface"

export const tableColumns = (employees: any) => {
  const cellStyle = { paddingTop: 8, paddingBottom: 8, fontSize: 15 }

  const tableColumns = [
    { title: "Department Name", field: "name", cellStyle, type: "string", validate: (rowData: iDepartment) => Boolean(rowData.name) },
    {
      title: "Department Head", field: "departmentHead", type: "string", cellStyle,
      validate: (rowData: iDepartment) => Boolean(rowData.departmentHead),
      render: (rowData: any) => employees.map((item: any) => (item.uuid === rowData?.departmentHead?.uuid || item.uuid === rowData?.departmentHead) && item?.fullName),
      editComponent: (props: any) => (
        <Select fullWidth value={(props?.value?.uuid ?? props?.value) ?? ''} onChange={e => props.onChange(e.target.value)}>
          {employees.map((item: any) => <MenuItem key={item.uuid} value={item.uuid}>{item?.fullName}</MenuItem>)}
        </Select>
      )
    },
    { title: "Designation", field: "departmentHead.designation.name", type: "string", cellStyle, editable: 'never' },
    { title: "Email", field: "departmentHead.email", type: "string", cellStyle, editable: 'never' },
    { title: "Phone No", field: "departmentHead.phoneNo", type: "string", cellStyle, editable: 'never' }
  ]
  return tableColumns
}