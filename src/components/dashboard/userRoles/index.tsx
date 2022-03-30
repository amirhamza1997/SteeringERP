import { useEffect, useState } from "react"
import { Box, DialogContent, DialogContentText, FormControlLabel, FormGroup } from "@material-ui/core"
import { iuserRoles } from './interface'
import { createRole, deleteRole, getAllRoles, grantPermissionsToRole, updateRole } from "./apis"
import { iPermission } from "../userPermissions/interface"
import { getAllPermissions } from "../userPermissions/apis"
import Dashboard from ".."
import Table from "../../common/materialTable"
import pallete from "../../common/colors"
import NotificationSnackbar from "../../common/snackbar"
import MuiButton from "../../common/button"
import MuiDialog from "../../common/dialog"
import MuiCheckBox from "../../common/checkBox"

const UserRoles = () => {
  const [roles, setRoles] = useState<any>([])
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })
  const [rowData, setRowData] = useState<any>({})
  const [permissions, setPermissions] = useState<iPermission[]>([])

  useEffect(() => {
    let hasUnMounted = false
    getAllRoles(hasUnMounted, setRoles, setSnackbar)
    getAllPermissions(hasUnMounted, setPermissions, setSnackbar)

    return (() => {
      hasUnMounted = true
    })
  }, [])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message })

  const tableColumns = [
    { title: "Role", field: "name", filtering: false, cellStyle: { paddingTop: 8, paddingBottom: 8, fontSize: 15 }, type: "string" },
    {
      title: 'Permissions', field: 'permissions', editable: 'never', filtering: false,
      render: (rowData: any) => <MuiButton onClick={() => { setOpenDialog(true); setRowData(rowData) }} label="Permissions" className="primaryBtn" />
    }
  ]

  const handleGrantPermissionsChange = (item: iPermission) => {
    let data = { ...rowData }
    let index = data.permissions.findIndex((x: iPermission) => x.uuid === item.uuid)
    if (index === -1) data.permissions.push(item)
    else data.permissions.splice(index, 1)
    setRowData(data)
  }

  const handleGrantPermission = () => {
    const payload = {
      role: rowData.uuid,
      permission: rowData.permissions?.map((x: iPermission) => x.uuid) ?? []
    }

    grantPermissionsToRole(payload, showSnackbar).then(res => {
      if (res.statusCode === 200) {
        let data = [...roles]
        const index = rowData.tableData.id
        data[index] = rowData
        setRoles(data)
        setRowData({})
        setOpenDialog(false)
      }
    })
  }

  const permissionDialogContent = () => (
    <DialogContent>
      <DialogContentText id="task-time-description">Please provide respective permissions to the role.</DialogContentText>
      <Box py={1}>
        <FormGroup row>
          {permissions.map((item: iPermission, idx: number) => <FormControlLabel
            key={idx}
            control={
              <MuiCheckBox
                name={item.name}
                isChecked={rowData?.permissions?.findIndex((y: iPermission) => y.uuid === item.uuid) !== -1}
                onChange={(e: any) => handleGrantPermissionsChange(item)}
              />
            }
            label={item.name}
          />
          )}
        </FormGroup>
      </Box>
    </DialogContent>
  )

  const body = () => (
    <Box m={3}>
      <Table
        title="User Roles"
        columns={tableColumns}
        data={roles}
        editable={{
          onRowAdd: (newData: iuserRoles) =>
            new Promise((resolve, reject) =>
              createRole(setRoles, newData, resolve, reject, showSnackbar)
            ),
          onRowUpdate: (newData: iuserRoles, oldData: any) =>
            new Promise((resolve, reject) =>
              updateRole(roles, setRoles, newData, oldData, resolve, reject, showSnackbar)
            ),
          onRowDelete: (oldData: any) =>
            new Promise((resolve, reject) => {
              deleteRole(oldData, roles, setRoles, resolve, showSnackbar, reject)
            }),
        }}
        options={{
          headerStyle: { backgroundColor: pallete.blue200, color: pallete.secondary },
          actionsColumnIndex: -1,
          exportButton: true,
          pageSize: 10
        }}
      />
      <MuiDialog
        open={openDialog}
        handleClose={() => { setOpenDialog(false); setRowData({}) }}
        handleSave={() => handleGrantPermission()}
        handleClickOpen={() => undefined}
        buttonLabel=""
        buttonClass="primaryBtn"
        dialogContent={permissionDialogContent()}
        dialogTitle="Permissions"
        isButtonRequired={false}
      />
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </Box>
  )

  return <Dashboard body={body()} />
}

export default UserRoles