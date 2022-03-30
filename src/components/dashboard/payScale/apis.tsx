import { iPayScale } from "./interface"
import axios from "axios"

export const getAllPayScale = async (
  hasUnMounted: Boolean,
  setPayScale: React.Dispatch<React.SetStateAction<iPayScale[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/pay-scale`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        setPayScale(res.data?.data)
      }
      else
        setSnackbar({ open: true, message: "Failed to fetch Pay Scale" })
    }
  } catch (error) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch Pay Scale" })
    }
  }
}

export const createPayScale = async (
  setPayScale: React.Dispatch<React.SetStateAction<iPayScale[]>>,
  body: iPayScale,
  resolve: Function,
  reject: Function,
  showSnackbar: Function
) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/pay-scale`, body)
    if (res.data.statusCode === 200) {
      setPayScale((PayScale: any) => ([...PayScale, res.data.data]))
      resolve("New Pay Scale has been created")
      showSnackbar("New Pay Scale has been created")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to create Pay Scale")
    }

  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to create Pay Scale")
  }
}

export const updatePayScale = async (
  payScale: Array<iPayScale>,
  setPayScale: React.Dispatch<React.SetStateAction<iPayScale[]>>,
  newData: iPayScale,
  oldData: any,
  resolve: Function,
  reject: Function,
  showSnackbar: Function
) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/pay-scale/${oldData.uuid}`, newData)
    if (res.data.statusCode === 200) {
      const dataUpdate = [...payScale]
      const index = oldData.tableData.id
      dataUpdate[index] = newData
      setPayScale([...dataUpdate])
      resolve("Pay Scale data has been updated")
      showSnackbar("Pay Scale data has been updated")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to update Pay Scale data")
    }
  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to update Pay Scale data")
  }
}

export const deletePayScale = async (
  oldData: any,
  employee: Array<iPayScale>,
  setPayScale: React.Dispatch<React.SetStateAction<iPayScale[]>>,
  resolve: Function,
  showSnackbar: Function,
  reject: Function
) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/pay-scale/${oldData.uuid}`)
    if (res.data.statusCode === 200) {
      const dataDelete = [...employee]
      const index = oldData.tableData.id
      dataDelete.splice(index, 1)
      setPayScale([...dataDelete])
      resolve("Pay Scale has been deleted")
      showSnackbar("Pay Scale has been deleted")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to delete Pay Scale")
    }
  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to delete Pay Scale")
  }
}