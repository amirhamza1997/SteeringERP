import { useEffect, useState } from "react"
import { Box } from "@material-ui/core"
import Dashboard from ".."
import Table from "../../common/materialTable"
import NotificationSnackbar from "../../common/snackbar"
import { createCompany, deleteCompany, getAllCompanies, updateCompany } from "./apis"
import { tableColumns } from "./column"
import pallete from "../../common/colors"
import { iCompany } from "./interface"

const Company = () => {
  const [company, setCompany] = useState<any>()
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  useEffect(() => {
    let hasUnMounted = false
    getAllCompanies(hasUnMounted, setCompany, setSnackbar)
    return (() => {
      hasUnMounted = true
    })
  }, [])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message })

  const body = () => (
    <div className="company">
      <Box m={3}>
        <Table
          title="Companies"
          columns={tableColumns(company)}
          data={company}
          editable={{
            onRowAdd: (newData: iCompany) =>
              new Promise((resolve, reject) => {
                createCompany(newData, company, setCompany, resolve, reject, showSnackbar)
              }),
            onRowUpdate: (newData: iCompany, oldData: any) =>
              new Promise((resolve, reject) => {
                updateCompany(newData, oldData, company, setCompany, resolve, reject, showSnackbar)
              }),
            onRowDelete: (oldData: any) =>
              new Promise((resolve, reject) => {
                deleteCompany(oldData, company, setCompany, resolve, reject, showSnackbar)
              }),
          }}
          options={{
            headerStyle: { backgroundColor: pallete.blue200, color: pallete.secondary },
            actionsColumnIndex: -1,
            exportButton: true,
            filtering: true,
            pageSize: 10
          }}
        />
        {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
      </Box>
    </div>
  )

  return <Dashboard body={body()} />
}

export default Company
