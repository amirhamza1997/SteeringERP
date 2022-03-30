import { Fragment } from 'react';
import { makeStyles } from "@material-ui/styles"
import { Box, Container, Divider, Typography } from '@material-ui/core'
import pallete from './colors'
import MuiButton from './button'
import MuiTextfield from './textInput'
import NotificationSnackbar from './snackbar'

const useStyles = makeStyles((theme: any) => ({
  root: { background: pallete.white },
  secondaryHeading: { fontSize: 15 },
}))

export interface iLocationProp {
  pathname: string,
  state: any,
}
export interface iHistoryProp {
  goBack: any
  push?: any
}
export interface iSnakProps {
  message?: any
  open?: boolean
}
export interface iDetailProps {
  location: iLocationProp
  history: iHistoryProp
  leftSection: Array<any>
  rightSection: Array<any>
  handleCommentChange?: any
  renderActionbutton?: any
  renderComments?: any
  handlePostComment?: any
  snackbar?: iSnakProps
  setSnackbar?: any
  closeSnackbar?: any
}

const Details = (props: iDetailProps) => {
  const classes = useStyles()

  const renderHeadSection = (icon: any, title: string, value: string | undefined) => (
    <Fragment key={title}>
      <Box pt={3} pb={2} display="flex" alignItems="center">
        <Box mr={2}>{icon}</Box>
        <Typography variant="h6">{title}</Typography>
      </Box>
      {value && <Box><Typography variant="body2">{value}</Typography></Box>}
    </Fragment>
  )

  return (
    <Container className={classes.root} maxWidth="lg">
      <Box display="flex">
        <Box flex={3} px={3} py={4}>
          <Box pt={2}>
            <Typography variant="h5">{props.location?.state?.project ? props.location?.state?.project?.name : props.location?.state?.name}</Typography>
          </Box>
          <Box pt={2}><Divider orientation="horizontal" /></Box>
          {props.leftSection.map((item: any) => renderHeadSection(item.icon, item.title, item.value))}
          {props.renderComments &&
            <Box>
              <MuiTextfield variant="outlined" type="text" label="Comment" placeholder="E.g. Lorem ipsum dolor de imit" fullWidth multiline rows={3} onChange={props.handleCommentChange} />
              <Box textAlign="right" mt={2}><MuiButton label="Send" className="primaryBtn" onClick={props.handlePostComment} /></Box>
              {props.renderComments()}
            </Box>
          }
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box flex={1} px={3} py={4}>
          {props.rightSection.map((item: any) => (
            <Box key={item.title} pt={2} display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Box mr={1}>{item.icon}</Box>
                <Typography className={classes.secondaryHeading} variant="h6">{item.title}</Typography>
              </Box>
              <Typography variant="body2">{item.value}</Typography>
            </Box>
          ))}
          <Box pt={2}><MuiButton variant="outlined" label="Back" fullWidth className="primaryBtn" onClick={() => props.history.goBack()} /></Box>
          {props.renderActionbutton && props.renderActionbutton()}
        </Box>
      </Box>
      {props?.snackbar?.open && <NotificationSnackbar open={props.snackbar.open} close={props.closeSnackbar} message={props.snackbar.message} />}
    </Container>
  )
}

export default Details