import { useState, useEffect } from "react"
import { Box } from "@material-ui/core"
import { getAllAttendance } from "./apis"
import { tableColumns } from "./coulmn"
import { iAttendance } from './interface'
import Dashboard from ".."
import Table from "../../common/materialTable"
import pallete from "../../common/colors"
import NotificationSnackbar from "../../common/snackbar"

const Attendance = () => {
  const [attendance, setAttendance] = useState<iAttendance[]>([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  useEffect(() => {
    let hasUnMounted = false
    getAllAttendance(hasUnMounted, setAttendance, setSnackbar)

    return (() => {
      hasUnMounted = true
    })
  }, [])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })

  const body = () => (
    <Box m={3}>
      <Table
        title="Attendance"
        columns={tableColumns}
        data={attendance}
        options={{
          headerStyle: { backgroundColor: pallete.blue200, color: pallete.secondary },
          actionsColumnIndex: -1,
          exportButton: true,
          filtering: true,
          pageSize: 10,
          paging: false,
        }}
      />
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </Box>
  )
  return <Dashboard body={body()} />
}

export default Attendance