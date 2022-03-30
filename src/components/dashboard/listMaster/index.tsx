import { useState, useEffect } from "react"
import { Box } from "@material-ui/core"
import { iLists } from './interface'
import { tableColumns } from "./column"
import { getAllLists, createList, updateList, deleteList } from "./api"
import Dashboard from ".."
import Table from "../../common/materialTable"
import pallete from "../../common/colors"
import NotificationSnackbar from "../../common/snackbar"

const Lists = () => {
  const [lists, setLists] = useState<iLists[]>([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  useEffect(() => {
    let hasUnMounted = false
    getAllLists(hasUnMounted, setLists, setSnackbar)

    return (() => {
      hasUnMounted = true
    })
  }, [])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message })

  const body = () => (
    <Box m={3}>
      <Table
        title="Lists"
        columns={tableColumns}
        data={lists}
        editable={{
          onRowAdd: (newData: iLists) =>
            new Promise((resolve, reject) => {
              createList(newData, setLists, lists, resolve, showSnackbar, reject)
            }),
          onRowUpdate: (newData: iLists, oldData: any) =>
            new Promise((resolve, reject) => {
              updateList(oldData, newData, lists, setLists, resolve, showSnackbar, reject)
            }),
          onRowDelete: (oldData: any) =>
            new Promise((resolve, reject) => {
              deleteList(oldData, lists, setLists, resolve, showSnackbar, reject)
            }),
        }}
        options={{
          headerStyle: { backgroundColor: pallete.blue200, color: pallete.secondary },
          actionsColumnIndex: -1,
          exportButton: true,
          filtering: true,
        }}
      />
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </Box>
  )

  return <Dashboard body={body()} />
}

export default Lists
