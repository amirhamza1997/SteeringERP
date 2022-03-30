import { Box, Container, Paper, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useEffect, useState } from 'react';
import { applyLeave, getEmployeeDetail, getLeaveTypes, getSpecificEmployeeLeaveRecord } from './api'
import { iLeaveType } from './interface';
import Dashboard from '..';
import MuiButton from '../../common/button';
import pallete from '../../common/colors';
import MuiSelect from '../../common/select';
import MuiTextfield from '../../common/textInput';
import NotificationSnackbar from '../../common/snackbar';

const useStyles = makeStyles((theme: any) => ({
  root: { backgroundColor: pallete.primary, height: "150px", position: "relative", boxSizing: "border-box", width: "100%" },
  textField: { color: `${pallete.white} !important`, backgroundColor: pallete.primary, paddingTop: "7px", paddingBottom: "3px", borderRadius: "5px", width: "150px", margin: "0 auto" },
}))

const LeaveApply = () => {
  const classes = useStyles();
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [formValues, setFormValues] = useState<any>({});
  const [leaveTypes, setLeaveTypes] = useState<iLeaveType[]>([]);
  const [employeeLeave, setEmployeeLeave] = useState<any[]>([]);
  const [employeeDetail, setEmployeeDetail] = useState<any>({});

  useEffect(() => {
    let hasUnMounted = false
    getLeaveTypes(hasUnMounted, setLeaveTypes, setSnackbar)
    getSpecificEmployeeLeaveRecord(hasUnMounted, setEmployeeLeave, setSnackbar)
    getEmployeeDetail(hasUnMounted, setEmployeeDetail, setSnackbar)

    return (() => {
      hasUnMounted = true
    })
  }, [])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: "" });
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message });

  const handleFormInput = (e: any) => setFormValues({ ...formValues, [e.target.name]: e.target.value })

  const saveForm = (e: any, showSnackbar: any) => {
    e.preventDefault();
    formValues.recommendedByHod = employeeDetail?.department?.departmentHead?.uuid
    formValues.recommendedBySupv = employeeDetail?.supervisor?.uuid
    formValues.remaining = employeeLeave.filter(x => x.leaveType.title = formValues.leaveType)[0]?.remaining
    formValues.leaveType = leaveTypes.filter(x => x.title = formValues.leaveType)[0]?.uuid
    applyLeave(formValues, showSnackbar)
  };

  const renderForm = (formFields: Array<any>) => (
    formFields.map((items: any, idx: number) => (
      <Grid key={idx} item xs={12} sm={6} md={items.label === "I want to inform" ? 8 : items.label === "Reason" ? 8 : 6}>
        {items.field === "select" ? (
          <MuiSelect
            variant={items.variant}
            onChange={(e: any) => handleFormInput(e)}
            label={items.label}
            size={items.size}
            required={items.required}
            fullWidth={items.fullWidth}
            name={items.name}
            data={items.data}
          />
        ) : (
          <MuiTextfield
            variant={items.variant}
            name={items.name}
            label={items.label}
            onChange={(e: any) => handleFormInput(e)}
            type={items.type}
            size={items.size}
            fullWidth={items.fullWidth}
            multiline={items.multiline}
            rows={items.rows}
            InputLabelProps={{ shrink: true }}
          />
        )}
      </Grid>
    )))

  const applyLeaveForm = [
    { variant: "outlined", label: "Leave Type", name: "leaveType", data: leaveTypes.map((item: any) => item.title), size: "medium", fullWidth: true, field: "select", required: true },
    { variant: "outlined", type: "number", label: "Hours", name: "hours", size: "medium", fullWidth: true, field: "input", required: false, },
    { variant: "outlined", type: "date", label: "Request From", name: "requestedFrom", size: "medium", fullWidth: true, field: "input", required: true },
    { variant: "outlined", type: "date", label: "Request To", name: "requestedTo", size: "medium", fullWidth: true, field: "input", required: true },
    { variant: "outlined", type: "text", label: "Reason", name: "reason", placeholder: "Reason of leave", size: "medium", fullWidth: true, field: "input", rows: 2, multiline: true, required: true },
  ]

  const body = () => (
    <Box>
      <Container maxWidth="lg">
        <Paper elevation={3}>
          <Box className={classes.root}>
            <Box pt={7} pl={5}>
              <Typography variant="h5" style={{ color: pallete.white }}>Apply for leave</Typography>
            </Box>
          </Box>
          <Box py={2}>
            <Grid container spacing={2}>
              {employeeLeave.map(item => (
                <Grid key={item.title} item md={3}>
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="h4" >{item.remaining}</Typography>
                    <Typography variant="body2" className={classes.textField}>{item.leaveType.title}</Typography>
                    <Typography variant="body2" style={{ paddingTop: "5px" }}>Available</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box py={2} px={8}>
            <form onSubmit={(e: any) => saveForm(e, showSnackbar)}>
              <Grid container spacing={4}> {renderForm(applyLeaveForm)}</Grid>
              <Box my={3} width="125px"><MuiButton variant="contained" label="Apply" className="primaryBtn" fullWidth type="submit" size="medium" /></Box>
            </form>
          </Box>
        </Paper>
      </Container>
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </Box>
  )

  return <Dashboard body={body()} />

}
export default LeaveApply;