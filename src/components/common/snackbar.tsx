import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

interface iComponentProps {
  message: string,
  open: boolean,
  close: Function
}

const NotificationSnackbar = (props: iComponentProps) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
      open={props.open}
      autoHideDuration={3000}
      onClose={() => props.close(false)}
      message={props.message}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={() => props.close(false)}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  )
}

export default NotificationSnackbar