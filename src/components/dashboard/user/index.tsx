import { useState, useEffect } from "react"
import { Box } from "@material-ui/core"
import { tableColumns } from "./column"
import { Add, Edit } from "@material-ui/icons"
import { useHistory } from "react-router-dom"
import Dashboard from ".."
import Table from "../../common/materialTable"
import pallete from "../../common/colors"
import NotificationSnackbar from "../../common/snackbar"
import { deleteUser, getAllUsers } from "./apis"

const User = () => {
  const history = useHistory()
  const [users, setUsers] = useState<any[]>([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  useEffect(() => {
    let hasUnMounted = false
    getAllUsers(hasUnMounted, setUsers, setSnackbar)

    return (() => {
      hasUnMounted = true
    })
  }, [])

  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message })
  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })

  const body = () => (
    <Box m={3}>
      <Table
        title="Users"
        columns={tableColumns}
        data={users}
        editable={{
          onRowDelete: (oldData: any) =>
            new Promise((resolve, reject) => {
              deleteUser(oldData, users, setUsers, resolve, reject, showSnackbar)
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
            tooltip: 'Create User',
            isFreeAction: true,
            onClick: (event: any, rowData: any) => history.push('/user/create')
          },
          {
            icon: () => <Edit />,
            tooltip: 'Edit User',
            onClick: (e: any, rowData: any) => history.push(`/user/edit/${rowData.uuid}`),
          }
        ]}
      />
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </Box>
  )
  return <Dashboard body={body()} />
}

export default User