import { Select, MenuItem } from "@material-ui/core"
import { iClient } from "./interface"

export const tableColumns = (company: any) => {
  const cellStyle = { paddingTop: 8, paddingBottom: 8, fontSize: 15 }
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const tableColumns = [
    {
      title: "Name", field: "name", type: "string", validate: (rowData: iClient) => Boolean(rowData.name),
      cellStyle: { paddingTop: 8, paddingBottom: 8, width: 150, fontSize: 15 }
    },
    { title: "Email", field: "email", filtering: false, cellStyle, type: "string", validate: (rowData: iClient) => rowData.email !== '' && emailRegex.test(rowData.email) },
    {
      title: "Company", field: "company", cellStyle, type: "string", validate: (rowData: iClient) => Boolean(rowData.company),
      render: (rowData: any) => company.map((item: any) => (item.uuid === rowData?.company[0]?.uuid || item.uuid === rowData?.company) && item?.name),
      editComponent: (props: any) => (
        <Select fullWidth value={(props?.value[0]?.uuid ?? props?.value) ?? ''} onChange={e => props.onChange(e.target.value)}>
          {company.map((item: any) => <MenuItem key={item.uuid} value={item.uuid}>{item?.name}</MenuItem>)}
        </Select>
      )
    },
    {
      title: "Profile", field: "profile", filtering: false, cellStyle, type: "string",
      validate: (rowData: iClient) => Boolean(rowData.profile),
      editComponent: (props: any) => (
        <Select fullWidth value={props.value ?? ''} onChange={e => props.onChange(e.target.value)}>
          {['John', 'Michael', 'Anna', 'Rose'].map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
        </Select>
      )
    },
    {
      title: "Phone", field: "phone", filtering: false, type: "numeric",
      cellStyle: { paddingTop: 8, paddingBottom: 8, textAlign: "center", fontSize: 15 },
      headerStyle: { textAlign: "left" },
      validate: (rowData: iClient) => Boolean(rowData.phone)
    },
    {
      title: "Location", field: "location", filtering: false, cellStyle, type: "string",
      validate: (rowData: iClient) => Boolean(rowData.location),
      editComponent: (props: any) => (
        <Select fullWidth value={props.value ?? ''} onChange={e => props.onChange(e.target.value)}>
          {['Location A', 'location B', 'Location C'].map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
        </Select>
      )
    },
    {
      title: "Timezone", field: "timezone", filtering: false, cellStyle, type: "string",
      validate: (rowData: iClient) => Boolean(rowData.timezone),
      editComponent: (props: any) => (
        <Select fullWidth value={props.value ?? ''} onChange={e => props.onChange(e.target.value)}>
          {['Eastern', 'Western', 'Local'].map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
        </Select>
      )
    },
    { title: "Communication", field: "communication", filtering: false, cellStyle, type: "string", validate: (rowData: iClient) => Boolean(rowData.communication) },
    {
      title: "Billing Cycle", field: "billingCycle", filtering: false, cellStyle, type: "string",
      validate: (rowData: iClient) => Boolean(rowData.billingCycle),
      editComponent: (props: any) => (
        <Select fullWidth value={props.value ?? ''} onChange={e => props.onChange(e.target.value)}>
          {['weekly', 'biweekly', 'monthly', 'other'].map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
        </Select>
      )
    },
    {
      title: "Billing Mode", field: "billingMode", filtering: false, cellStyle, type: "string",
      validate: (rowData: iClient) => Boolean(rowData.billingMode),
      editComponent: (props: any) => (
        <Select fullWidth value={props.value ?? ''} onChange={e => props.onChange(e.target.value)}>
          {['weekly', 'biweekly', 'monthly', 'other'].map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
        </Select>
      )
    },
    { title: "Relocation", field: "relocation", filtering: false, type: "boolean", cellStyle },
    { title: "Remote", field: "remote", filtering: false, type: "boolean", cellStyle },
  ]

  return tableColumns
}