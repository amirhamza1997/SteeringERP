import { Box, Typography, Paper, Container, Grid, Avatar, Divider } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from 'react';
import { iLeave } from './interface';
import { useHistory } from 'react-router';
import { getLeaveRequests } from './api';
import Dashboard from '..';
import pallete from "../../common/colors";
import userImg from '../../../assets/images/user.jpg'
import MuiButton from '../../common/button';
import NotificationSnackbar from '../../common/snackbar';
import moment from 'moment';

const useStyles = makeStyles((theme: any) => ({
  profileBanner: { background: pallete.primary, height: 150, position: "relative", boxSizing: "border-box", width: "100%" },
  leaveLabel: { backgroundColor: pallete.green, color: `${pallete.white} !important`, width: 110, borderRadius: 5, padding: 3, textAlign: "center" },
  userAvatar: { height: 80, width: 80, margin: '0 auto' },
  labelHead: { fontSize: 16, marginRight: 15 },
  captionText: { color: pallete.quaternary }
}));

const LeaveRequest = () => {
  const classes = useStyles()
  const history = useHistory()
  const [leave, setLeave] = useState<iLeave[]>([])
  const [snackbar, setSnackbar] = useState({ open: false, message: "" })

  useEffect(() => {
    let hasUnMounted = false
    getLeaveRequests(hasUnMounted, setLeave, setSnackbar)

    return (() => {
      hasUnMounted = true
    })
  }, [])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: "" });

  const body = () => (
    <Box>
      <Container maxWidth="lg">
        <Paper elevation={2}>
          <Box className={classes.profileBanner}>
            <Box pl={5} pt={8}>
              <Typography variant="h5" style={{ color: pallete.white }}>Leave Requests</Typography>
            </Box>
          </Box>
          <Box px={7} py={7}>
            <Grid container spacing={5}>
              {leave.length ? leave.map((item: iLeave, idx: number) => (
                <Grid key={idx} item xs={12} sm={4}>
                  <Paper elevation={3}>
                    <Box p={2}>
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography className={classes.leaveLabel} style={{ backgroundColor: 'green' }} variant="body2">{item?.leaveType.title}</Typography>
                      </Box>
                      <Box pt={2}>
                        <Avatar className={classes.userAvatar} src={userImg} />
                        <Box textAlign="center" pt={1}>
                          <Typography variant="h6">{item?.requestBy?.fullName}</Typography>
                          <Typography className={classes.captionText} variant="caption">{item?.requestBy?.designation?.name}</Typography>
                        </Box>
                        <Box pt={3} display="flex" alignItems="center">
                          <Box><Typography className={classes.labelHead} variant="h6">Requested date:</Typography></Box>
                          <Box><Typography variant="body2">{moment(item?.requestDate).fromNow()}</Typography></Box>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <Box><Typography className={classes.labelHead} variant="h6">Duration:</Typography></Box>
                          <Box><Typography variant="body2">{`${moment(item?.requestedFrom).format("MMM Do YYYY")} - ${moment(item?.requestedTo).format("MMM Do YYYY")}`}</Typography></Box>
                        </Box>
                        <Box py={2}><Divider orientation="horizontal" /></Box>
                        <Box pt={1} display="flex" alignItems="center">
                          <Box pr={1} flex={1}>
                            <MuiButton variant="contained" label="See Request" className="primaryBtn" fullWidth type="submit" onClick={() => history.push(`/leave/review/${item.uuid}`)} />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              )) : <Box><Typography variant="body2">There is no leave requests for now.</Typography></Box>}
            </Grid>
          </Box>
        </Paper>
      </Container>
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </Box >
  )

  return <Dashboard body={body()} />
}

export default LeaveRequest;