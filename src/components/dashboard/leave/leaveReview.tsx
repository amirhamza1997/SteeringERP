import { Box, Container, Paper, Typography, Grid, Avatar, Divider, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ArrowForward } from "@material-ui/icons"
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { getSpecificLeave, grantLeave, updateLeave } from './api';
import Dashboard from '..';
import MuiButton from '../../common/button';
import colors from '../../common/colors';
import MuiTextfield from '../../common/textInput';
import userImg from '../../../assets/images/user.jpg'
import moment from 'moment';
import NotificationSnackbar from '../../common/snackbar';
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme: any) => ({
  profileBanner: { background: colors.primary, height: 150, position: "relative" },
  userAvatar: { height: 100, width: 100 },
  profileImg: { display: "flex", alignItems: 'center', position: "absolute", top: 115, left: 60, border: `2px solid ${colors.white}`, borderRadius: "50%" },
  profileName: { position: "absolute", left: 175, top: 156 },
  leaveStatusBox: { border: '1px solid #d3d3d3', borderRadius: '10px', padding: "15px" },
  pagetitle: { position: "absolute", left: 75, top: 55 },
  dateContainer: { border: '1px solid #d3d3d3', borderRadius: '10px', width: "150px", padding: "15px" },
  proposeEdit: { borderRadius: '5px', width: '180px', backgroundColor: "#fafafa" },
}));

const LeaveReview = () => {
  const classes = useStyles();
  const history = useHistory()
  const { leaveId }: { leaveId: string } = useParams()
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [leave, setLeave] = useState<any>({});

  useEffect(() => {
    let hasUnMounted = false
    getSpecificLeave(hasUnMounted, leaveId, setLeave, setSnackbar)

    return (() => {
      hasUnMounted = true
    })
  }, [leaveId])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: "" });
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message });

  const handleFormInput = (e: any) => setLeave({ ...leave, [e.target.name]: e.target.value })

  const handleLeaveRequest = (status: string) => {
    Cookies.get("userRole")?.includes("hr") && status === 'Approved' ?
      grantLeave(leave, showSnackbar).then(res => {
        setTimeout(() => history.push('/employees/leave-requests'), 1000);
      })
      :
      updateLeave(leave, status, showSnackbar).then(res => {
        setTimeout(() => history.push('/employees/leave-requests'), 1000);
      })
  };

  const body = () => (
    leave?.uuid ? <Container maxWidth="lg">
      <Paper elevation={2}>
        <Box className={classes.profileBanner}>
          <Box className={classes.pagetitle}>
            <Typography variant="h5" style={{ color: colors.white }}>Review Request</Typography>
          </Box>
          <Box className={classes.profileImg}>
            <Avatar className={classes.userAvatar} src={userImg} />
          </Box>
          <Box className={classes.profileName}>
            <Typography variant="h5">{leave.requestBy.fullName}</Typography>
            <Typography style={{ fontSize: 11 }} variant="body2">{leave.requestBy.designation.name}</Typography>
          </Box>
        </Box>

        <Box px={7} pt={9} pb={1}>
          <Box pt={5} pb={3}><Typography variant="h6">{leave.leaveType.title}</Typography></Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={8}>
              <Box display="flex" alignItems="center">
                <Box className={classes.dateContainer}>
                  <Typography variant="body2" style={{ fontWeight: "bold", fontSize: "inherit" }}>{moment(leave.requestedFrom).format('dddd')}</Typography>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2">{moment(leave.requestedFrom).format("MMM Do")}</Typography>
                    <Typography variant="body2"> {moment(leave.requestedFrom).year()}</Typography>
                  </Box>
                </Box>
                <Box px={4}><ArrowForward /></Box>
                <Box className={classes.dateContainer}>
                  <Typography variant="body2" style={{ fontWeight: "bold", fontSize: "inherit" }}>{moment(leave.requestedTo).format('dddd')}</Typography>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2" >{moment(leave.requestedTo).format("MMM Do")}</Typography>
                    <Typography variant="body2" > {moment(leave.requestedTo).year()}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4} md={4}>
              <Box className={classes.leaveStatusBox}>
                <Box display="flex">
                  <Box px={2}>
                    <Typography variant="body2">Year to Date</Typography>
                    <Typography variant="body2" style={{ fontWeight: "bold", fontSize: "inherit" }}>PTO</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">Days Availabe</Typography>
                    <Typography variant="body2" style={{ fontWeight: "bold", fontSize: "inherit" }}>{leave?.remaining}</Typography>
                  </Box>
                  <Box px={2}>
                    <Typography variant="body2">Days Used</Typography>
                    <Typography variant="body2" style={{ fontWeight: "bold", fontSize: "inherit" }}>{(leave.leaveType.daysPerYear - leave?.remaining)}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box pt={3}>
            <MuiTextfield
              variant='outlined'
              name='reason'
              label="Reason"
              onChange={() => undefined}
              type='text'
              size='medium'
              defaultValue={leave?.reason ?? ""}
              fullWidth
              multiline
              disabled
              rows={4}
            />
          </Box>
          <Box pt={3}>
            <MuiTextfield
              variant='outlined'
              name='recommededBy'
              label="Recommended By"
              onChange={() => undefined}
              defaultValue={leave?.recommendedBy?.fullName ?? ""}
              type='text'
              size='medium'
              fullWidth
              disabled
              multiline
            />
          </Box>
          <Box py={4}><Divider /></Box>
          <Box pt={1}>
            <MuiTextfield
              variant='outlined'
              name='managementNote'
              label="Note for Management"
              placeholder='Please enter your reason for approving or denying the request.'
              onChange={handleFormInput}
              defaultValue={leave?.managementNote ?? ""}
              type='date'
              size='medium'
              fullWidth
              multiline
              required
              rows={4}
            />
          </Box>
          <Box display='flex' flexWrap="wrap" alignItems="center" my={4}>
            <MuiButton variant="contained" label="Approve Request" className="primaryBtn" onClick={() => handleLeaveRequest("Approved")} size="medium" />
            <Box ml={2}><MuiButton variant="contained" label="Decline Request" className="alertBtn" onClick={() => handleLeaveRequest("Declined")} size="medium" /></Box>
          </Box>
        </Box>
      </Paper>
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </Container > : <Box textAlign="center"><CircularProgress /></Box>
  )

  return <Dashboard body={body()} />
}

export default LeaveReview;