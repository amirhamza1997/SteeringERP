import { useEffect, useState } from "react"
import { Box } from "@material-ui/core"
import { tableColumns } from "./coulmn"
import { iTimeSheet } from './interface'
import { getAllTimeSheet } from "./apis"
import { useHistory, useLocation } from "react-router"
import Dashboard from ".."
import Table from "../../common/materialTable"
import pallete from "../../common/colors"
import NotificationSnackbar from "../../common/snackbar"
import { ArrowBack } from "@material-ui/icons"

export interface iHistoryProp {
  pathname: string,
  state: { taskId: string, task: object }
}
const TimeSheet = () => {
  const location: iHistoryProp = useLocation()
  const history = useHistory()
  const [timeSheet, setTimeSheet] = useState<iTimeSheet[]>([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  useEffect(() => {
    let hasUnMounted = false
    getAllTimeSheet(hasUnMounted, location?.state?.taskId, setTimeSheet, setSnackbar)

    return (() => {
      hasUnMounted = true
    })
  }, [location])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })

  const body = () => (
    <Box m={3}>
      <Table
        title="Time Sheet"
        columns={tableColumns}
        data={timeSheet}
        options={{
          headerStyle: { backgroundColor: pallete.blue200, color: pallete.secondary },
          actionsColumnIndex: -1,
          exportButton: true,
          filtering: true,
          pageSize: 10
        }}
        actions={[{ icon: () => <ArrowBack />, tooltip: 'Go Back', isFreeAction: true, onClick: () => history.goBack() }]}
      />
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </Box>
  )
  return <Dashboard body={body()} />
}

export default TimeSheet