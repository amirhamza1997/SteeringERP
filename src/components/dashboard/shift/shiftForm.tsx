import { Box, Container, Grid, makeStyles, Paper, Typography, CircularProgress } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { iShiftHistoryProps } from './interface';
import { createShift, updateShift, getSpecificShift } from './apis';
import { useLocation, useParams } from 'react-router-dom';
import Dashboard from '..';
import MuiTextfield from '../../common/textInput';
import MuiButton from '../../common/button';
import NotificationSnackbar from '../../common/snackbar';
import pallete from '../../common/colors';

const useStyles = makeStyles((theme: any) => ({
  taskBanner: { background: "#136EB7", height: 150, position: "relative" },
  taskBannerHeading: { color: `${pallete.white} !important` }
}))

const ShiftForm = () => {
  const classes = useStyles()
  const { shiftId }: { shiftId: string } = useParams()
  const location: iShiftHistoryProps = useLocation()
  const [shift, setShift] = useState<any>({})
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })
  const [hasMadeApiCall, setHasMadeApiCall] = useState<Boolean>(false)

  useEffect(() => {
    let hasUnMounted = false
    const fetchShift = async () => {
      !location.pathname.includes('/shift/create') && await getSpecificShift(hasUnMounted, shiftId, setShift, setSnackbar)
      setHasMadeApiCall(true)
    }
    fetchShift()
    return (() => {
      hasUnMounted = true
    })
  }, [location, shiftId])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message })

  const formFields = [
    { variant: "outlined", type: "text", label: "Shift Title", name: "name", placeholder: "John Wick", size: "medium", fullWidth: true, field: "input", required: true },
    { variant: "outlined", type: "time", label: "Shift Start", name: "timeStart", size: "medium", fullWidth: true, field: "input", required: true },
    { variant: "outlined", type: "number", label: "Hours Duration", name: "hoursDuration", placeholder: "E.g 12 hours", size: "medium", fullWidth: true, field: "input", helperText: "Must be less than 12 hours.", inputProps: { max: 12 }, required: true },
    { variant: "outlined", type: "number", label: "Late Flexibility", name: "lateFlexibility", placeholder: "E.g 15 minutes", size: "medium", fullWidth: true, field: "input", helperText: "Must be less than 60 minutes.", inputProps: { max: 60 }, required: true },
    { variant: "outlined", type: "number", label: "Early Leave Flexibility", name: "earlyLeaveFlexibility", placeholder: "E.g 60 minutes", size: "medium", fullWidth: true, helperText: "Must be less than 60 minutes.", inputProps: { max: 60 }, field: "input", required: true },
  ]

  const handleFormInput = (e: any) => setShift((state: any) => ({ ...state, [e.target.name]: e.target.value }))
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const shiftData = { ...shift }

    location?.state?.page === 'create' ? createShift({ ...shiftData }, showSnackbar) : updateShift(location?.state.data.uuid, shiftData, showSnackbar)
  }

  const renderFields = (formFields: any, form: any) => (
    formFields.map((item: any, index: any) => (

      <Grid key={item.label} item xs={12} sm={item.label === "Shift Title" || item.label === "Shift Start" ? 6 : 4}>
        <MuiTextfield
          key={index}
          variant={item.variant}
          defaultValue={item ? (form[item?.name]?.name ?? form[item?.name]) : ""}
          inputProps={{ inputProps: item.inputProps }}
          type={item.type}
          label={item.label}
          name={item.name}
          required={item.required}
          placeholder={item.placeholder}
          size={item.size}
          fullWidth={item.fullWidth}
          multiline={item?.multiline}
          rows={item?.rows}
          helperText={item.helperText}
          onChange={(e: any) => handleFormInput(e)}
          InputLabelProps={item.type === "time" ? { shrink: true } : undefined}
        />
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
        <Box width="125px"><MuiButton variant="contained" label={location?.state?.page === 'create' ? "Create" : "Update"} className="primaryBtn" fullWidth type="submit" onClick={() => undefined} /></Box>
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
                <Typography variant="h5" className={classes.taskBannerHeading}>{location?.state?.page === "create" ? "Create Shift" : "Edit Shift"}</Typography>
              </Box>
            </Box>
            <Box px={7} py={7}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={12}>
                  {renderForm(formFields, shift)}
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

export default ShiftForm