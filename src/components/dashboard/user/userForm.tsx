import { Box, Container, Grid, makeStyles, Paper, Typography, CircularProgress } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Dashboard from '..';
import MuiTextfield from '../../common/textInput';
import MuiButton from '../../common/button';
import NotificationSnackbar from '../../common/snackbar';
import pallete from '../../common/colors';
import { createUser, getSpecificUser, updateUser } from './apis';
import MuiSelect from '../../common/select';
import { getAllRoles } from '../userRoles/apis';
import { iuserRoles } from '../userRoles/interface';
import Cookies from 'js-cookie';
import { iPermission } from '../userPermissions/interface';
import { getAllPermissions } from '../userPermissions/apis';
import { getAllemploys } from '../employee/api';
import { iEmployee } from '../employee/interface';

const useStyles = makeStyles((theme: any) => ({
  taskBanner: { background: "#136EB7", height: 150, position: "relative" },
  taskBannerHeading: { color: `${pallete.white} !important` }
}))

const UserForm = () => {
  const classes = useStyles()
  const { userId, page }: { userId: string, page: string } = useParams()
  const [user, setUser] = useState<any>({})
  const [permissions, setPermissions] = useState<iPermission[]>([])
  const [roles, setRoles] = useState<iuserRoles[]>([])
  const [employees, setEmployee] = useState<iEmployee[]>([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })
  const [hasMadeApiCall, setHasMadeApiCall] = useState<Boolean>(false)

  useEffect(() => {
    let hasUnMounted = false
    const fetchUser = async () => {
      page !== "create" && await getSpecificUser(hasUnMounted, userId, setUser, setSnackbar)
      getAllRoles(hasUnMounted, setRoles, setSnackbar)
      getAllPermissions(hasUnMounted, setPermissions, setSnackbar)
      getAllemploys(hasUnMounted, setEmployee, setSnackbar)
      setHasMadeApiCall(true)
    }
    fetchUser()
    return (() => {
      hasUnMounted = true
    })
  }, [page, userId])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message })

  const formFields = [
    { variant: "outlined", type: "text", label: "Full Name", name: "fullName", placeholder: "e.g. John Wick", size: "medium", fullWidth: true, field: "input", required: true },
    { variant: "outlined", label: "Status", name: "status", size: "medium", data: ["active", "in active"], fullWidth: true, field: "select", multiple: false, required: true },
    { variant: "outlined", type: "email", label: "Email", name: "email", placeholder: "e.g. john@test.com", size: "medium", fullWidth: true, field: "input", required: true },
    { variant: "outlined", type: "password", label: "Password", name: "password", size: "medium", fullWidth: true, field: "input", multiple: false, required: true },
    { variant: "outlined", label: "Type", name: "type", size: "medium", data: ["local", "SSO", "Office365"], fullWidth: true, field: "select", multiple: false, required: true },
    { variant: "outlined", label: "Role", name: "roles", size: "medium", data: roles.map((x: iuserRoles) => x.name), fullWidth: true, field: "select", multiple: true, required: true },
    { variant: "outlined", label: "Permissions", name: "permissions", size: "medium", data: permissions.map((x: iPermission) => x.name), fullWidth: true, field: "select", multiple: true, required: false },
    { variant: "outlined", label: "Employee", name: "employee", size: "medium", data: employees.map((x: iEmployee) => x.fullName), fullWidth: true, field: "select", multiple: false, required: false },
  ]

  const handleFormInput = (e: any) => setUser((state: any) => ({ ...state, [e.target.name]: e.target.value }))
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    let roleIds: string[] = []
    let permissionIds: string[] = []
    const userData = { ...user }
    if (page === "create") {
      userData.createdBy = Cookies.get("userName")
      userData.updatedBy = null
    } else userData.updatedBy = Cookies.get("userName")

    userData.roles && userData.roles.map((x: any) => {
      let index = roles.findIndex((y: any) => y.name === x || y.name === x?.name)
      if (index !== -1) roleIds.push(roles[index].uuid)
      return null
    })
    userData.permissions.length && userData.permissions.map((x: any) => {
      let index = permissions.findIndex((y: any) => y.name === x || y.name === x?.name)
      if (index !== -1) permissionIds.push(permissions[index].uuid)
      return null
    })
    userData.roles = roleIds
    userData.permissions = permissionIds
    userData.employee = employees.length && employees.filter((x: any) => x.fullName === userData.employee)[0]?.uuid
    page === 'create' ? createUser({ ...userData }, showSnackbar) : updateUser(userId, userData, showSnackbar)
  }

  const renderFields = (formFields: any, form: any) => (
    formFields.map((item: any) => (
      <Grid key={item.label} item xs={12} sm={6}>
        {item.field === "input" ?
          <>
            <MuiTextfield
              variant={item.variant}
              defaultValue={item ? (form[item?.name]?.name ?? form[item?.name]) : ""}
              inputProps={item.inputProps}
              type={item.type}
              label={item.label}
              name={item.name}
              required={item.required}
              placeholder={item.placeholder}
              size={item.size}
              fullWidth={item.fullWidth}
              multiline={item?.multiline}
              rows={item?.rows}
              onChange={(e: any) => handleFormInput(e)}
            />
          </>
          :
          <MuiSelect
            variant={item.variant}
            name={item.name}
            label={item.label}
            defaultValue={item ? (item.name === "roles" || item.name === "permissions" ? form[item?.name]?.map((x: any) => x.name) ?? [] : (form[item?.name]?.name ?? form[item?.name]?.fullName ?? form[item?.name])) : ""}
            data={item.data}
            size={item.size}
            multiple={item?.multiple}
            fullWidth={item.fullWidth}
            onChange={(e: any) => handleFormInput(e)}
            required={item.required}
          />
        }
      </Grid>
    ))
  )

  const renderForm = (formFields: Array<object>, form: any) => (
    <form onSubmit={(e) => handleSubmit(e)}>
      {Array.isArray(form) ?
        form.map((formItem: any, idx: number) => <Grid style={{ paddingTop: 16 }} key={idx} container spacing={2}>{renderFields(formFields, formItem)}</Grid>)
        :
        <Grid style={{ paddingTop: 16 }} container spacing={2}>{renderFields(formFields, form)}</Grid>
      }
      <Box mt={4} display="flex" alignItems="center">
        <Box width="125px"><MuiButton variant="contained" label={page === 'create' ? "Create" : "Update"} className="primaryBtn" fullWidth type="submit" onClick={() => undefined} /></Box>
        <Box width="125px" ml={2}><MuiButton variant="outlined" label="Back" className="otherBtn" fullWidth onClick={() => window.history.back()} /></Box>
      </Box>
    </form>
  )

  const body = () => (
    hasMadeApiCall ?
      <Box>
        <Container maxWidth='lg'>
          <Paper elevation={2}>
            <Box className={classes.taskBanner}>
              <Box pt={7} pl={5}>
                <Typography variant="h5" className={classes.taskBannerHeading}>{page === "create" ? "Create User" : "Edit User"}</Typography>
              </Box>
            </Box>
            <Box px={7} py={7}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={12}>
                  {renderForm(formFields, user)}
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
        {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
      </Box>
      : <Box textAlign="center"><CircularProgress /></Box>
  )

  return <Dashboard body={body()} />
}

export default UserForm