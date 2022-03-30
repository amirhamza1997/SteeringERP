import { iTask } from "./interface"
import { Box, MenuItem, Select } from "@material-ui/core"

export const tableColumns = (tasks: any) => {
  const cellStyle = { paddingTop: 8, paddingBottom: 8, fontSize: 15 }

  const tableColumns = [
    { title: "Assign Date", field: "timestamps.createdAt", cellStyle, type: "date" },
    { title: "Title", field: "title", cellStyle, type: "string" },
    {
      title: "Project", field: "project", type: "string", cellStyle, editable: 'onAdd',
      render: (rowData: any) => rowData?.project?.name,
      editComponent: (props: any) => (
        <Select fullWidth value={(props?.value?.uuid ?? props?.value) ?? ''} onChange={e => props.onChange(e.target.value)}>
          {tasks.map((item: any) => <MenuItem key={item.uuid} value={item.uuid}>{item?.name}</MenuItem>)}
        </Select>
      )
    },
    {
      title: "Task Summary", field: "description", filtering: false, type: "string", cellStyle,
      render: (rowData: iTask) => (
        <Box style={{ maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", textAlign: "center" }}>{rowData.description}</Box>
      )
    },
    {
      title: "Estimated Hours", field: "estimatedHours", filtering: false, cellStyle, type: "string",
      render: (rowData: iTask) => (
        <Box style={{ maxWidth: 110 }}>{rowData.estimatedHours}</Box>
      )
    },
    { title: "Deadline Date", field: "deadline", filtering: false, cellStyle, type: "datetime" },
    {
      title: "Notes", field: "note", filtering: false, type: "string", cellStyle,
      render: (rowData: iTask) => (
        <Box style={{ maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>{rowData.note}</Box>
      )
    },
  ]
  return tableColumns
}