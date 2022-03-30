import { iShift } from "./interface"
import axios from "axios"

export const getAllShift = async (
  hasUnMounted: Boolean,
  setShift: React.Dispatch<React.SetStateAction<iShift[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/shift`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        setShift(res.data?.data)
      }
      else {
        setSnackbar({ open: true, message: "Failed to fetch Shift" })
      }
    }
  } catch (err) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch Shift" })
    }
  }
}
export const getSpecificShift = async (
  hasUnMounted: boolean,
  shiftId: string,
  setGetOneShift: React.Dispatch<React.SetStateAction<iShift>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/shift/find/${shiftId}`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        setGetOneShift(res.data.data)
      }
      else {
        setSnackbar({ open: true, message: "Failed to fetch Shift" })
      }
    }
  } catch (error: any) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch Shift" })
    }
  }
}

export const createShift = async (
  body: iShift,
  showSnackbar: Function
) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/shift`, body)
    if (res.data.statusCode === 200) {
      showSnackbar("New Shift has been created")
    }
    else {
      showSnackbar("Failed to create Shift")
    }
  } catch (error: any) {
    showSnackbar("Failed to create Shift")
  }
}

export const updateShift = async (
  shiftId: string,
  body: iShift,
  showSnackbar: Function
) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/shift/${shiftId}`, body)
    if (res.data.statusCode === 200) {
      showSnackbar("Shift data has been updated")
    }
    else {
      showSnackbar("Failed to update Shift data")
    }
  } catch (error: any) {
    showSnackbar("Failed to update Shift data")
  }
}
export const deleteShift = async (
  oldData: any,
  shift: Array<iShift>,
  setShift: React.Dispatch<React.SetStateAction<iShift[]>>,
  resolve: Function,
  reject: Function,
  showSnackbar: Function
) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/shift/${oldData.uuid}`)
    if (res.data.statusCode === 200) {
      const dataDelete = [...shift]
      const index = oldData.tableData.id
      dataDelete.splice(index, 1)
      setShift([...dataDelete])
      resolve("Shift has been deleted")
      showSnackbar("Shift has been deleted")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to delete Shift")
    }
  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to delete Shift")
  }
}