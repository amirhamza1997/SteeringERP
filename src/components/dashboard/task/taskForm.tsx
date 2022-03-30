import { Box, Container, Grid, makeStyles, Paper, Typography, CircularProgress } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { iTaskHistoryProps } from './interface';
import { createTask, updateTask, getSpecificTask } from './apis';
import { useLocation, useParams } from 'react-router-dom';
import Dashboard from '..';
import MuiTextfield from '../../common/textInput';
import MuiSelect from '../../common/select';
import MuiButton from '../../common/button';
import NotificationSnackbar from '../../common/snackbar';
import moment from 'moment';
import pallete from '../../common/colors';

const useStyles = makeStyles((theme: any) => ({
  taskBanner: { background: "#136EB7", height: 150, position: "relative" },
  taskBannerHeading: { color: `${pallete.white} !important` }
}))

const TaskForm = () => {
  const classes = useStyles()
  const { taskId }: { taskId: string } = useParams()
  const location: iTaskHistoryProps = useLocation()
  const [task, setTask] = useState<any>({})
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })
  const [hasMadeApiCall, setHasMadeApiCall] = useState<Boolean>(false)

  useEffect(() => {
    let hasUnMounted = false
    const fetchTask = async () => {
      !location.pathname.includes('/task/create') && await getSpecificTask(hasUnMounted, taskId, setTask, setSnackbar)
      setHasMadeApiCall(true)
    }
    fetchTask()

    return (() => {
      hasUnMounted = true
    })
  }, [location, taskId])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message })
  let employeeName = location?.state?.employees.filter((item: any) => item.role === 'dev').map((item: any) => item.fullName)

  const formFields = [
    { variant: "outlined", type: "text", label: "Title", name: "title", placeholder: "John Wick", size: "medium", fullWidth: true, field: "input", validate: { regex: /^[a-zA-Z ]+$/, errorMessage: "Only letters" }, required: true },
    { variant: "outlined", label: "Project", name: "project", data: location?.state?.projects?.map((item: any) => item.name), size: "medium", fullWidth: true, field: "select", required: true },
    { variant: "outlined", type: "number", label: "Estimated Hours", name: "estimatedHours", placeholder: "E.g 03001234567", size: "medium", fullWidth: true, field: "input", validate: { regex: /^[+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s.]?)[0-9]{3}[-\s.]?[0-9]{4,6}$/im, errorMessage: "Please provide valid Phone Number" }, required: true },
    { variant: "outlined", type: "date", label: "Deadline Date", name: "deadline", placeholder: "E.g 23-5-1990", size: "medium", fullWidth: true, field: "input", required: true },
    { variant: "outlined", label: "Assign To", name: "assignedTo", data: employeeName, size: "medium", fullWidth: true, field: "select", required: true },
    { variant: "outlined", type: "text", label: "Description", name: "description", multiline: true, rows: 3, placeholder: "John Wick", size: "medium", fullWidth: true, field: "input", validate: { regex: /^[a-zA-Z ]+$/, errorMessage: "Only letters" }, required: true },
    { variant: "outlined", type: "text", label: "Notes", name: "note", multiline: true, rows: 3, placeholder: "E.g 61101-1234567-9", size: "medium", fullWidth: true, field: "input", validate: { regex: /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/, errorMessage: "Please provide valid CNIC" }, required: true },
  ]

  const handleFormInput = (e: any) => setTask((state: any) => ({ ...state, [e.target.name]: e.target.value }))
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const taskData = {
      ...task,
      project: location?.state?.projects.length && location?.state?.projects.filter((item: any) => item.name === (task.project.name ?? task.project))[0].uuid,
      assignedTo: location?.state?.employees.filter((item: any) => item.fullName === (task.assignedTo.fullName ?? task.assignedTo))[0].uuid
    }
    location?.state?.page === 'create' ? createTask({ ...taskData, status: "Pending" }, showSnackbar) : updateTask(taskId, taskData, showSnackbar)
  }

  const renderFields = (formFields: any, form: any) => (
    formFields.map((item: any, index: any) => (
      <Grid key={item.label} item xs={12} sm={item.label === "Description" || item.label === "Notes" ? 6 : 4 && item.label === "Title" ? 8 : 4}>
        {item.field === "input" ?
          <MuiTextfield
            key={index}
            variant={item.variant}
            defaultValue={form ? ((item.type === "date") ? moment(form[item?.name] ?? null).format("YYYY-MM-DD") : form[item?.name]?.name ?? form[item?.name]) : ""}
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
            InputLabelProps={item.type === "date" ? { shrink: true } : undefined}
          />
          :
          <MuiSelect
            variant={item.variant}
            name={item.name}
            defaultValue={form ? item.label === "Project" ? form[item?.name]?.name : form[item?.name]?.fullName : ""}
            label={item.label}
            data={item.data}
            size={item.size}
            fullWidth={item.fullWidth}
            onChange={(e: any) => handleFormInput(e)}
          />
        }
      </Grid>
    ))
  )
  debugger
  const renderForm = (formFields: Array<object>, form: any) => (
    <form onSubmit={(e) => handleSubmit(e)}>
      {Array.isArray(form) ?
        form.map((formItem: any, idx: number) => <Grid style={{ paddingTop: 16 }} key={idx} container spacing={2}>{renderFields(formFields, formItem)}</Grid>)
        :
        <Grid style={{ paddingTop: 16 }} container spacing={2}>{renderFields(formFields, form)}</Grid>
      }
      <Box mt={4} display="flex" alignItems="center">
        <Box width="125px"><MuiButton variant="contained" label={location.state.page === 'create' ? "Create" : "Update"} className="primaryBtn" fullWidth type="submit" onClick={() => undefined} /></Box>
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
                <Typography variant="h5" className={classes.taskBannerHeading}>{location.state.page === "create" ? "Create Task" : "Edit Task"}</Typography>
              </Box>
            </Box>
            <Box px={7} py={7}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={12}>
                  {renderForm(formFields, task)}
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

export default TaskForm