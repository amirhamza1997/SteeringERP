import { iAttendance } from "./interface"
import axios from "axios"

export const getAllAttendance = async (
  hasUnMounted: Boolean,
  setAttendance: React.Dispatch<React.SetStateAction<iAttendance[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/attendence/find`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        setAttendance(res.data?.data)
      }
      else {
        setSnackbar({ open: true, message: "Failed to fetch Attendance" })
      }
    }
  } catch (err) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch Attendance" })
    }
  }
}