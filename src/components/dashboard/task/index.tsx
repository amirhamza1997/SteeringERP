import { useState, useEffect } from "react"
import { tableColumns } from "./column"
import { getAllTasks, deleteTask } from "./apis"
import { Box } from "@material-ui/core"
import { iTask } from './interface'
import { Add, Details, Edit } from "@material-ui/icons"
import { useHistory } from "react-router"
import { getAllemploys } from "../employee/api"
import { iEmployee } from "../employee/interface"
import { fetchProjects } from "../projects/api"
import { iProject } from "../projects/interface"
import Dashboard from ".."
import Table from "../../common/materialTable"
import pallete from "../../common/colors"
import NotificationSnackbar from "../../common/snackbar"

const Tasks = () => {
  const history = useHistory()
  const [tasks, setTasks] = useState<iTask[]>([])
  const [employees, setEmployees] = useState<iEmployee[]>([])
  const [projects, setProjects] = useState<iProject[]>([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  useEffect(() => {
    let hasUnMounted = false
    getAllemploys(hasUnMounted, setEmployees, setSnackbar)
    fetchProjects(hasUnMounted, setProjects, setSnackbar)
    getAllTasks(hasUnMounted, setTasks, setSnackbar)

    return (() => { hasUnMounted = true })
  }, [])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message })

  const body = () => (
    <Box m={3}>
      <Table
        title="Tasks"
        columns={tableColumns(tasks)}
        data={tasks}
        editable={{
          onRowDelete: (oldData: any) =>
            new Promise((resolve, reject) => {
              deleteTask(oldData, tasks, setTasks, resolve, reject, showSnackbar)
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
          {
            icon: () => <Add />,
            tooltip: 'Create Task',
            isFreeAction: true,
            onClick: (event: any, rowData: any) => history.push({ pathname: '/task/create', state: { projects, employees, page: 'create' } })
          },
          {
            icon: () => <Details />,
            tooltip: 'Task Detail',
            onClick: (event: any, rowData: any) => history.push({ pathname: '/tasks/detail', state: rowData })
          },
          {
            icon: () => <Edit />,
            tooltip: 'Edit Task',
            onClick: (e: any, rowData: any) => history.push({ pathname: `/task/${rowData.uuid}`, state: { projects, employees, page: "edit", data: rowData } }),
          }
        ]}
      />
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </Box>
  )

  return <Dashboard body={body()} />
}
export default Tasks