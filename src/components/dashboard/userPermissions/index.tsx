import { useEffect, useState } from "react"
import { Box } from "@material-ui/core"
import { iPermission } from './interface'
import { createPermission, deletePermission, getAllPermissions, updatePermission } from "./apis"
import Dashboard from ".."
import Table from "../../common/materialTable"
import pallete from "../../common/colors"
import NotificationSnackbar from "../../common/snackbar"

const UserPermissions = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })
  const [permissions, setPermissions] = useState<any[]>([])

  useEffect(() => {
    let hasUnMounted = false
    getAllPermissions(hasUnMounted, setPermissions, setSnackbar)

    return (() => {
      hasUnMounted = true
    })
  }, [])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message })

  const tableColumns = [
    { title: "Permission", field: "name", cellStyle: { paddingTop: 8, paddingBottom: 8, fontSize: 15 }, type: "string" },
  ]

  const body = () => (
    <Box m={3}>
      <Table
        title="Permissions"
        columns={tableColumns}
        data={permissions}
        editable={{
          onRowAdd: (newData: iPermission) =>
            new Promise((resolve, reject) =>
              createPermission(setPermissions, newData, resolve, reject, showSnackbar)
            ),
          onRowUpdate: (newData: iPermission, oldData: any) =>
            new Promise((resolve, reject) =>
              updatePermission(permissions, setPermissions, newData, oldData, resolve, reject, showSnackbar)
            ),
          onRowDelete: (oldData: any) =>
            new Promise((resolve, reject) => {
              deletePermission(oldData, permissions, setPermissions, resolve, showSnackbar, reject)
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
  )

  return <Dashboard body={body()} />
}

export default UserPermissions