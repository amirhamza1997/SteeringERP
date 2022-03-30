import { iDesignation } from "./interface"
import axios from "axios"

export const getAllDesignation = async (
  hasUnMounted: Boolean,
  setDepartment: React.Dispatch<React.SetStateAction<iDesignation[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/designation`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) setDepartment(res.data?.data)
      else setSnackbar({ open: true, message: "Failed to fetch designation" })
    }
  } catch (err) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch designation" })
    }
  }
}

export const createDesignation = async (
  newData: iDesignation,
  designation: Array<iDesignation>,
  setDesignation: React.Dispatch<React.SetStateAction<iDesignation[]>>,
  resolve: Function,
  reject: Function,
  showSnackbar: Function
) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/designation`, newData)
    if (res.data.statusCode === 200) {
      setDesignation([...designation, res.data.data])
      resolve("New designation has been created")
      showSnackbar("New designation has been created")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to create designation")
    }
  } catch (err: any) {
    reject(err.message)
    showSnackbar("Failed to create designation")
  }
}

export const updateDesignation = async (
  newData: iDesignation,
  oldData: any,
  designation: Array<iDesignation>,
  setDesignation: React.Dispatch<React.SetStateAction<iDesignation[]>>,
  resolve: Function,
  reject: Function,
  showSnackbar: Function
) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/designation/${oldData.uuid}`, newData)
    if (res.data.statusCode === 200) {
      const dataUpdate = [...designation]
      const index = oldData.tableData.id
      dataUpdate[index] = newData
      setDesignation([...dataUpdate])
      resolve("designation data has been updated")
      showSnackbar("Designation data has been updated")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to update designation data")
    }
  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to update designation data")
  }
}

export const deleteDesignation = async (
  oldData: any,
  designation: Array<iDesignation>,
  setDesignation: React.Dispatch<React.SetStateAction<iDesignation[]>>,
  resolve: Function,
  reject: Function,
  showSnackbar: Function
) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/designatin/find/${oldData.uuid}`)
    if (res.data.statusCode === 200) {
      const dataDelete = [...designation]
      const index = oldData.tableData.id
      dataDelete.splice(index, 1)
      setDesignation([...dataDelete])
      resolve("designation has been deleted")
      showSnackbar("Designation has been deleted")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to delete designation")
    }
  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to delete designation")
  }
}