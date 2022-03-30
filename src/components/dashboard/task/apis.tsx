import { iTask } from "./interface"
import axios from "axios"
import Cookies from "js-cookie"

export const getAllTasks = async (
  hasUnMounted: Boolean,
  setTask: React.Dispatch<React.SetStateAction<iTask[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    let taskApi = `${process.env.REACT_APP_BASE_URL}/task/employee/${Cookies.get('employeeId')}`
    if (Cookies.get("userRole")?.includes("pm")) {
      let projects = await axios.get(`${process.env.REACT_APP_BASE_URL}/project/manager/${Cookies.get('employeeId')}`)
      let projectsIds: string[] = []
      projects.data?.data.map((item: any) => projectsIds.push(item.uuid))
      taskApi = `${process.env.REACT_APP_BASE_URL}/task/project/${projectsIds.join(",")}`
    }
    const res = await axios.get(taskApi)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) setTask(res.data?.data)
      else {
        setSnackbar({ open: true, message: "Failed to fetch Tasks" })
      }
    }
  } catch (error) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch Tasks" })
    }
  }
}

export const getSpecificTask = async (
  hasUnMounted: boolean,
  tasksId: string,
  setGetOneTAsk: React.Dispatch<React.SetStateAction<iTask>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/task/find/${tasksId}`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        setGetOneTAsk(res.data.data)
      }
      else {
        setSnackbar({ open: true, message: "Failed to fetch Tasks" })
      }
    }
  } catch (error: any) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch Task" })
    }
  }
}

export const createTask = async (
  body: iTask,
  showSnackbar: Function
) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/task`, body)
    if (res.data.statusCode === 200) {
      showSnackbar("New task has been created")
    }
    else {
      showSnackbar("Failed to create task")
    }
  } catch (error: any) {
    showSnackbar("Failed to create task")
  }
}

export const updateTask = async (
  tasksId: string,
  body: iTask,
  showSnackbar: Function
) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/task/${tasksId}`, body)
    if (res.data.statusCode === 200) {
      showSnackbar("Task data has been updated")
    }
    else {
      showSnackbar("Failed to update Task data")
    }
  } catch (error: any) {
    showSnackbar("Failed to update Task data")
  }
}

export const deleteTask = async (
  oldData: any,
  tasks: Array<iTask>,
  setTask: React.Dispatch<React.SetStateAction<iTask[]>>,
  resolve: Function,
  reject: Function,
  showSnackbar: Function
) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/task/${oldData.uuid}`)
    if (res.data.statusCode === 200) {
      const dataDelete = [...tasks]
      const index = oldData.tableData.id
      dataDelete.splice(index, 1)
      setTask([...dataDelete])
      resolve("Task has been deleted")
      showSnackbar("Task has been deleted")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to delete Task")
    }
  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to delete Task")
  }
}