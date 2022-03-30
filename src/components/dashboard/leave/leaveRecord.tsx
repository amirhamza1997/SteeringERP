import { useState, useEffect } from "react"
import { Box } from "@material-ui/core"
import { leaveRecordColumns } from "./coulmn"
import { getEmployeeLeaveRecord } from "./api"
import { useHistory, useLocation } from "react-router"
import Dashboard from ".."
import Table from "../../common/materialTable"
import pallete from "../../common/colors"
import NotificationSnackbar from "../../common/snackbar"
import { Details } from "@material-ui/icons"

const LeaveRecord = () => {
  const location = useLocation()
  const history = useHistory()
  const [leavesRecord, setLeavesRecord] = useState<any>([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  useEffect(() => {
    let hasUnMounted = false
    getEmployeeLeaveRecord(hasUnMounted, setLeavesRecord, setSnackbar)

    return (() => {
      hasUnMounted = true
    })
  }, [location.pathname])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })

  const body = () => (
    <Box m={3}>
      <Table
        title="Employee Leave Record"
        columns={leaveRecordColumns}
        data={leavesRecord}
        options={{
          headerStyle: { backgroundColor: pallete.blue200, color: pallete.secondary },
          actionsColumnIndex: -1,
          exportButton: true,
          filtering: true,
          pageSize: 10
        }}
        actions={[
          (rowData: any) => ({
            icon: () => <Details />,
            tooltip: 'Leave History',
            onClick: (e: any, rowData: any) => history.push({ pathname: `/employees/leave-history/${rowData.uuid}` })
          }),
        ]}
      />
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </Box>
  )
  return <Dashboard body={body()} />
}

export default LeaveRecord