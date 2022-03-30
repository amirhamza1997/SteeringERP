import { MouseEventHandler } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiButton from './button';

interface iDialogProps {
  open: boolean
  handleClose: MouseEventHandler
  handleSave: MouseEventHandler
  handleClickOpen: MouseEventHandler
  buttonLabel: string
  buttonClass: "primaryBtn" | "microsoftBtn" | "alertBtn" | "successBtn" | 'alertOutlinedBtn' | "primaryOutlinedBtn" | "successOutlinedBtn" | "otherBtn"
  dialogContent: any
  dialogTitle: string
  disabled?: boolean
  isButtonRequired?: boolean
}

const MuiDialog = (props: iDialogProps) => {
  return (
    <div>
      {props.isButtonRequired && <MuiButton variant="contained" disabled={props.disabled} className={props.buttonClass} label={props.buttonLabel} fullWidth onClick={props.handleClickOpen} />}
      <Dialog open={props.open} fullWidth maxWidth="sm" onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.dialogTitle}</DialogTitle>
        {props.dialogContent}
        <DialogActions>
          <MuiButton variant="outlined" className="otherBtn" label="Close" onClick={props.handleClose} />
          <MuiButton variant="contained" className="primaryBtn" label="Save" onClick={props.handleSave} />
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MuiDialog