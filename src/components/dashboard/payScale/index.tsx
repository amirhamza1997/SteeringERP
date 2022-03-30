import { useEffect, useState } from "react"
import { Box } from "@material-ui/core"
import { iPayScale } from './interface'
import { getAllPayScale, deletePayScale, createPayScale, updatePayScale } from './apis'
import Dashboard from ".."
import Table from "../../common/materialTable"
import pallete from "../../common/colors"
import NotificationSnackbar from "../../common/snackbar"

const PayScale = () => {
  const [payScale, setpayScale] = useState<iPayScale[]>([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  useEffect(() => {
    let hasUnMounted = false
    getAllPayScale(hasUnMounted, setpayScale, setSnackbar)

    return (() => {
      hasUnMounted = true
    })
  }, [])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message })

  const tableColumns = [
    { title: "Description", field: "description", cellStyle: { paddingTop: 8, paddingBottom: 8, fontSize: 15 }, type: "string" },
    { title: "Amount Start", field: "amountStart", filtering: false, cellStyle: { paddingTop: 8, paddingBottom: 8, fontSize: 15 }, type: "string" },
    { title: "Amount End", field: "amountEnd", filtering: false, cellStyle: { paddingTop: 8, paddingBottom: 8, fontSize: 15 }, type: "string" },
    { title: "No Of Steps", field: "noOfSteps", filtering: false, cellStyle: { paddingTop: 8, paddingBottom: 8, fontSize: 15 }, type: "string" },
  ]

  const body = () => (
    <Box m={3}>
      <Table
        title="Pay Scales"
        columns={tableColumns}
        data={payScale}
        editable={{
          onRowAdd: (newData: iPayScale) =>
            new Promise((resolve, reject) =>
              createPayScale(setpayScale, newData, resolve, reject, showSnackbar)
            ),
          onRowUpdate: (newData: iPayScale, oldData: any) =>
            new Promise((resolve, reject) =>
              updatePayScale(payScale, setpayScale, newData, oldData, resolve, reject, showSnackbar)
            ),
          onRowDelete: (oldData: any) =>
            new Promise((resolve, reject) => {
              deletePayScale(oldData, payScale, setpayScale, resolve, showSnackbar, reject)
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

export default PayScale