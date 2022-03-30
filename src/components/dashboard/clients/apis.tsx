import { iClient } from "./interface"
import axios from "axios"

export const getAllClients = async (hasUnMounted: Boolean, setClients: React.Dispatch<React.SetStateAction<iClient[]>>, setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/client`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) setClients(res.data?.data)
      else setSnackbar({ open: true, message: "Failed to fetch clients" })
    }
  } catch (err) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch clients" })
    }
  }
}

export const createClient = async (body: any, showSnackbar: Function, companies: any) => {
  let company: any = []
  companies.map((item: any) => (item.name === body.company) && company.push({ uuid: item.uuid }))

  body = Object.assign({ ...body, company })
  try {
    body.relocation = body.relocation === "Yes"
    body.remote = body.remote === "Yes"
    body.billingCycle = body.billingCycle.toLowerCase()
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/client`, body)
    if (res.data.statusCode === 200) {
      showSnackbar("New client has been created")
    }
    else {
      showSnackbar("Failed to create client")
    }
  }
  catch (err: any) {
    showSnackbar("Failed to create client")
  }
}

export const getClientById = async (hasUnMounted: boolean, setClients: Function, setSnackbar: Function, ID: string, setHasMadeApiCall: Function) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/client/find/${ID}`)
    if (!hasUnMounted) {
      if (res?.data?.statusCode === 200) {
        setClients(res?.data?.data)
        setHasMadeApiCall(true)
      }
      else {
        setSnackbar("Failed to fetch client")
      }
    }

  }
  catch (error) {
    if (!hasUnMounted) {
      setSnackbar("Failed to fetch client")
    }
  }
}

export const updateClient = async (body: any, showSnackbar: Function, ID: string, companies: any) => {
  let company: any = []

  companies.map((item: any) => (item.name === body.company) && company.push({ uuid: item.uuid }))

  body = Object.assign({ ...body, company })
  try {
    body.relocation = body.relocation === "Yes" || body.relocation === true
    body.remote = body.remote === "Yes" || body.remote === true
    body.billingCycle = body.billingCycle.toLowerCase()
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/client/${ID}`, body)
    if (res.data.statusCode === 200) {
      showSnackbar("Client has been updated")
    }
    else {
      showSnackbar("Failed to update client")
    }
  }
  catch (error: any) {
    showSnackbar("Failed to update client")
  }
}

export const deleteClient = async (oldData: any, clients: Array<iClient>, setClients: React.Dispatch<React.SetStateAction<iClient[]>>, resolve: Function, reject: Function, showSnackbar: Function) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/client/${oldData.uuid}`)
    if (res.data.statusCode === 200) {
      const dataDelete = [...clients]
      const index = oldData.tableData.id
      dataDelete.splice(index, 1)
      setClients([...dataDelete])
      resolve("Client has been deleted")
      showSnackbar("Client has been deleted")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to delete client")
    }
  } catch (error: any) {
    reject(error.message)
    showSnackbar("Failed to delete client")
  }
}