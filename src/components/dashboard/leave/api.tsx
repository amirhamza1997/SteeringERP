import { iLeave, iLeaveType } from "./interface"
import axios from "axios"
import Cookies from 'js-cookie'
import { iProfile } from "../profile/interface"

export const getAllLeaves = async (
  hasUnMounted: Boolean,
  empId: string,
  setLeaves: React.Dispatch<React.SetStateAction<iLeave[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/leave/employee/${empId}`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        setLeaves(res.data?.data)
      }
      else {
        setSnackbar({ open: true, message: "Failed to fetch leaves" })
      }
    }
  } catch (err) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch leaves" })
    }
  }
}

export const getEmployeeLeaveRecord = async (
  hasUnMounted: Boolean,
  leaveRecords: React.Dispatch<React.SetStateAction<iLeave[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/employee-leave`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        let records: any = []
        for (const item of res.data.data) {
          let index = records.findIndex((x: any) => x.uuid === item.employee.uuid)
          if (index === -1) {
            records.push({ uuid: item.employee.uuid, employeeName: item.employee.fullName, [item.leaveType.title]: item.remaining })
          } else {
            records[index][item.leaveType.title] = item.remaining
          }
        }
        leaveRecords(records)
      }
      else {
        setSnackbar({ open: true, message: "Failed to fetch leaves" })
      }
    }
  } catch (err) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch leaves" })
    }
  }
}

export const getSpecificLeave = async (
  hasUnMounted: Boolean,
  leaveId: string,
  setLeave: React.Dispatch<React.SetStateAction<iLeave>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/leave/find/${leaveId}`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        setLeave(res.data?.data)
      }
      else {
        setSnackbar({ open: true, message: "Failed to fetch leave" })
      }
    }
  } catch (err) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch leave" })
    }
  }
}

export const applyLeave = async (
  formValues: any,
  showSnackbar: Function
) => {
  try {
    formValues.requestDate = new Date()
    formValues.approvedTo = null
    formValues.approvedFrom = null
    formValues.approvedOn = null
    formValues.requestBy = Cookies.get('employeeId')
    formValues.status = "Pending"
    formValues.hodStatus = "Pending"
    formValues.supvStatus = "Pending"
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/leave`, formValues)
    if (res.data.statusCode === 200) {
      showSnackbar("Leave has been applied")
    }
    else {
      showSnackbar("Failed to Apply leave")
    }
  } catch (error) {
    showSnackbar("Failed to Apply leave")
  }
}

export const getLeaveTypes = async (
  hasUnMounted: Boolean,
  setLeaveTypes: React.Dispatch<React.SetStateAction<iLeaveType[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/leave-type`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        setLeaveTypes(res.data?.data)
      }
      else {
        setSnackbar({ open: true, message: "Failed to fetch leave types" })
      }
    }
  } catch (err) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch leave types" })
    }
  }
}

export const getLeaveRequests = async (
  hasUnMounted: Boolean,
  setLeave: React.Dispatch<React.SetStateAction<iLeave[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const url = Cookies.get("userRole")?.includes('hr') ? `${process.env.REACT_APP_BASE_URL}/leave/approval/Pending` : `${process.env.REACT_APP_BASE_URL}/leave/recommendation/${Cookies.get("employeeId")}`
    const res = await axios.get(url)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        setLeave(res.data?.data)
      }
      else {
        setSnackbar({ open: true, message: "Failed to fetch leave requests" })
      }
    }
  } catch (err) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch leave requests" })
    }
  }
}

export const updateLeave = async (
  body: iLeave,
  status: string,
  showSnackbar: Function
) => {
  try {
    body.hodStatus = status
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/leave/${body.uuid}`, body)
    if (res.data.statusCode === 200) {
      showSnackbar("Leave has been updated")
      return res.data.data
    }
    else {
      showSnackbar("Failed to update leave")
    }
  } catch (err) {
    showSnackbar("Failed to update leave")
  }
}

export const grantLeave = async (
  body: iLeave,
  showSnackbar: Function
) => {
  try {
    const payload = {
      approvedFrom: body.requestedFrom,
      approvedTo: body.requestedTo,
      leaveType: body.leaveType.uuid,
      requestBy: body.requestBy.uuid,
      approvedOn: Date(),
      approvedBy: Cookies.get("employeeId") as string
    }
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/leave/grant/${body.uuid}`, payload)
    if (res.data.statusCode === 200) {
      showSnackbar("Leave has been approved")
      return res.data.data
    }
    else {
      showSnackbar("Failed to approve leave")
    }
  } catch (err) {
    showSnackbar("Failed to approve leave")
  }
}

export const getSpecificEmployeeLeaveRecord = async (
  hasUnMounted: boolean,
  setEmployeeLeaves: React.Dispatch<React.SetStateAction<iLeave[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/employee-leave/find/${Cookies.get("employeeId")}`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        setEmployeeLeaves(res.data.data)
        return res.data.data
      }
      else {
        setSnackbar({ open: true, message: "Failed to fetch employee leave record" })
      }
    }
  } catch (err) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch employee leave record" })
    }
  }
}

export const getEmployeeDetail = async (
  hasUnMounted: boolean,
  setEmployee: React.Dispatch<React.SetStateAction<iProfile>>,
  setsnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/employee/find/${Cookies.get("employeeId")}`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        setEmployee(res.data.data)
      } else setsnackbar({ open: true, message: 'Failed to fetch employee' })
    }
  } catch (error) {
    setsnackbar({ open: true, message: 'Failed to fetch employee' })
  }
}