import { iProject } from "./interface"
import { iClient } from "../clients/interface"
import { Select, MenuItem, Input, Box } from "@material-ui/core"
import Cookies from "js-cookie"

export const tableColumns = (employees: any, clients: Array<iClient>, company: any) => {

  const cellStyle = { paddingTop: 8, paddingBottom: 8, fontSize: 15 }
  const renderResources = (rowData: iProject) => {
    let resources: Array<[]> = []
    employees.forEach((emp: any) => {
      if (rowData.resources.length) {
        rowData.resources.forEach((res: any) => {
          if (emp.uuid === res?.uuid) resources.push(emp?.fullName)
        })
      }
    })
    return resources.join(', ')
  }

  const columns = [
    { title: "Project Name", field: "name", cellStyle, type: "string", validate: (rowData: iProject) => Boolean(rowData.name) },
    {
      title: "Company", field: "company", cellStyle, type: "string", validate: (rowData: iProject) => Boolean(rowData.company),
      render: (rowData: any) => company.map((item: any) => (item.uuid === rowData?.company?.uuid || item.uuid === rowData?.company) && item?.name),
      editComponent: (props: any) => (
        <Select fullWidth value={(props?.value?.uuid ?? props?.value) ?? ''} onChange={e => props.onChange(e.target.value)}>
          {company.map((item: any) => <MenuItem key={item.uuid} value={item.uuid}>{item?.name}</MenuItem>)}
        </Select>
      )
    },
    {
      title: "Description", field: "description", filtering: false, type: "string", validate: (rowData: iProject) => Boolean(rowData.description),
      render: (rowData: iProject) => (
        <Box
          style={{ maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
        >
          {rowData.description}
        </Box>
      )
    },
    { title: "Start date", field: "startDate", filtering: false, cellStyle, type: "date", validate: (rowData: iProject) => Boolean(rowData.startDate) },
    { title: "Close Date", field: "closeDate", filtering: false, cellStyle, type: "date", validate: (rowData: iProject) => Boolean(rowData.closeDate) },
    {
      title: "Voice", field: "voice", filtering: false, cellStyle, type: "string", validate: (rowData: iProject) => Boolean(rowData.voice),
      render: (rowData: any) => employees.map((item: any) => (item.uuid === rowData?.voice?.uuid || item.uuid === rowData?.voice) && item?.fullName),
      editComponent: (props: any) => (
        <Select fullWidth value={(props?.value?.uuid ?? props?.value) ?? ''} onChange={e => props.onChange(e.target.value)}>
          {employees.map((item: any) => <MenuItem key={item.uuid} value={item.uuid}>{item?.fullName}</MenuItem>)}
        </Select>
      )
    },
    { title: "Term", field: "term", filtering: false, cellStyle, type: "string", validate: (rowData: iProject) => Boolean(rowData.term) },
    { title: "Currency", field: "currency", filtering: false, cellStyle, type: "string", validate: (rowData: iProject) => Boolean(rowData.currency) },
    {
      title: "Rate", field: "rate", filtering: false, type: "numeric", validate: (rowData: iProject) => Boolean(rowData.rate),
      cellStyle: { paddingTop: 8, paddingBottom: 8, textAlign: "center" },
      headerStyle: { textAlign: "left" },
    },
    {
      title: "Technology", field: "typeOfWork", filtering: false, cellStyle, type: "string", validate: (rowData: iProject) => Boolean(rowData.typeOfWork),
      render: (rowData: iProject) => (
        <Box
          style={{ maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
        >
          {rowData.typeOfWork}
        </Box>
      )
    },
    {
      title: "Manager", field: "manager", filtering: false, cellStyle, type: "string", validate: (rowData: iProject) => Boolean(rowData.manager),
      render: (rowData: any) => employees.map((item: any) => (item.uuid === rowData?.manager?.uuid || item.uuid === rowData?.manager) && item?.fullName),
      editComponent: (props: any) => (
        <Select fullWidth value={(props?.value?.uuid ?? props?.value) ?? ''} onChange={e => props.onChange(e.target.value)}>
          {employees.map((item: any) => <MenuItem key={item.uuid} value={item.uuid}>{item?.fullName}</MenuItem>)}
        </Select>
      )
    },
    {
      title: "Notes", field: "notes", filtering: false, cellStyle, type: "string", validate: (rowData: iProject) => Boolean(rowData.notes),
      render: (rowData: iProject) => (
        <Box
          style={{ maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
        >
          {rowData.notes}
        </Box>
      )
    },
    {
      title: "Client", field: "client", filtering: false, cellStyle, type: "string",
      validate: (rowData: iProject) => Boolean(rowData.client),
      render: (rowData: any) => clients.map((item: any) => ((item.uuid === rowData?.client?.uuid || item.uuid === rowData?.client)) && item.name),
      editComponent: (props: any) => (
        <Select fullWidth value={(props?.value?.uuid ?? props?.value) ?? ''} onChange={e => props.onChange(e.target.value)}>
          {clients.map((item: iClient) => <MenuItem key={item.uuid} value={item.uuid}>{item.name}</MenuItem>)}
        </Select>
      )
    },
    {
      title: "Resources", field: "resources", filtering: false, cellStyle, type: "string",
      validate: (rowData: iProject) => Boolean(rowData.resources),
      render: (rowData: any) => renderResources(rowData),
      editComponent: (props: any) => {
        let resourceIds: Array<[]> = []
        props.value && props.value.map((item: any) => item !== undefined && resourceIds.push(item.uuid ? item.uuid : item))
        return (
          <Select
            style={{ maxWidth: 150 }}
            value={resourceIds ?? []}
            onChange={e => props.onChange(e.target.value)}
            input={<Input />}
            multiple
            fullWidth
          >
            {employees.map((item: any) => <MenuItem key={item.uuid} value={item.uuid}>{item?.fullName}</MenuItem>)}
          </Select>
        )
      }
    },
  ]

  if (Cookies.get("userRole")?.includes("sales")) {
    columns.push(
      { title: "Billing Email", field: "billingEmail", filtering: false, cellStyle, type: "string", validate: (rowData: iProject) => Boolean(rowData.billingEmail) },
      { title: "Project Type", field: "projectType", filtering: false, cellStyle, type: "string", validate: (rowData: iProject) => Boolean(rowData.projectType) },
      { title: "Rate", field: "rate", filtering: false, type: "numeric", validate: (rowData: iProject) => Boolean(rowData.rate), cellStyle },
      { title: "Term", field: "term", filtering: false, cellStyle, type: "string", validate: (rowData: iProject) => Boolean(rowData.term) },
    )
  }

  return columns
}

