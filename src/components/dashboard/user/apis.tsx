import { iUser } from "./interface"
import axios from "axios"

export const getAllUsers = async (
  hasUnMounted: Boolean,
  setUsers: React.Dispatch<React.SetStateAction<iUser[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        setUsers(res.data?.data)
      }
      else {
        setSnackbar({ open: true, message: "Failed to fetch users" })
      }
    }
  } catch (err) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch users" })
    }
  }
}

export const getSpecificUser = async (
  hasUnMounted: boolean,
  userId: string,
  setUser: React.Dispatch<React.SetStateAction<iUser>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/find/${userId}`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        setUser(res.data.data)
      }
      else {
        setSnackbar({ open: true, message: "Failed to fetch user" })
      }
    }
  } catch (error: any) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch user" })
    }
  }
}

export const createUser = async (
  body: iUser,
  showSnackbar: Function
) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/user`, body)
    if (res.data.statusCode === 200) {
      showSnackbar("New user has been created")
    }
    else {
      showSnackbar("Failed to create user")
    }
  } catch (error: any) {
    showSnackbar("Failed to create user")
  }
}

export const updateUser = async (
  userId: string,
  body: iUser,
  showSnackbar: Function
) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/user/${userId}`, body)
    if (res.data.statusCode === 200) {
      showSnackbar("User has been updated")
    }
    else {
      showSnackbar("Failed to update user")
    }
  } catch (error: any) {
    showSnackbar("Failed to update user")
  }
}

export const deleteUser = async (
  oldData: any,
  user: Array<iUser>,
  setUsers: React.Dispatch<React.SetStateAction<iUser[]>>,
  resolve: Function,
  reject: Function,
  showSnackbar: Function
) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/user/${oldData.uuid}`)
    if (res.data.statusCode === 200) {
      const dataDelete = [...user]
      const index = oldData.tableData.id
      dataDelete.splice(index, 1)
      setUsers([...dataDelete])
      resolve("User has been deleted")
      showSnackbar("User has been deleted")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to delete user")
    }
  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to delete user")
  }
}