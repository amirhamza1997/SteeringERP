import { iEducation, iExperience, iProfile } from "./interface"
import { educationFields, experienceFields } from "./profileForm"
import axios from "axios"

export const getEmployee = async (
  employeeId: string,
  setEmployee: React.Dispatch<React.SetStateAction<iProfile>>,
  setEducation: React.Dispatch<React.SetStateAction<iEducation[]>>,
  setExperience: React.Dispatch<React.SetStateAction<iExperience[]>>,
  hasUnMounted: boolean,
  setsnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/employee/find/${employeeId}`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        setEmployee(res.data.data)
        setEducation(res.data.data.qualifications.length ? res.data.data.qualifications : [educationFields])
        setExperience(res.data.data.experiences.length ? res.data.data.experiences : [experienceFields])
      } else setsnackbar({ open: true, message: 'Failed to fetch employee' })
    }
  } catch (error) {
    setsnackbar({ open: true, message: 'Failed to fetch employee' })
  }
}

export const updateEmployee = async (body: iProfile, empId: string, showSnackbar: Function) => {
  try {
    body.role = body.role.toLowerCase()
    const { experiences, qualifications, party, partyType, ...rest } = body
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/employee/${empId}`, rest)
    if (res.data.statusCode === 200) {
      showSnackbar("Profile has been updated")
    }
    else {
      showSnackbar("Failed to update employee")
    }
  } catch (error) {
    showSnackbar("Failed to update employee")
  }
}

export const updateEducation = async (body: iEducation[], empId: string, showSnackbar: Function) => {
  try {
    body.map(item => item.employee = empId)
    const payload = { employee: empId, qualification: body }
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/qualification`, payload)
    if (res.data.statusCode === 200) {
      showSnackbar("Education has been updated")
    }
    else {
      showSnackbar("Failed to update education")
    }
  } catch (error) {
    showSnackbar("Failed to update education")
  }
}

export const updateExperience = async (body: iExperience[], empId: string, showSnackbar: Function) => {
  try {
    body.map(item => item.employee = empId)
    const payload = { employee: empId, experience: body }
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/experience`, payload)
    if (res.data.statusCode === 200) {
      showSnackbar("Experience has been updated")
    }
    else {
      showSnackbar("Failed to update experience")
    }
  } catch (error) {
    showSnackbar("Failed to update experience")
  }
}