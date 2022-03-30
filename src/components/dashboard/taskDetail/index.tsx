import { useState, useEffect, Fragment } from 'react'
import { Avatar, Box, Container, Divider, Typography } from '@material-ui/core'
import { makeStyles } from "@material-ui/styles"
import { AlarmOn, Assignment, Comment, Description, Grade, Note, RateReview, Schedule, Update } from '@material-ui/icons'
import { useLocation, useHistory } from 'react-router'
import { iTask } from '../task/interface'
import { iEmployee } from '../employee/interface'
import { getAllTaskComments, postComment, updateTaskStatus } from './api'
import Dashboard from '..'
import pallete from '../../common/colors'
import MuiButton from '../../common/button'
import johnAvatar from '../../../assets/images/user.jpg'
import TaskTimeDialog from './taskTimeDialog'
import moment from 'moment'
import NotificationSnackbar from '../../common/snackbar'
import CompleteTaskDialog from './completeTaskDialog'
import MuiTextfield from '../../common/textInput'
import Cookies from 'js-cookie'

const useStyles = makeStyles((theme: any) => ({
  root: { background: pallete.white },
  secondaryHeading: { fontSize: 15 },
  icon: { fontSize: 19, color: pallete.primary },
  headingIcon: { fontSize: 19, color: pallete.primary },
  commentAvatar: { width: 55, height: 55 }
}))

export interface iHistoryProp {
  pathname: string,
  state: iTask
}

export interface iComment {
  uuid: string
  date: string
  employee: iEmployee
  task: iTask
  comment: string
  timeStamps: object
}

const TaskDetail = () => {
  const location: iHistoryProp = useLocation()
  const history = useHistory()
  const classes = useStyles()
  const [allComments, setAllComments] = useState<iComment[]>([])
  const [comment, setComment] = useState<string>("")
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })
  const [review, setReview] = useState<string>('')
  const [rating, setRating] = useState<string>('')

  useEffect(() => {
    let hasUnMounted = false
    getAllTaskComments(hasUnMounted, location?.state?.uuid, setAllComments, setSnackbar)

    return (() => { hasUnMounted = true })
  }, [location])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message })
  const handleCommentChange = (e: any) => setComment(e.target.value)

  const leftSection = [
    { icon: <Description className={classes.icon} />, title: "Description", value: location?.state?.description },
    { icon: <RateReview className={classes.icon} />, title: "Review", value: location?.state?.review },
    { icon: <Note className={classes.icon} />, title: "Notes", value: location?.state?.note },
    { icon: <Comment className={classes.icon} />, title: "Activity", value: undefined },
  ]

  const rightSection = [
    { icon: <Update className={classes.headingIcon} />, title: "Status", value: location?.state?.status },
    { icon: <AlarmOn className={classes.headingIcon} />, title: "Deadline", value: moment(location?.state?.deadline).format("MMM Do YY") },
    { icon: <Grade className={classes.headingIcon} />, title: "Rating", value: location?.state?.rating },
    { icon: <Assignment className={classes.headingIcon} />, title: "Assignee", value: location?.state?.assignedTo.fullName },
    { icon: <Schedule className={classes.headingIcon} />, title: "Estimated hours", value: location?.state?.estimatedHours },
  ]

  const renderHeadSection = (icon: any, title: string, value: string | undefined) => (
    (value || title === "Activity") && <Fragment key={title}>
      <Box pt={3} pb={2} display="flex" alignItems="center">
        <Box mr={2}>{icon}</Box>
        <Typography variant="h6">{title}</Typography>
      </Box>
      {value && <Box><Typography variant="body2">{value}</Typography></Box>}
    </Fragment>
  )

  const renderComments = () => (
    <>
      <Box mt={2}><Typography variant="body2">{`Comments(${allComments.length})`}</Typography></Box>
      {allComments.length ? allComments.map((item: iComment, idx: number) => (
        <Box key={idx} mt={3} display="flex">
          <Box><Avatar className={classes.commentAvatar} src={johnAvatar} /></Box>
          <Box ml={2}>
            <Box mb={1} display="flex" alignItems="center">
              <Typography className={classes.secondaryHeading} variant="h6">{item?.employee?.fullName}</Typography>
              <Box ml={5}><Typography style={{ opacity: "80%" }} variant="caption">{moment(item?.date).fromNow()}</Typography></Box>
            </Box>
            <Typography className={classes.secondaryHeading} variant="body2">{item?.comment}</Typography>
          </Box>
        </Box>
      )) : <Box mt={2}><Typography variant="body2">There's no comment yet on this task.</Typography></Box>}
    </>
  )

  const handlePostComment = () => {
    if (comment !== "") {
      const body = {
        date: new Date(),
        comment: comment,
        task: location?.state?.uuid,
        employee: Cookies.get("employeeId")
      }
      postComment(body, allComments, setAllComments, showSnackbar)
    }
  }

  const handleStatusChange = (status: string) => {
    const body = { status }
    updateTaskStatus(location?.state?.uuid, body, showSnackbar).then(() => {
      location.state.status = status
      showSnackbar("Task status has been updated")
    })
  }

  const handleCompleteTask = () => {
    updateTaskStatus(location?.state?.uuid, { review, rating: rating.toLowerCase(), status: "Done" }, showSnackbar).then(() => {
      location.state.rating = rating
      location.state.review = review
      location.state.status = "Done"
      showSnackbar("Task has been completed")
    })
  }

  const body = () => (
    <Container className={classes.root} maxWidth="lg">
      <Box display="flex" flexWrap="wrap">
        <Box flex={3} px={3} py={4}>
          <Box pt={2}>
            <Typography variant="h5">{location?.state?.title}</Typography>
          </Box>
          <Box pt={2}><Divider orientation="horizontal" /></Box>
          {leftSection.map((item) => renderHeadSection(item.icon, item.title, item.value))}
          <Box>
            <MuiTextfield variant="outlined" type="text" label="Comment" placeholder="E.g. Lorem ipsum dolor de imit" fullWidth multiline rows={3} onChange={handleCommentChange} />
            <Box textAlign="right" mt={2}><MuiButton label="Send" className="primaryBtn" onClick={handlePostComment} /></Box>
            {renderComments()}
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box flex={1.2} px={3} py={4}>
          {rightSection.map(item => (
            item.value && <Box key={item.title} pt={2} display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Box mr={1}>{item.icon}</Box>
                <Typography className={classes.secondaryHeading} variant="h6">{item.title}</Typography>
              </Box>
              <Typography variant="body2">{item.value}</Typography>
            </Box>
          ))}
          <Box pt={4}><TaskTimeDialog taskTitle={location?.state?.title} taskId={location?.state?.uuid} /></Box>
          <Box pt={2}>
            <MuiButton variant="contained" label="Timesheet" fullWidth className="primaryBtn" onClick={() => history.push({ pathname: '/tasks/timesheets', state: { taskId: location?.state?.uuid, task: location?.state } })} />
          </Box>
          {(location?.state?.status === "Pending" || location?.state?.status === "Pause") &&
            <Box pt={2}>
              <MuiButton variant="contained" label="Start Task" fullWidth className="primaryBtn" onClick={() => handleStatusChange("In progress")} />
            </Box>
          }
          {location?.state?.status === "In progress" &&
            <Box pt={2}>
              <MuiButton variant="contained" label="Pause Task" fullWidth className="alertBtn" onClick={() => handleStatusChange("Pause")} />
            </Box>
          }
          <Box pt={2}>
            <CompleteTaskDialog
              dialogTitle="Complete Task"
              taskId={location?.state?.uuid}
              setReview={setReview}
              setRating={setRating}
              handleCompleteTask={handleCompleteTask}
              data={location}
            />
          </Box>
          <Box pt={2}><MuiButton variant="outlined" label="Back" fullWidth className="otherBtn" onClick={() => history.goBack()} /></Box>
        </Box>
      </Box>
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </Container >
  )

  return <Dashboard body={body()} />
}

export default TaskDetail