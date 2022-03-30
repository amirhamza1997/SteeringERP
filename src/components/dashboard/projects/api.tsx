import { iProject } from "./interface"
import axios from "axios"

export const fetchProjects = async (hasUnMounted: boolean, setProjects: Function, setSnackbar: Function) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/project`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        setProjects(res.data?.data)
      } else {
        setSnackbar("Failed to fetch projects")
      }
    }
  }
  catch (error) {
    if (!hasUnMounted) {
      setSnackbar("Failed to fetch projects")
    }
  }

}

export const getProjectById = async (hasUnMounted: boolean, setProjects: Function, setSnackbar: Function, ID: string) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/project/find/${ID}`)
    if (!hasUnMounted) {
      if (res.data?.statusCode === 200) {
        setProjects(res.data?.data)
      } else {
        setSnackbar("Failed to fetch projects")
      }
    }
  }
  catch (error) {
    if (!hasUnMounted) {
      setSnackbar("Failed to fetch projects")
    }
  }
}

export const createProject = async (payload: any, showSnackbar: Function, employees: any, clients: any) => {
  let resources: any = []
  employees.forEach((item: any) => {
    if (item.fullName === payload.voice) {
      delete payload.voice
      payload = Object.assign({ voice: item.uuid, ...payload })
    }
    payload.resources.map((resource: any) => (item.fullName === resource) && resources.push({ uuid: item.uuid }))

    if (item.fullName === payload.manager) {
      delete payload.manager
      payload = Object.assign({ manager: item.uuid, ...payload })
    }
  });
  clients.forEach((item: any) => {
    if (item.name === payload.client) {
      delete payload.client
      payload = Object.assign({ client: item.uuid, ...payload })
    }
  });

  delete payload.resources
  payload = Object.assign({ resources, ...payload })

  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/project`, payload)
    if (res?.status === 200) {
      showSnackbar('Project has been created')
    }
  }
  catch (error) {
    if (error) {
      showSnackbar('Failed to create Project')
    }
  }
}

export const updateProject = async (updatedProject: any, employees: any, showSnackbar: Function, clients: any, ID: string) => {
  let resources: any = []
  employees.forEach((item: any) => {
    if (item.fullName === updatedProject.voice) {
      delete updatedProject.voice
      updatedProject = Object.assign({ voice: item.uuid, ...updatedProject })
    }

    updatedProject.resources.map((resource: any) => (item.fullName === resource) && resources.push({ uuid: item.uuid }))

    if (item.fullName === updatedProject.manager) {
      delete updatedProject.manager
      updatedProject = Object.assign({ manager: item.uuid, ...updatedProject })
    }
  });

  clients.forEach((item: any) => {
    if (item.name === updatedProject.client) {
      delete updatedProject.client
      updatedProject = Object.assign({ client: item.uuid, ...updatedProject })
    }
  });

  delete updatedProject.resources
  updatedProject = Object.assign({ resources, ...updatedProject })

  try {
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/project/${ID}`, updatedProject)
    if (res?.status === 200) {
      showSnackbar('Project has been Updated')
    }
  }
  catch (error) {
    if (error) {
      showSnackbar('Failed to update Project')
    }
  }
}

export const deleteProject = async (projects: Array<iProject>, setProjects: Function, oldData: any, resolve: Function, reject: Function, showSnackbar: Function) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/project/${oldData.uuid}`)
    if (res.data.statusCode === 200) {
      const dataDelete = [...projects]
      const index = oldData.tableData.id
      dataDelete.splice(index, 1)
      setProjects([...dataDelete])
      resolve("Project has been deleted")
      showSnackbar("project has been deleted")
    }
    else {
      reject(res.data?.message)
      showSnackbar("Failed to delete project")
    }
  }
  catch (error) {
    reject(error)
    showSnackbar("Failed to delete project")
  }
}

export const getAllCompanies = async (hasUnMounted: boolean, setCompany: React.Dispatch<React.SetStateAction<any>>, setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/company`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        setCompany(res.data?.data)
      }
      else setSnackbar({ open: true, message: "Failed to fetch comapanies" })
    }
  } catch (error: any) {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch comapanies" })
    }
  }
}

