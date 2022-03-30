import { SyntheticEvent, useEffect, useState } from "react"
import { Box, DialogContent, DialogContentText } from "@material-ui/core"
import { createDepartment, deleteDepartment, getAllDepartments, updateDepartment } from "./apis"
import { tableColumns } from "./column"
import { iDepartment } from "./interface"
import { iEmployee } from "../employee/interface"
import { getAllemploys } from "../employee/api"
import { Add, Edit } from "@material-ui/icons"
import Dashboard from ".."
import Table from "../../common/materialTable"
import NotificationSnackbar from "../../common/snackbar"
import pallete from "../../common/colors"
import MuiDialog from "../../common/dialog"
import MuiSelect from "../../common/select"
import MuiTextfield from "../../common/textInput"

const Department = () => {
  const [department, setDepartment] = useState<iDepartment[]>([])
  const [employees, setEmployees] = useState<iEmployee[]>([])
  const [formValues, setformValues] = useState<any>({})
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  useEffect(() => {
    let hasUnMounted = false
    getAllDepartments(hasUnMounted, setDepartment, setSnackbar)
    getAllemploys(hasUnMounted, setEmployees, setSnackbar)
    return (() => {
      hasUnMounted = true
    })
  }, [])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message })

  const handleChange = (e: any) => setformValues((state: any) => ({ ...state, [e.target.name]: e.target.value }))

  const dialogContent = () => (
    <DialogContent>
      <DialogContentText id="task-time-description">Please provide following information to create a new department.</DialogContentText>
      <Box py={1}>
        <MuiTextfield label="Department Name" name="name" defaultValue={formValues.name ? formValues.name : ""} placeholder="E.g. lorem ipsum" variant="outlined" type="text" fullWidth onChange={handleChange} />
      </Box>
      <Box py={1}>
        <MuiSelect
          variant="outlined"
          name="departmentHead"
          defaultValue={formValues.departmentHead ? formValues.departmentHead.fullName : ""}
          label="Department Head"
          data={employees.map(x => x.fullName)}
          size="medium"
          onChange={handleChange}
          fullWidth
        />
      </Box>
    </DialogContent>
  )

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (formValues.name && formValues.departmentHead) {
      const employee: iEmployee[] = employees.filter(item => item.fullName === formValues.departmentHead)
      formValues.departmentHead = formValues.dialog === "create" ? employee[0].uuid : formValues.departmentHead.uuid ?? employee[0].uuid
      const { departmentHead, name } = formValues
      formValues.dialog === "create" ?
        createDepartment({ departmentHead, name }, setDepartment, setOpenDialog, showSnackbar) :
        updateDepartment({ departmentHead, name }, formValues, department, setDepartment, showSnackbar)
      setformValues({})
      setOpenDialog(false)
    } else {
      showSnackbar("Form is incomplete")
    }
  }

  const body = () => (
    <Box m={3}>
      <Table
        title="Departments"
        columns={tableColumns(employees)}
        data={department}
        editable={{
          onRowDelete: (oldData: any) => new Promise((resolve, reject) => { deleteDepartment(oldData, department, setDepartment, resolve, reject, showSnackbar) })
        }}
        actions={[
          { icon: () => <Add />, tooltip: 'Create Department', isFreeAction: true, onClick: () => { setformValues((state: any) => ({ ...state, dialog: "create" })); setOpenDialog(true) } },
          { icon: () => <Edit />, tooltip: 'Edit Department', onClick: (e: any, rowData: any) => { setformValues({ dialog: "edit", ...rowData }); setOpenDialog(true) } }
        ]}
        options={{
          headerStyle: { backgroundColor: pallete.blue200, color: pallete.secondary },
          actionsColumnIndex: -1,
          exportButton: true,
          filtering: true,
          pageSize: 10
        }}
      />
      <MuiDialog
        isButtonRequired={false}
        open={openDialog}
        handleClose={() => { setOpenDialog(false); setformValues({}) }}
        handleSave={handleFormSubmit}
        handleClickOpen={() => setOpenDialog(true)}
        buttonLabel="Create"
        buttonClass="primaryBtn"
        dialogContent={dialogContent()}
        dialogTitle={formValues.dialog === "edit" ? "Edit Department" : "Create Department"}
      />
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </Box>
  )

  return <Dashboard body={body()} />
}

export default Department
