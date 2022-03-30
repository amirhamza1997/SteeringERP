import { Avatar, Box, Paper, FormControlLabel, Grid, FormGroup, Typography, Container, CircularProgress } from '@material-ui/core'
import { makeStyles } from "@material-ui/styles"
import { educationDetails, educationFields, employeeDetails, experienceDetails, experienceFields, generalDetails } from './profileForm'
import { getEmployee, updateEducation, updateExperience, updateEmployee } from "./api"
import { iEducation, iExperience, iProfile } from './interface'
import { Add, Remove } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import { createEmployee, getAllemploys } from '../employee/api'
import { iHistoryProp } from './interface'
import { getAllCompanies } from "../projects/api"
import { getAllDepartments } from "../department/apis"
import { getAllDesignation } from "../designation/apis"
import { getAllShift } from "../shift/apis"
import { getAllPayScale } from "../payScale/apis"
import { iCompany } from '../company/interface'
import { iDepartment } from '../department/interface'
import { iDesignation } from '../designation/interface'
import { iShift } from '../shift/interface'
import { iPayScale } from '../payScale/interface'
import { iEmployee } from '../employee/interface'
import userImg from '../../../assets/images/user.jpg'
import MuiTab from "../../common/tabs"
import pallete from '../../common/colors'
import MuiTextfield from '../../common/textInput'
import MuiSelect from '../../common/select'
import MuiButton from '../../common/button'
import MuiCheckBox from '../../common/checkBox'
import Dashboard from '..'
import NotificationSnackbar from '../../common/snackbar'
import moment from 'moment'
import Cookies from 'js-cookie'

const useStyles = makeStyles((theme: any) => ({
  profileBanner: { background: pallete.primary, height: 150, position: "relative" },
  userAvatar: { height: 100, width: 100 },
  profileImg: { display: "flex", alignItems: 'center', position: "absolute", top: 115, left: 60, border: `2px solid ${pallete.white}`, borderRadius: "50%" },
  profileName: { position: "absolute", left: 175, top: 156, },
  icon: { color: pallete.primary, height: 25, marginRight: theme.spacing(1) },
  checkBoxLabel: { fontSize: 12 },
  addmore: { color: `${pallete.primary} !important`, cursor: "pointer" }
}))

const Profile = () => {
  const classes = useStyles()
  const location: iHistoryProp = useLocation()
  const history = useHistory()
  const { empId, page }: { empId: string, page: string } = useParams()
  const [isWorking, setIsWorking] = useState<boolean>(false)
  const [isSameAddress, setIsSameAddress] = useState<boolean>(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })
  const [hasMadeApiCall, setHasMadeApiCall] = useState<boolean>(false)
  const [employee, setEmployee] = useState<any>({})
  const [education, setEducation] = useState<Array<iEducation>>([educationFields])
  const [experience, setExperience] = useState<iExperience[]>([experienceFields])
  const [companies, setCompanies] = useState<iCompany[]>([])
  const [department, setDepartment] = useState<iDepartment[]>([])
  const [designation, setDesignation] = useState<iDesignation[]>([])
  const [shift, setShift] = useState<iShift[]>([])
  const [payScale, setPayScale] = useState<iPayScale[]>([])
  const [allEmployees, setAllEmployees] = useState<iEmployee[]>([])

  useEffect(() => {
    let hasUnMounted = false

    const fetchProducts = async () => {
      !location.pathname.includes('/hr/employees/create') && await getEmployee(empId, setEmployee, setEducation, setExperience, hasUnMounted, setSnackbar)
      getAllemploys(hasUnMounted, setAllEmployees, setSnackbar)
      getAllCompanies(hasUnMounted, setCompanies, setSnackbar)
      getAllDepartments(hasUnMounted, setDepartment, setSnackbar)
      getAllDesignation(hasUnMounted, setDesignation, setSnackbar)
      getAllShift(hasUnMounted, setShift, setSnackbar)
      getAllPayScale(hasUnMounted, setPayScale, setSnackbar)
      setHasMadeApiCall(true)
    }
    fetchProducts()

    return (() => {
      hasUnMounted = true
    })
  }, [location.pathname, empId])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message })
  const isRole = (role: string) => Cookies.get('userRole')?.includes(role)
  const isPage = (name: string) => page === name

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>, tabName: string, idx: number) => {
    switch (tabName) {
      case "educationDetails":
        if (education.length) {
          let prevEducations = [...education]
          let educationToUpdate: { [key: string]: any } = prevEducations[idx]
          educationToUpdate[e.target.name] = e.target.value
          setEducation(prevEducations)
        } else {
          let obj: any = { [e.target.name]: e.target.value }
          setEducation([obj])
        }
        break;
      case "experienceDetails":
        if (experience.length) {
          let prevExperience = [...experience]
          let experienceToUpdate: { [key: string]: any } = prevExperience[idx]
          experienceToUpdate[e.target.name] = e.target.value
          setExperience(prevExperience)
        } else {
          let obj: any = { [e.target.name]: e.target.value }
          setExperience([obj])
        }
        break;
      default:
        setEmployee((state: iProfile) => ({ ...state, [e.target.name]: e.target.value }))
        break;
    }
  }

  const saveForm = (e: React.SyntheticEvent, tabName: string) => {
    e.preventDefault()
    switch (tabName) {
      case "educationDetails":
        updateEducation(education, employee.uuid, showSnackbar)
        break;
      case "experienceDetails":
        updateExperience(experience, employee.uuid, showSnackbar)
        break;
      default:
        let employeePayload = { ...employee }
        if (isSameAddress) employeePayload.permanentAddress = employee.currentAddress
        if (typeof employeePayload.company === "string") {
          employeePayload.company = companies.length && companies.filter(x => x.name === employeePayload.company)[0].uuid
        }
        if (typeof employeePayload.department === "string") {
          employeePayload.department = department.length && department.filter(x => x.name === employeePayload.department)[0].uuid
        }
        if (typeof employeePayload.designation === "string") {
          employeePayload.designation = designation.length && designation.filter(x => x.name === employeePayload.designation)[0].uuid
        }
        if (typeof employeePayload.shift === "string") {
          employeePayload.shift = shift.length && shift.filter(x => x.name === employeePayload.shift)[0].uuid
        }
        if (typeof employeePayload.supervisor === "string") {
          employeePayload.supervisor = allEmployees.length && allEmployees.filter((x: any) => x.fullName === employeePayload.supervisor)[0].uuid
        }
        if (typeof employeePayload.payScale === "string") {
          employeePayload.payScale = payScale.length && payScale.filter(x => x.description === employeePayload.payScale)[0].uuid
        }
        isPage("create") ? createEmployee(employeePayload, setEmployee, showSnackbar) : updateEmployee(employeePayload, employee.uuid, showSnackbar)
        break;
    }
  }

  const renderCheckBox = (state: boolean, setState: Function, label: string) => (
    <FormGroup row>
      <FormControlLabel
        control={<MuiCheckBox isChecked={state} onChange={(e: any) => setState(e.target.checked)} size="small" />}
        label={<Typography className={classes.checkBoxLabel} variant="subtitle1">{label}</Typography>}
      />
    </FormGroup>
  )

  const handleAddMore = (form: string) => {
    switch (form) {
      case "educationDetails":
        setEducation(state => ([...state, educationFields]))
        break;
      case "experienceDetails":
        setExperience(state => ([...state, experienceFields]))
        break;
      default: break;
    }
  }

  const handleRemove = (form: string) => {
    switch (form) {
      case "educationDetails":
        let prevEducations = [...education]
        prevEducations.pop()
        setEducation(prevEducations)
        break;
      case "experienceDetails":
        let prevExperiences = [...experience]
        prevExperiences.pop()
        setExperience(prevExperiences)
        break;
      default: break;
    }
  }

  const defaultTextFieldValue = (form: any, item: any) => {
    if (form) {
      if (item.type === "date") return moment(form[item?.name] ?? null).format("YYYY-MM-DD")
      else if (item.name === "permanentAddress" && isSameAddress) return employee.currentAddress
      else if (item.name === "permanentAddress" && !isSameAddress) return ""
      else return form[item?.name]?.name ?? form[item?.name]
    } else {
      return ""
    }
  }

  const selectFieldOptions = (item: any) => {
    if (item.name === "company") return companies.length ? companies.map((item: any) => item.name) : []
    else if (item.name === "department") return department.length ? department.map((item: any) => item.name) : []
    else if (item.name === "designation") return designation.length ? designation.map((item: any) => item.name) : []
    else if (item.name === "shift") return shift.length ? shift.map((item: any) => item.name) : []
    else if (item.name === "supervisor") return allEmployees.length ? allEmployees.map((item: any) => item.fullName) : []
    else if (item.name === "payScale") return payScale.length ? payScale.map((item: any) => item.description) : []
    else return item.data
  }

  const renderFields = (formFields: any, form: any, tabName: string, idx: number) => (
    formFields.map((item: any) => (
      <Grid key={item.label} item xs={12} sm={6} md={4}>
        {item.field === "input" ?
          <>
            <MuiTextfield
              // these comments will require later that's why leaving it
              // error={(item.validate && form[item?.name]) ? !item.validate.regex.test(form[item?.name]) : false}
              // helperText={(item.validate && !item.validate.regex.test(form[item?.name])) ? item.validate.errorMessage : ""}
              variant={item.variant}
              defaultValue={defaultTextFieldValue(form, item)}
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
              onChange={(e: any) => handleFormInput(e, tabName, idx)}
              InputLabelProps={(item.type === "date" || (item.name === "permanentAddress" && isSameAddress)) ? { shrink: true } : undefined}
              disabled={isPage("detail") || ((isPage("view") && (tabName === "employeeDetails")))}
            />
            {item.label === "Permanent Address" && renderCheckBox(isSameAddress, setIsSameAddress, "Same as present address")}
            {item.label === "End Date" && renderCheckBox(isWorking, setIsWorking, "Currently working")}
          </>
          :
          <MuiSelect
            variant={item.variant}
            name={item.name}
            label={item.label}
            defaultValue={form ? (form[item?.name]?.name ?? form[item?.name]?.fullName ?? form[item?.name]?.description) ?? form[item?.name] : ""}
            data={selectFieldOptions(item)}
            size={item.size}
            multiple={item?.multiple}
            fullWidth={item.fullWidth}
            onChange={(e: any) => handleFormInput(e, tabName, idx)}
            disabled={isPage("detail") || ((isPage("view") && (tabName === "employeeDetails")))}
            required={item.required}
          />
        }
      </Grid>
    ))
  )

  const renderForm = (formFields: Array<object>, tabName: string, form: any) => (
    <>
      {isPage("create") && <Box mb={2}><Typography variant="h6">Employee Form</Typography></Box>}
      <form onSubmit={(e) => saveForm(e, tabName)}>
        {Array.isArray(form) ?
          form.map((formItem: any, idx: number) => <Grid style={{ paddingTop: 16 }} key={idx} container spacing={2}>{renderFields(formFields, formItem, tabName, idx)}</Grid>)
          :
          <Grid style={{ paddingTop: 16 }} container spacing={2}>{renderFields(formFields, form, tabName, 0)}</Grid>
        }
        {(tabName === "educationDetails" || tabName === "experienceDetails") &&
          <Box display="flex" alignItems="center">
            <Box mr={3} mt={2} display='flex' alignItems="center">
              <Add className={classes.icon} />
              <Typography className={classes.addmore} variant="body2" onClick={() => isPage("detail") ? undefined : handleAddMore(tabName)}>Add more</Typography>
            </Box>
            {form.length > 1 &&
              <Box mt={2} display='flex' alignItems="center">
                <Remove className={classes.icon} />
                <Typography className={classes.addmore} variant="body2" onClick={() => isPage("detail") ? undefined : handleRemove(tabName)}>Remove</Typography>
              </Box>
            }
          </Box>
        }
        <Box mt={4} display="flex" alignItems="center">
          <Box width="125px">
            <MuiButton
              variant="contained"
              label="Save"
              className="primaryBtn"
              fullWidth type="submit"
              onClick={() => undefined}
              disabled={isPage("detail") || ((isPage("view") && (tabName === "employeeDetails")))}
            />
          </Box>
          <Box ml={2} width="125px"><MuiButton variant="outlined" label="Back" className="otherBtn" onClick={() => history.goBack()} fullWidth /></Box>
        </Box>
      </form>
    </>
  )

  const body = () => (
    <Box>
      <Container maxWidth="lg">
        <Paper elevation={2}>
          <Box className={classes.profileBanner}>
            <Box className={classes.profileImg}>
              <Avatar className={classes.userAvatar} src={userImg} />
            </Box>
            <Box className={classes.profileName}>
              <Typography variant="h5">{employee?.fullName}</Typography>
              {employee?.designation && <Typography style={{ fontSize: 11 }} variant="body2">{employee.designation?.name}</Typography>}
            </Box>
          </Box>
          <Box px={7} pb={7} pt={13}>
            {hasMadeApiCall ?
              (isRole("hr") && isPage("create")) ? renderForm(generalDetails.concat(employeeDetails as any), 'generalDetails', employee) :
                <MuiTab
                  label={['General', 'Employment', 'Education', 'Experience']}
                  data={
                    [
                      renderForm(generalDetails, 'generalDetails', employee),
                      renderForm(employeeDetails, 'employeeDetails', employee),
                      renderForm(educationDetails, 'educationDetails', education),
                      renderForm(experienceDetails, 'experienceDetails', experience)
                    ]
                  }
                />
              : <Box textAlign="center"><CircularProgress /></Box>}
          </Box>
        </Paper>
      </Container>
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </Box>
  )

  return <Dashboard body={body()} />
}

export default Profile