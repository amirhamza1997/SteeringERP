import { useState, useEffect } from "react"
import { Box } from "@material-ui/core"
import { leaveHistoryColoumns } from "./coulmn"
import { getAllLeaves } from "./api"
import { useHistory, useLocation, useParams } from "react-router"
import Dashboard from ".."
import Table from "../../common/materialTable"
import pallete from "../../common/colors"
import NotificationSnackbar from "../../common/snackbar"
import { ArrowBack } from "@material-ui/icons"

const LeaveListing = () => {
  const location = useLocation()
  const history = useHistory()
  const { empId }: { empId: string } = useParams()
  const [leaves, setLeaves] = useState<any>([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  useEffect(() => {
    let hasUnMounted = false
    getAllLeaves(hasUnMounted, empId, setLeaves, setSnackbar)

    return (() => {
      hasUnMounted = true
    })
  }, [empId])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })

  const body = () => (
    <Box m={3}>
      <Table
        title={location.pathname.includes("/employees/leave-history") ? " Employee Leave Record" : "My Leave History"}
        columns={leaveHistoryColoumns}
        data={leaves}
        options={{
          headerStyle: { backgroundColor: pallete.blue200, color: pallete.secondary },
          actionsColumnIndex: -1,
          exportButton: true,
          filtering: true,
          pageSize: 10
        }}
        actions={[
          { icon: () => <ArrowBack />, isFreeAction: true, tooltip: 'Go Back', onClick: (e: any, rowData: any) => history.goBack() },
        ]}
      />
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </Box>
  )
  return <Dashboard body={body()} />
}

export default LeaveListing