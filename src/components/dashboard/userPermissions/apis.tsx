import { iPermission } from "./interface"
import axios from "axios"

export const getAllPermissions = async (
  hasUnMounted: Boolean,
  setPermissions: React.Dispatch<React.SetStateAction<iPermission[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/permission`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) setPermissions(res.data?.data)
      else setSnackbar({ open: true, message: "Failed to fetch permissions" })
    }
  } catch (error) {
    if (!hasUnMounted) setSnackbar({ open: true, message: "Failed to fetch permissions" })
  }
}

export const createPermission = async (
  setPermissions: React.Dispatch<React.SetStateAction<any>>,
  body: iPermission,
  resolve: Function,
  reject: Function,
  showSnackbar: Function
) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/permission`, body)
    if (res.data.statusCode === 200) {
      setPermissions((permission: any) => ([...permission, res.data.data]))
      resolve("New permission has been created")
      showSnackbar("New permission has been created")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to create permission")
    }

  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to create permission")
  }
}

export const updatePermission = async (
  permissions: Array<iPermission>,
  setPermission: React.Dispatch<React.SetStateAction<any>>,
  newData: iPermission,
  oldData: any,
  resolve: Function,
  reject: Function,
  showSnackbar: Function
) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/permission/${oldData.uuid}`, newData)
    if (res.data.statusCode === 200) {
      const dataUpdate = [...permissions]
      const index = oldData.tableData.id
      dataUpdate[index] = newData
      setPermission([...dataUpdate])
      resolve("permission has been updated")
      showSnackbar("permission has been updated")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to update permission")
    }
  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to update permission")
  }
}

export const deletePermission = async (
  oldData: any,
  permissions: Array<iPermission>,
  setPermissions: React.Dispatch<React.SetStateAction<any>>,
  resolve: Function,
  showSnackbar: Function,
  reject: Function
) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/permission/${oldData.uuid}`)
    if (res.data.statusCode === 200) {
      const dataDelete = [...permissions]
      const index = oldData.tableData.id
      dataDelete.splice(index, 1)
      setPermissions([...dataDelete])
      resolve("permission has been deleted")
      showSnackbar("permission has been deleted")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to delete permission")
    }
  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to delete permission")
  }
}