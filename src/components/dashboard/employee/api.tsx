import { iEmployee } from "./interface"
import axios from "axios"

export const getAllemploys = async (
  hasUnMounted: Boolean,
  setEmployee: React.Dispatch<React.SetStateAction<iEmployee[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/employee`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        setEmployee(res.data?.data)
      }
      else
        setSnackbar({ open: true, message: "Failed to fetch employees" })
    }
  } catch (error) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch employees" })
    }
  }
}

export const createEmployee = async (
  body: iEmployee,
  setEmployee: React.Dispatch<React.SetStateAction<iEmployee[]>>,
  showSnackbar: Function
) => {
  try {
    body.role = body.role.toLowerCase()
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/employee/`, body)
    if (res.data.statusCode === 200) {
      setEmployee(res.data.data)
      showSnackbar("New employee has been created")
    }
    else {
      showSnackbar("Failed to create employee")
    }
  } catch (error: any) {
    showSnackbar("Failed to create employee")
  }
}

export const deleteEmployee = async (
  oldData: any,
  employee: Array<iEmployee>,
  setEmployee: React.Dispatch<React.SetStateAction<iEmployee[]>>,
  resolve: Function,
  showSnackbar: Function,
  reject: Function
) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/employee/${oldData.uuid}`)
    if (res.data.statusCode === 200) {
      const dataDelete = [...employee]
      const index = oldData.tableData.id
      dataDelete.splice(index, 1)
      setEmployee([...dataDelete])
      resolve("Employee has been deleted")
      showSnackbar("Employee has been deleted")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to delete employee")
    }
  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to delete employee")
  }
}