import { iuserRoles } from "./interface"
import axios from "axios"

export const getAllRoles = async (
  hasUnMounted: Boolean,
  getAllRoles: React.Dispatch<React.SetStateAction<iuserRoles[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/role`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) getAllRoles(res.data?.data)
      else setSnackbar({ open: true, message: "Failed to fetch roles" })
    }
  } catch (error) {
    if (!hasUnMounted) setSnackbar({ open: true, message: "Failed to fetch roles" })
  }
}

export const createRole = async (
  setRoles: React.Dispatch<React.SetStateAction<iuserRoles[]>>,
  body: iuserRoles,
  resolve: Function,
  reject: Function,
  showSnackbar: Function
) => {
  try {
    body.name = body.name.toLowerCase()
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/role`, body)
    if (res.data.statusCode === 200) {
      setRoles((roles: any) => ([...roles, res.data.data]))
      resolve("New role has been created")
      showSnackbar("New role has been created")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to create role")
    }

  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to create role")
  }
}

export const updateRole = async (
  roles: Array<iuserRoles>,
  setRoles: React.Dispatch<React.SetStateAction<iuserRoles[]>>,
  newData: iuserRoles,
  oldData: any,
  resolve: Function,
  reject: Function,
  showSnackbar: Function
) => {
  try {
    newData.name = newData.name.toLowerCase()
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/role/${oldData.uuid}`, newData)
    if (res.data.statusCode === 200) {
      const dataUpdate = [...roles]
      const index = oldData.tableData.id
      dataUpdate[index] = newData
      setRoles([...dataUpdate])
      resolve("Role has been updated")
      showSnackbar("Role has been updated")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to update role")
    }
  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to update role")
  }
}

export const deleteRole = async (
  oldData: any,
  role: Array<iuserRoles>,
  setRoles: React.Dispatch<React.SetStateAction<iuserRoles[]>>,
  resolve: Function,
  showSnackbar: Function,
  reject: Function
) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/role/${oldData.uuid}`)
    if (res.data.statusCode === 200) {
      const dataDelete = [...role]
      const index = oldData.tableData.id
      dataDelete.splice(index, 1)
      setRoles([...dataDelete])
      resolve("Role has been deleted")
      showSnackbar("Role has been deleted")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to delete role")
    }
  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to delete role")
  }
}

export const grantPermissionsToRole = async (
  body: any,
  showSnackbar: Function,
) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/role/rolesHasPermission`, body)
    if (res.data.statusCode === 200) {
      showSnackbar("Role permissions has been updated")
      return res.data
    }
    else {
      showSnackbar("Failed to update role permissions")
    }
  } catch (error: any) {
    showSnackbar("Failed to update role permissions")
  }
}