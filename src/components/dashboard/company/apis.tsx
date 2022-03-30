import { iCompany } from "./interface"
import Axios from "axios"

export const getAllCompanies = async (
  hasUnMounted: Boolean,
  setCompanies: React.Dispatch<React.SetStateAction<iCompany[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await Axios.get(`${process.env.REACT_APP_BASE_URL}/company`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) setCompanies(res.data?.data)
      else setSnackbar({ open: true, message: "Failed to fetch companies" })
    }
  } catch (err) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch companies" })
    }
  }
}

export const createCompany = async (
  newData: iCompany,
  companies: Array<iCompany>,
  setCompanies: React.Dispatch<React.SetStateAction<iCompany[]>>,
  resolve: Function,
  reject: Function,
  showSnackbar: Function
) => {
  try {
    const res = await Axios.post(`${process.env.REACT_APP_BASE_URL}/company`, newData)
    if (res.data.statusCode === 200) {
      setCompanies([...companies, res.data.data])
      resolve("New company has been created")
      showSnackbar("New company has been created")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to create company")
    }
  } catch (err: any) {
    reject(err.message)
    showSnackbar("Failed to create company")
  }
}

export const updateCompany = async (
  newData: iCompany,
  oldData: any,
  companies: Array<iCompany>,
  setCompanies: React.Dispatch<React.SetStateAction<iCompany[]>>,
  resolve: Function,
  reject: Function,
  showSnackbar: Function
) => {
  try {
    const res = await Axios.put(`${process.env.REACT_APP_BASE_URL}/company/${oldData.uuid}`, newData)
    if (res.data.statusCode === 200) {
      const dataUpdate = [...companies]
      const index = oldData.tableData.id
      dataUpdate[index] = newData
      setCompanies([...dataUpdate])
      resolve("Company data has been updated")
      showSnackbar("Company data has been updated")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to update company data")
    }
  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to update company data")
  }
}

export const deleteCompany = async (
  oldData: any,
  companies: Array<iCompany>,
  setCompanies: React.Dispatch<React.SetStateAction<iCompany[]>>,
  resolve: Function,
  reject: Function,
  showSnackbar: Function
) => {
  try {
    const res = await Axios.delete(`${process.env.REACT_APP_BASE_URL}/company/${oldData.uuid}`)
    if (res.data.statusCode === 200) {
      const dataDelete = [...companies]
      const index = oldData.tableData.id
      dataDelete.splice(index, 1)
      setCompanies([...dataDelete])
      resolve("Company has been deleted")
      showSnackbar("Company has been deleted")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to delete company")
    }
  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to delete company")
  }
}