import { iTimeSheet } from "./interface"
import axios from "axios"

export const getAllTimeSheet = async (
  hasUnMounted: Boolean,
  taskId: string,
  setTimeSheet: React.Dispatch<React.SetStateAction<iTimeSheet[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/timesheet/task/${taskId}`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) setTimeSheet(res.data?.data)
      else setSnackbar({ open: true, message: "Failed to fetch timesheet" })
    }
  } catch (error) {
    if (!hasUnMounted) setSnackbar({ open: true, message: "Failed to fetch timesheet" })
  }
}