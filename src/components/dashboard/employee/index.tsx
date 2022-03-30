import { useEffect, useState } from "react"
import { Box } from "@material-ui/core"
import { iEmployee } from './interface'
import { tableColumns } from "./column"
import { getAllemploys, deleteEmployee } from './api'
import { Add, Details, Edit } from "@material-ui/icons"
import { useHistory } from "react-router"
import Dashboard from ".."
import Table from "../../common/materialTable"
import pallete from "../../common/colors"
import NotificationSnackbar from "../../common/snackbar"

const Employees = () => {
  const history = useHistory()
  const [employee, setEmployee] = useState<iEmployee[]>([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  useEffect(() => {
    let hasUnMounted = false
    getAllemploys(hasUnMounted, setEmployee, setSnackbar)

    return (() => {
      hasUnMounted = true
    })
  }, [])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message })

  const body = () => (
    <Box m={3}>
      <Table
        title="Employees"
        columns={tableColumns}
        data={employee}
        editable={{
          onRowDelete: (oldData: any) =>
            new Promise((resolve, reject) => {
              deleteEmployee(oldData, employee, setEmployee, resolve, showSnackbar, reject)
            }),
        }}
        actions={[
          {
            icon: () => <Add />,
            tooltip: 'Create Employee',
            isFreeAction: true,
            onClick: () => history.push({ pathname: '/hr/employees/create' })
          },
          (rowData: any) => ({
            icon: () => <Details />,
            tooltip: 'Employee Detail',
            onClick: (e: any, rowData: any) => history.push({ pathname: `/hr/employees/detail/${rowData.uuid}` })
          }),
          (rowData: any) => ({
            icon: () => <Edit />,
            tooltip: 'Edit Employee',
            onClick: (e: any, rowData: any) => history.push({ pathname: `/hr/employees/edit/${rowData.uuid}` })
          })
        ]}
        options={{
          headerStyle: { backgroundColor: pallete.blue200, color: pallete.secondary },
          actionsColumnIndex: -1,
          exportButton: true,
          filtering: true,
          pageSize: 10,
        }}
      />
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </Box>
  )

  return <Dashboard body={body()} />
}

export default Employees
