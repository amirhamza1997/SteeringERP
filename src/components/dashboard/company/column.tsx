import { iCompany } from "./interface"
import { Box } from "@material-ui/core"

export const tableColumns = (company:any) => {
  const cellStyle = { paddingTop: 8, paddingBottom: 8, fontSize: 15 }

  const tableColumns = [
    { title: "Name", field: "name", cellStyle, type: "string", validate: (rowData: iCompany) => Boolean(rowData.name) },
    {
      title: "BankId", field: "bankId", filtering: false, type: "string", cellStyle, validate: (rowData: iCompany) => Boolean(rowData.bankId)
    },
    {
      title: "Currency", field: "currency", filtering: false, type: "string", cellStyle, lookup: { USD: "USD", PKR: "PKR" },  validate: (rowData: iCompany) => Boolean(rowData.currency)
    },
    {
      title: "Managing", field: "managing", type: "boolean", cellStyle, validate: (rowData: iCompany) => Boolean(rowData.address)
    },
    {
      title: "Address", field: "address", filtering: false, type: "string", cellStyle,
      validate: (rowData: iCompany) => Boolean(rowData.address),
      render: (rowData: iCompany) => (
        <Box style={{ maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>{rowData.address}</Box>
        )
      },
  ]
  return tableColumns
}