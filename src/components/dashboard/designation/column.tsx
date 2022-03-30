import { MenuItem, Select } from "@material-ui/core"
import { iDepartment } from "../department/interface"
import { iPayScale } from "../payScale/interface"
import { iDesignation } from "./interface"

export const tableColumns = (department: iDepartment[], payScale: iPayScale[]) => {
  const cellStyle = { paddingTop: 8, paddingBottom: 8, fontSize: 15 }

  const tableColumns = [
    { title: "Designation", field: "name", cellStyle, type: "string", validate: (rowData: iDesignation) => Boolean(rowData.name) },
    {
      title: "Department", field: "department", type: "string", cellStyle,
      validate: (rowData: iDesignation) => Boolean(rowData.department),
      render: (rowData: any) => department.map((item: any) => (item.uuid === rowData?.department?.uuid || item.uuid === rowData?.department) && item?.name),
      editComponent: (props: any) => (
        <Select fullWidth value={(props?.value?.uuid ?? props?.value) ?? ''} onChange={e => props.onChange(e.target.value)}>
          {department.map((item: any) => <MenuItem key={item.uuid} value={item.uuid}>{item?.name}</MenuItem>)}
        </Select>
      )
    },
    {
      title: "Pay Scale", field: "payScale", type: "string", cellStyle,
      validate: (rowData: iDesignation) => Boolean(rowData.payScale),
      render: (rowData: any) => payScale.map((item: any) => (item.uuid === rowData?.payScale?.uuid || item.uuid === rowData?.payScale) && item?.description),
      editComponent: (props: any) => (
        <Select fullWidth value={(props?.value?.uuid ?? props?.value) ?? ''} onChange={e => props.onChange(e.target.value)}>
          {payScale.map((item: any) => <MenuItem key={item.uuid} value={item.uuid}>{item?.description}</MenuItem>)}
        </Select>
      )
    },
  ]

  return tableColumns
}