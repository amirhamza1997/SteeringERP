import { makeStyles } from "@material-ui/styles"
import { ReactComponent as MicrosoftIcon } from '../../assets/images/microsoft.svg'
import { ReactComponent as LoginIllustration } from '../../assets/images/login2.svg'
import { Box, FormGroup, FormControlLabel, Typography, Avatar } from '@material-ui/core'
import { decodedToken, formValues } from "./interface"
import { getLoginUserData, loginUser } from './api'
import { Redirect, useParams } from 'react-router'
import { useEffect, useContext, useState } from "react"
import { StoreContext } from "../store"
import pallete from "../common/colors"
import steeringLogo from '../../assets/images/steeringlogo.png'
import MuiTextfield from '../common/textInput'
import MuiButton from '../common/button'
import MuiCheckBox from '../common/checkBox'
import NotificationSnackbar from "../../components/common/snackbar"
import Hidden from '@material-ui/core/Hidden'
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";

const useStyles = makeStyles((theme: any) => ({
  root: { background: `linear-gradient(to right, ${pallete.primary}, ${pallete.primary})`, height: "100%" },
  container: {
    minWidth: "70%", height: "600px", background: pallete.blue100, borderRadius: 10, boxShadow: `0 0 5px 0px ${pallete.white}`,
    [theme.breakpoints.only('xs')]: {
      height: "510px"
    },
  },
  illustrationContainer: { height: "100%", flex: 1 },
  loginContainter: { background: pallete.white, height: "100%", borderRadius: "16px 10px 10px 16px", flex: 1 },
  HeaderLogo: { color: pallete.white },
  headingLetterSpacing: {
    letterSpacing: 2,
    [theme.breakpoints.down('md')]: {
      fontSize: 'small',
    },
  },
  responsiveFont: {
    [theme.breakpoints.down('md')]: {
      fontSize: 'small',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 'medium',
    },
  },
}))

const Login = () => {
  const classes = useStyles()
  const { user, token }: { user: string, token: string } = useParams()
  const { employee } = useContext(StoreContext)
  const [isRemembered, setIsRemembered] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<formValues>({ email: null, password: null })
  const [snackbar, setsnackbar] = useState({ open: false, message: '' })
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    let hasUnMounted = false
    if (user) {
      getLoginUserData(user, hasUnMounted, setsnackbar).then(res => {
        if (res.employee) employee.setUser(res.employee)
        let decodedToken: decodedToken = jwt_decode(token);
        Cookies.set("isAuthenticated", "true", { expires: new Date(decodedToken.exp * 1000) })
        Cookies.set("userId", res.uuid, { expires: new Date(decodedToken.exp * 1000) })
        Cookies.set("userName", res.name, { expires: new Date(decodedToken.exp * 1000) })
        Cookies.set("userRole", res.roles.map((x: any) => x.name).join(','), { expires: new Date(decodedToken.exp * 1000) })
        Cookies.set("permission", res.permissions.map((x: any) => x.name).join(','), { expires: new Date(decodedToken.exp * 1000) })
        if (res.employee) Cookies.set("employeeId", res.employee.uuid, { expires: new Date(decodedToken.exp * 1000) })
        setIsLoggedIn(true)
      })
    }

    return (() => {
      hasUnMounted = true
    })
  }, [user, token, employee])

  const handleRememberMe = (event: any) => setIsRemembered(event.target.checked)
  const handleFormChannge = (e: any) => setFormValues({ ...formValues, [e.target.name]: e.target.value })
  const closeSnackbar = () => setsnackbar({ ...snackbar, open: false, message: '' })
  const showSnackbar = (message: string) => setsnackbar({ ...snackbar, open: true, message: message })

  const handleLogin = (e: any) => {
    e.preventDefault()
    loginUser({ ...formValues }, showSnackbar, setIsLoggedIn).then(res => employee.setUser(res))
  }

  if (isLoggedIn || Cookies.get("isAuthenticated")) {
    return <Redirect to="/" />
  }
  else {
    return (
      <Box className={classes.root}>
        <Box display="flex" alignItems="center" justifyContent="center" height="100%" padding="0 20px">
          <Box className={classes.container} display="flex" alignItems="center">
            <Hidden smDown>
              <Box className={classes.illustrationContainer} px={4}>
                <Box pl={2.5} pt={2} display="flex" alignItems="center">
                  <Box pr={1}><Avatar src={steeringLogo} /></Box>
                  <Typography className={classes.headingLetterSpacing} variant="h6">Steering</Typography>
                </Box>
                <Box height="calc(100% - 112px)" display="flex" alignItems="center" justifyContent="center"><LoginIllustration /></Box>
              </Box>
            </Hidden>
            <Box className={classes.loginContainter}>
              <Hidden mdUp>
                <Box pl={2.5} pt={2} display="flex" alignItems="center">
                  <Box pr={1}><Avatar src={steeringLogo} /></Box>
                  <Typography className={classes.headingLetterSpacing} variant="h6">Steering</Typography>
                </Box>
              </Hidden>
              <Box height="calc(100% - 56px)" display="flex" alignItems="center" justifyContent="center">
                <Box px={3}>
                  <Box textAlign="center" pb={1}><Typography component="div"><Box letterSpacing={2} fontSize="h6.fontSize">Login</Box></Typography></Box>
                  <form onSubmit={handleLogin}>
                    <Box mt={3} min-width="400px" max-width="400px">
                      <Box pb={1.5}>
                        <MuiTextfield variant="outlined" label="Email" name="email" type="text" size="small" placeholder="User name" onChange={handleFormChannge} fullWidth={true} required={true} />
                      </Box>
                      <Box pb={1.5}>
                        <MuiTextfield variant="outlined" label="Password" name="password" type="password" size="small" placeholder="Password" onChange={handleFormChannge} fullWidth={true} required={true} />
                      </Box>
                      <Box display="flex" alignItems="center" justifyContent={{ xs: "center", sm: "space-between" }} flexWrap={{ xs: "wrap", sm: "noWrap" }}>
                        <FormGroup row>
                          <FormControlLabel
                            control={<MuiCheckBox isChecked={isRemembered} onChange={handleRememberMe} name="remember" size="small" />}
                            label={<Typography className={classes.responsiveFont} variant="subtitle1">Remember me</Typography>}
                          />
                        </FormGroup>
                        <Typography className={classes.responsiveFont} variant="subtitle1">Forgot password?</Typography>
                      </Box>
                      <Box pt={3}>
                        <MuiButton className="primaryBtn" type="submit" variant="contained" label="Login" fullWidth />
                      </Box>
                      <Box py={3} className='or_divider' textAlign="center"><Typography variant="caption">OR</Typography></Box>
                      <Box>
                        <MuiButton variant="outlined" href={`${process.env.REACT_APP_BASE_URL}/user/externallogin`} className="microsoftBtn" startIcon={<MicrosoftIcon />} label="Login with microsoft" fullWidth />
                      </Box>
                    </Box>
                  </form>
                </Box>
              </Box>
            </Box>
            {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
          </Box>
        </Box>
      </Box>
    )
  }
}

export default Login