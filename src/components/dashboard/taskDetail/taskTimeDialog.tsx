import { useState } from 'react'
import { Box, DialogContentText, DialogContent, FormGroup, FormControlLabel, Typography } from '@material-ui/core'
import { addTimeLog } from './api'
import MuiTextfield from '../../common/textInput'
import MuiDialog from '../../common/dialog'
import NotificationSnackbar from '../../common/snackbar'
import MuiCheckBox from '../../common/checkBox'

interface iTaskTimeDialogProps {
  taskTitle: string
  taskId: string
}

const TaskTimeDialog = (props: iTaskTimeDialogProps) => {
  const [open, setOpen] = useState(false)
  const [dialogValues, setDialogValues] = useState({ hours: null, date: null, notes: null, billable: false })
  const [snackbar, setsnackbar] = useState({ open: false, message: '' })

  const closeSnackbar = () => setsnackbar({ ...snackbar, open: false, message: '' })
  const showSnackbar = (message: string) => setsnackbar({ ...snackbar, open: true, message: message })

  const handleChange = (e: any) => setDialogValues({ ...dialogValues, [e.target.name]: e.target.value })

  const handleSave = (e: any) => {
    e.preventDefault()
    const { hours, date, notes, billable } = dialogValues
    if (hours && date && notes) {
      const body = {
        // hours: hours,
        notes: notes,
        billedHoursDev: hours,
        billedHoursPM: hours,
        billable: billable,
        date: date,
        // approvedBySupervisor: true,
        // approvedByProjectManager: true,
        task: props.taskId,
        employee: null
      }
      addTimeLog(body, setOpen, showSnackbar)
    } else {
      showSnackbar("Form is incomplete")
    }
  }

  return (
    <>
      <MuiDialog
        dialogTitle={props.taskTitle}
        open={open}
        isButtonRequired={true}
        handleClose={() => setOpen(false)}
        handleClickOpen={() => setOpen(true)}
        handleSave={handleSave}
        buttonLabel="Add Time Log"
        buttonClass="primaryBtn"
        dialogContent={
          <DialogContent>
            <DialogContentText id="task-time-description">Please add time that you have spent on the task</DialogContentText>
            <Box py={1}>
              <MuiTextfield label="Hours Spent" name="hours" placeholder="E.g. 5" variant="outlined" type="number" fullWidth onChange={handleChange} />
            </Box>
            <Box py={1}>
              <MuiTextfield label="Date" name="date" placeholder="E.g. 5-8-2021" variant="outlined" type="date" InputLabelProps={{ shrink: true }} fullWidth onChange={handleChange} />
            </Box>
            <Box py={1}>
              <Typography variant="subtitle1">Please check whether the hours are billable or not?</Typography>
              <FormGroup row>
                <FormControlLabel
                  control={<MuiCheckBox isChecked={dialogValues.billable} onChange={(e: any) => setDialogValues({ ...dialogValues, billable: e.target.checked })} size="medium" />}
                  label={<Typography variant="subtitle1">Billable</Typography>}
                />
              </FormGroup>
            </Box>
            <Box py={1}>
              <MuiTextfield label="Notes" name="notes" placeholder="E.g. Lorem ipsum dolor de imit" variant="outlined" type="text" multiline rows={3} fullWidth onChange={handleChange} />
            </Box>
          </DialogContent>
        }
      />
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </>
  )
}

export default TaskTimeDialog;