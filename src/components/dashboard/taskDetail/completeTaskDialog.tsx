import { useState } from 'react'
import { Box, DialogContentText, DialogContent } from '@material-ui/core'
import MuiTextfield from '../../common/textInput'
import MuiDialog from '../../common/dialog'
import MuiSelect from '../../common/select'

interface iTaskTimeDialogProps {
  dialogTitle: string
  taskId: string,
  handleCompleteTask: Function
  setReview: React.Dispatch<React.SetStateAction<string>>
  setRating: React.Dispatch<React.SetStateAction<string>>
  data: any
}

const CompleteTaskDialog = (props: iTaskTimeDialogProps) => {
  const [open, setOpen] = useState(false)

  const handleSave = (e: any) => {
    e.preventDefault()
    props.handleCompleteTask()
    setOpen(false)
  }

  return (
    <MuiDialog
      dialogTitle={props.dialogTitle}
      open={open}
      handleClose={() => setOpen(false)}
      handleClickOpen={() => setOpen(true)}
      handleSave={handleSave}
      isButtonRequired={true}
      buttonLabel={props.data?.state.status === "Done" ? "Completed" : "Complete Task"}
      buttonClass="successBtn"
      disabled={props.data?.state?.status === "Done" || props.data?.state?.status === "Pending"}
      dialogContent={
        <DialogContent>
          <DialogContentText id="task-time-description">Are you sure you want to complete the task, please provide review and rating.</DialogContentText>
          <Box py={1}>
            <MuiTextfield label="Review" name="review" placeholder="E.g. lorem ipsum" variant="outlined" type="text" fullWidth onChange={(e: any) => props.setReview(e.target.value)} />
          </Box>
          <Box py={1}>
            <MuiSelect
              variant="outlined"
              name="rating"
              label="Rating"
              data={["Fail", "Poor", "Satisfactory", "Good", "Excellent"]}
              size="medium"
              onChange={(e: any) => props.setRating(e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
      }
    />
  )
}

export default CompleteTaskDialog;