import { useEffect, useState } from "react"
import { Box } from "@material-ui/core"
import { iClient, iSnackBar } from './interface'
import { getAllClients, deleteClient } from './apis'
import { Details, Add, Edit } from "@material-ui/icons"
import { useHistory } from "react-router"
import { tableColumns } from "./column"
import { getAllCompanies } from "../projects/api"
import { iCompany } from "../company/interface"
import Dashboard from ".."
import Table from "../../common/materialTable"
import pallete from "../../common/colors"
import NotificationSnackbar from "../../common/snackbar"

const Clients = () => {
  const history = useHistory()
  const [clients, setClients] = useState<iClient[]>([])
  const [company, setCompany] = useState<iCompany[]>([])
  const [snackbar, setSnackbar] = useState<iSnackBar>({ open: false, message: '' })

  useEffect(() => {
    let hasUnMounted = false
    getAllClients(hasUnMounted, setClients, setSnackbar)
    getAllCompanies(hasUnMounted, setCompany, setSnackbar)

    return (() => {
      hasUnMounted = true
    })
  }, [])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message })

  const body = () => (
    <Box m={3}>
      <Table
        title="Clients"
        columns={tableColumns(company)}
        data={clients}
        editable={{
          onRowDelete: (oldData: any) =>
            new Promise((resolve, reject) => {
              deleteClient(oldData, clients, setClients, resolve, reject, showSnackbar)
            }),
        }}
        options={{
          headerStyle: { backgroundColor: pallete.blue200, color: pallete.secondary },
          actionsColumnIndex: -1,
          exportButton: true,
          filtering: true,
          pageSize: 10
        }}
        actions={[
          { icon: () => <Add />, tooltip: 'Creat Client', isFreeAction: true, onClick: () => history.push({ pathname: '/client/create', state: { page: 'create' } }) },
          { icon: () => <Details />, tooltip: 'Client Detail', onClick: (event: any, rowData: any) => history.push({ pathname: '/client/detail', state: rowData }) },
          { icon: () => <Edit />, tooltip: 'Edit Client', onClick: (e: any, rowData: any) => history.push({ pathname: `/client/${rowData.uuid}`, state: { page: "edit" } }) }
        ]}
      />
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </Box>
  )

  return <Dashboard body={body()} />
}

export default Clients
