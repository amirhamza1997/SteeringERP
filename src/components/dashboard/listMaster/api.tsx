import { iLists } from "./interface"
import axios from "axios"

export const getAllLists = async (
  hasUnMounted: Boolean,
  setLists: React.Dispatch<React.SetStateAction<iLists[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/list-master`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        setLists(res.data?.data)
      }
      else {
        setSnackbar({ open: true, message: "Failed to fetch lists" })
      }
    }
  } catch (error) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch lists" })
    }
  }
}

export const createList = async (
  newData: iLists,
  setLists: React.Dispatch<React.SetStateAction<iLists[]>>,
  lists: Array<iLists>,
  resolve: Function,
  showSnackbar: Function,
  reject: Function
) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/list-master/`, newData)
    if (res.data.statusCode === 200) {
      setLists([...lists, res.data.data])
      resolve("New list has been created")
      showSnackbar("New list has been created")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to create list")
    }
  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to create list")
  }
}

export const updateList = async (
  oldData: any,
  newData: iLists,
  lists: Array<iLists>,
  setLists: React.Dispatch<React.SetStateAction<iLists[]>>,
  resolve: Function,
  showSnackbar: Function,
  reject: Function
) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/list-master/${oldData.uuid}`, newData)
    if (res.data.statusCode === 200) {
      const dataUpdate = [...lists]
      const index = oldData.tableData.id
      dataUpdate[index] = newData
      setLists([...dataUpdate])
      resolve("List data has been updated")
      showSnackbar("List data has been updated")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to update list")
    }
  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to update list")
  }
}

export const deleteList = async (
  oldData: any,
  lists: Array<iLists>,
  setLists: React.Dispatch<React.SetStateAction<iLists[]>>,
  resolve: Function,
  showSnackbar: Function,
  reject: Function
) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/list-master/${oldData.uuid}`)
    if (res.data.statusCode === 200) {
      const dataDelete = [...lists]
      const index = oldData.tableData.id
      dataDelete.splice(index, 1)
      setLists([...dataDelete])
      resolve("List has been deleted")
      showSnackbar("List has been deleted")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to delete list")
    }
  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to delete list")
  }
}