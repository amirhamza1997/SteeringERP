import { formValues, decodedToken } from "./interface"
import { iuserRoles } from "../dashboard/userRoles/interface";
import { iPermission } from "../dashboard/userPermissions/interface";
import axios from "axios"
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";

export const loginUser = async (
  payload: formValues,
  showSnackbar: Function,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/local/login`, payload)
    console.log(res.data)
    if (res?.status === 200) {
      let decodedToken: decodedToken = jwt_decode(res.data.data?.token);
      Cookies.set("isAuthenticated", "true", { expires: new Date(decodedToken.exp * 1000) })
      Cookies.set("userId", res.data.data.id, { expires: new Date(decodedToken.exp * 1000) })
      Cookies.set("userName", res.data.data.name, { expires: new Date(decodedToken.exp * 1000) })
      Cookies.set("userRole", res.data.data.role.map((x: iuserRoles) => x.name).join(','), { expires: new Date(decodedToken.exp * 1000) })
      Cookies.set("permission", res.data.data.permission.map((x: iPermission) => x.name).join(','), { expires: new Date(decodedToken.exp * 1000) })
      Cookies.set("employeeId", res.data.data.employee.uuid, { expires: new Date(decodedToken.exp * 1000) })
      setIsLoggedIn(true)
      return res.data.data.employee
    }
  } catch (error: any) {
    if (error?.response?.status === 401) {
      showSnackbar("Incorrect Password")
    } else if (error?.response?.status === 404) {
      showSnackbar("User not found")
    } else {
      showSnackbar("Sorry, your request can not be processed at the moment")
    }
  }
}

export const getLoginUserData = async (
  userId: string,
  hasUnMounted: boolean,
  setsnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/find/${userId}`)
    if (!hasUnMounted) {
      if (res.data.statusCode === 200) {
        return res.data.data
      } else setsnackbar({ open: true, message: 'Failed to fetch employee' })
    }
  } catch (error) {
    setsnackbar({ open: true, message: 'Failed to fetch employee' })
  }
}
