import { useState, useEffect } from "react"
import { Box } from "@material-ui/core"
import { tableColumns } from "./column"
import { iShift } from './interface'
import { deleteShift, getAllShift } from "./apis"
import { Add, Edit } from "@material-ui/icons"
import { useHistory } from "react-router-dom"
import Dashboard from ".."
import Table from "../../common/materialTable"
import pallete from "../../common/colors"
import NotificationSnackbar from "../../common/snackbar"

const Shift = () => {
  const history = useHistory()
  const [shift, setShift] = useState<iShift[]>([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  useEffect(() => {
    let hasUnMounted = false
    getAllShift(hasUnMounted, setShift, setSnackbar)

    return (() => {
      hasUnMounted = true
    })
  }, [])

  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message })
  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })

  const body = () => (
    <Box m={3}>
      <Table
        title="Office Shifts"
        columns={tableColumns}
        data={shift}
        editable={{
          onRowDelete: (oldData: any) =>
            new Promise((resolve, reject) => {
              deleteShift(oldData, shift, setShift, resolve, reject, showSnackbar)
            }),
        }}
        options={{
          headerStyle: { backgroundColor: pallete.blue200, color: pallete.secondary },
          actionsColumnIndex: -1,
          exportButton: true,
          filtering: true,
          pageSize: 10
        }}
        actions={[
          {
            icon: () => <Add />,
            tooltip: 'Create Shift',
            isFreeAction: true,
            onClick: (event: any, rowData: any) => history.push({ pathname: '/shift/create', state: { page: 'create' } })
          },
          {
            icon: () => <Edit />,
            tooltip: 'Edit Shift',
            onClick: (e: any, rowData: any) => history.push({ pathname: `/shift/${rowData.uuid}`, state: { page: "edit", data: rowData } }),
          }
        ]}
      />
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </Box>
  )
  return <Dashboard body={body()} />
}

export default Shift