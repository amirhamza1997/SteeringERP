import { Box } from "@material-ui/core"
import { deleteProject, fetchProjects, getAllCompanies } from "./api"
import { iProject } from './interface'
import { iClient } from "../clients/interface"
import { tableColumns } from "./column"
import { getAllemploys } from "../employee/api"
import { getAllClients } from "../clients/apis"
import { Add, Details, Edit } from "@material-ui/icons"
import { useHistory } from "react-router"
import { useEffect, useState } from "react"
import Dashboard from ".."
import Table from "../../common/materialTable"
import pallete from '../../common/colors'
import NotificationSnackbar from '../../common/snackbar'
import Cookies from "js-cookie"

const Projects = () => {
  const history = useHistory()
  const [projects, setProjects] = useState<iProject[]>([])
  const [clients, setClients] = useState<iClient[]>([])
  const [employees, setEmployees] = useState<any[]>([])
  const [company, setCompany] = useState<any[]>([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  useEffect(() => {
    let hasUnMounted = false
    fetchProjects(hasUnMounted, setProjects, setSnackbar)
    getAllemploys(hasUnMounted, setEmployees, setSnackbar)
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
        title="Projects"
        columns={tableColumns(employees, clients, company)}
        data={projects}
        editable={Cookies.get("userRole")?.includes("sales") ? {
          onRowDelete: (oldData: any) =>
            new Promise((resolve, reject) => {
              deleteProject(projects, setProjects, oldData, resolve, reject, showSnackbar)
            }),
        } : {}}
        options={{
          headerStyle: { backgroundColor: pallete.blue200, color: pallete.secondary },
          actionsColumnIndex: -1,
          exportButton: true,
          filtering: true,
          pageSize: 10
        }}
        actions={[
          Cookies.get("userRole")?.includes("sales") && {
            icon: () => <Add />,
            tooltip: 'Create Project',
            isFreeAction: true,
            onClick: () => history.push({ pathname: '/project/create', state: { page: 'create' } })
          },
          {
            icon: () => <Details />,
            tooltip: 'Project Detail',
            onClick: (e: any, rowData: any) => history.push({ pathname: `/project/detail`, state: rowData })
          },
          Cookies.get("userRole")?.includes("sales") && {
            icon: () => <Edit />,
            tooltip: 'Edit Project',
            onClick: (e: any, rowData: any) => history.push({ pathname: `/project/${rowData.uuid}`, state: { page: "edit" } })
          }
        ]}
      />
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </Box>
  );

  return <Dashboard body={body()} />;
}

export default Projects;