import { useEffect, useState } from "react"
import { Box } from "@material-ui/core"
import { createDesignation, deleteDesignation, getAllDesignation, updateDesignation } from "./apis"
import { tableColumns } from "./column"
import { iDesignation } from "./interface"
import { getAllDepartments } from "../department/apis"
import { iDepartment } from "../department/interface"
import { iPayScale } from "../payScale/interface"
import { getAllPayScale } from "../payScale/apis"
import Dashboard from ".."
import Table from "../../common/materialTable"
import NotificationSnackbar from "../../common/snackbar"
import pallete from "../../common/colors"

const Designation = () => {
  const [department, setDepartment] = useState<iDepartment[]>([])
  const [designation, setDesignation] = useState<iDesignation[]>([])
  const [payScale, setPayScale] = useState<iPayScale[]>([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  useEffect(() => {
    let hasUnMounted = false
    getAllDesignation(hasUnMounted, setDesignation, setSnackbar)
    getAllDepartments(hasUnMounted, setDepartment, setSnackbar)
    getAllPayScale(hasUnMounted, setPayScale, setSnackbar)
    return (() => {
      hasUnMounted = true
    })
  }, [])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message })

  const body = () => (
    <Box m={3}>
      <Table
        title="Designations"
        columns={tableColumns(department, payScale)}
        data={designation}
        editable={{
          onRowDelete: (oldData: iDesignation) => new Promise((resolve, reject) => deleteDesignation(oldData, designation, setDesignation, resolve, reject, showSnackbar)),
          onRowAdd: (newData: iDesignation) => new Promise((resolve, reject) => createDesignation(newData, designation, setDesignation, resolve, reject, showSnackbar)),
          onRowUpdate: (newData: iDesignation, oldData: iDesignation) => new Promise((resolve, reject) => updateDesignation(newData, oldData, designation, setDesignation, resolve, reject, showSnackbar))
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

export default Designation
