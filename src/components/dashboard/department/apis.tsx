import { iDepartment } from "./interface"
import axios from "axios"

export const getAllDepartments = async (
  hasUnMounted: Boolean,
  setDepartment: React.Dispatch<React.SetStateAction<iDepartment[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/department`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) setDepartment(res.data?.data)
      else setSnackbar({ open: true, message: "Failed to fetch department" })
    }
  } catch (err) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch department" })
    }
  }
}

export const createDepartment = async (
  body: iDepartment,
  setDepartment: React.Dispatch<React.SetStateAction<iDepartment[]>>,
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
  showSnackbar: Function
) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/department`, body)
    if (res.data.statusCode === 200) {
      setDepartment(state => ([...state, res.data.data[0]]))
      setOpenDialog(false)
      showSnackbar("New department has been created")
    }
    else {
      showSnackbar("Failed to create department")
    }
  } catch (err: any) {
    showSnackbar("Failed to create department")
  }
}

export const updateDepartment = async (
  newData: iDepartment,
  oldData: any,
  department: Array<iDepartment>,
  setDepartment: React.Dispatch<React.SetStateAction<iDepartment[]>>,
  showSnackbar: Function
) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/department/${oldData.uuid}`, newData)
    if (res.data.statusCode === 200) {
      const dataUpdate = [...department]
      const index = oldData.tableData.id
      dataUpdate[index] = res.data.data
      setDepartment([...dataUpdate])
      showSnackbar("Company data has been updated")
    }
    else {
      showSnackbar("Failed to update company data")
    }
  } catch (error: any) {
    showSnackbar("Failed to update company data")
  }
}

export const deleteDepartment = async (
  oldData: any,
  companies: Array<iDepartment>,
  setDepartment: React.Dispatch<React.SetStateAction<iDepartment[]>>,
  resolve: Function,
  reject: Function,
  showSnackbar: Function
) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/department/${oldData.uuid}`)
    if (res.data.statusCode === 200) {
      const dataDelete = [...companies]
      const index = oldData.tableData.id
      dataDelete.splice(index, 1)
      setDepartment([...dataDelete])
      resolve("department has been deleted")
      showSnackbar("Department has been deleted")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to delete department")
    }
  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to delete department")
  }
}