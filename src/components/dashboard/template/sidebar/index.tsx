import { Fragment, useState, useContext } from "react"
import { makeStyles } from "@material-ui/styles"
import { Box, List, ListItem, Divider, Typography, Collapse, Avatar, Tooltip } from "@material-ui/core"
import { NavigateBefore, NavigateNext, Work, Payment, History, ExpandLess, ExpandMore, ListAlt, AccountBox, LocationCity, AccessTime, Money, Domain, Star, WorkOff, AccountCircle, InsertDriveFileOutlined, SupervisedUserCircle, DesktopAccessDisabled, ShowChart, People } from "@material-ui/icons"
import { NavLink } from "react-router-dom"
import { createTheme, ThemeProvider } from "@material-ui/core/styles"
import { StoreContext } from "../../../store"
import pallete from "../../../common/colors"
import steeringLogo from "../../../../assets/images/steeringlogo.png"
import Cookies from "js-cookie"
import "./sidebar.scss"

const useStyles = makeStyles((theme: any) => ({
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
    color: pallete.secondary,
    fontSize: "0.875rem",
    width: "224px",
    "&:hover": { backgroundColor: pallete.blue200 },
  },
  active: { color: pallete.primary, fontWeight: theme.typography.fontWeightMedium, backgroundColor: pallete.blue100 },
  icon: { color: pallete.primary, height: 27, marginRight: theme.spacing(2.5) },
  expandIcon: { marginLeft: "24px", color: pallete.primary },
  nestedListOpen: { marginLeft: "17px", color: pallete.tertiary, transition: "0.5s ease all" },
  nestedListClose: { color: pallete.tertiary, width: "100%", transition: "0.5s ease all" },
  primaryIcon: { color: pallete.primary, height: 27, cursor: "pointer" },
  primaryColor: { color: pallete.primary },
  navText: { fontSize: 14 }
}))

const theme = createTheme({
  overrides: {
    MuiTouchRipple: {
      child: {
        backgroundColor: pallete.primary
      }
    }
  }
});

interface iListItemProps {
  name: string,
  icon: HTMLElement,
  isSubMenu: boolean,
  props?: object | undefined
  toggleState?: boolean | undefined
  setToggleState?: any
}

const Sidebar = () => {
  const [adminListOpen, setAdminListOpen] = useState<boolean>(false)
  const { sidebar } = useContext(StoreContext)
  const classes = useStyles()

  const sidebarMenuList = [
    { name: 'Company', icon: <LocationCity className={classes.icon} />, isSubMenu: false, visibleTo: ['super', 'sales'], props: { activeClassName: classes['active'], component: NavLink, to: '/company', exact: true } },
    { name: 'Clients', icon: <AccountCircle className={classes.icon} />, isSubMenu: false, visibleTo: ['super', 'sales',], props: { activeClassName: classes['active'], component: NavLink, to: '/client', exact: true } },
    { name: 'Projects', icon: <InsertDriveFileOutlined className={classes.icon} />, isSubMenu: false, visibleTo: ['super', 'sales', 'pm'], props: { activeClassName: classes['active'], component: NavLink, to: '/project', exact: true } },
    { name: 'Tasks', icon: <Payment className={classes.icon} />, isSubMenu: false, visibleTo: ['super', 'pm', 'dev'], props: { activeClassName: classes['active'], component: NavLink, to: '/task', exact: true } },
    { name: 'Employees', icon: <ListAlt className={classes.icon} />, visibleTo: ['super', 'hr'], isSubMenu: false, props: { activeClassName: classes['active'], component: NavLink, to: '/hr/employees', exact: true } },
    { name: 'Attendance', icon: <AccountBox className={classes.icon} />, visibleTo: ['super', 'hr', 'admin'], isSubMenu: false, props: { activeClassName: classes['active'], component: NavLink, to: '/hr/attendance', exact: true } },
    { name: 'Company', icon: <LocationCity className={classes.icon} />, isSubMenu: false, visibleTo: ['super', 'account'], props: { activeClassName: classes['active'], component: NavLink, to: '/company', exact: true } },
    { name: 'Department', icon: <Domain className={classes.icon} />, isSubMenu: false, visibleTo: ['super', 'hr'], props: { activeClassName: classes['active'], component: NavLink, to: '/department', exact: true } },
    { name: 'Pay Scale', icon: <Money className={classes.icon} />, isSubMenu: false, visibleTo: ['super', 'hr'], props: { activeClassName: classes['active'], component: NavLink, to: '/payscale', exact: true } },
    { name: 'Designation', icon: <Star className={classes.icon} />, isSubMenu: false, visibleTo: ['super', 'hr'], props: { activeClassName: classes['active'], component: NavLink, to: '/designation', exact: true } },
    { name: 'Office Shift', icon: <AccessTime className={classes.icon} />, isSubMenu: false, visibleTo: ['super', 'hr'], props: { activeClassName: classes['active'], component: NavLink, to: '/shift', exact: true } },
    { name: 'Chart of Account', icon: <ShowChart className={classes.icon} />, isSubMenu: false, visibleTo: ['super', 'account'], props: { activeClassName: classes['active'], component: NavLink, to: '/chartofaccounts', exact: true } },
    { name: 'Leave Requests', icon: <WorkOff className={classes.icon} />, isSubMenu: false, visibleTo: ['super', 'hr'], props: { activeClassName: classes['active'], component: NavLink, to: '/employees/leave-requests', exact: true } },
    { name: 'Leave Records', icon: <History className={classes.icon} />, isSubMenu: false, visibleTo: ['super', 'hr'], props: { activeClassName: classes['active'], component: NavLink, to: '/employees/leave-record', exact: true } },
    { name: 'Users', icon: <People className={classes.icon} />, isSubMenu: false, visibleTo: ['super', 'admin'], props: { activeClassName: classes['active'], component: NavLink, to: '/user', exact: true } },
    { name: 'User Roles', icon: <SupervisedUserCircle className={classes.icon} />, isSubMenu: false, visibleTo: ['super', 'admin'], props: { activeClassName: classes['active'], component: NavLink, to: '/admin/userRoles', exact: true } },
    { name: 'Permissions', icon: <DesktopAccessDisabled className={classes.icon} />, isSubMenu: false, visibleTo: ['super', 'admin'], props: { activeClassName: classes['active'], component: NavLink, to: '/admin/permissions', exact: true } },
    {
      name: 'Admin', icon: <Work className={classes.icon} />, isSubMenu: true, toggleState: adminListOpen, setToggleState: setAdminListOpen, visibleTo: ['super', 'admin'],
      subMenuList: [
        { name: 'Lists', icon: <ListAlt className={classes.icon} />, isSubMenu: false, props: { activeClassName: classes['active'], component: NavLink, to: '/admin/lists', exact: true } }
      ]
    },
  ]

  const renderListItem = (item: iListItemProps) => (
    <ListItem key={item.name} button disableGutters {...item.props} className={classes.item} onClick={() => item.isSubMenu ? item.setToggleState(!item.toggleState) : undefined}>
      <Box display="flex" alignItems="center">
        {item.icon}
        <Typography className={classes.navText} variant="h6">{item.name}</Typography>
      </Box>
      {item.isSubMenu && (item.toggleState ? <ExpandLess className={classes.expandIcon} /> : <ExpandMore className={classes.expandIcon} />)}
    </ListItem>
  )

  return (
    <Box className={sidebar.toggle ? "sidebar" : "sidebar close"}>
      <Box className="inner">
        <Box pt={1} px={1} display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap-reverse">
          <Box
            style={{ marginTop: `${sidebar.toggle ? "0px" : "40px"}`, marginBottom: `${sidebar.toggle ? "0px" : "16px"}`, transition: "0.7s ease all" }}
            display="flex"
            alignItems="center"
          >
            <Avatar src={steeringLogo} />
            <Box ml={1}><Typography variant="h6" className={classes.primaryColor}>Steering</Typography></Box>
          </Box>
          <Box style={{ marginLeft: `${sidebar.toggle ? "0px" : "8px"}`, marginTop: `${sidebar.toggle ? "0px" : "8px"}`, transition: "0.7s ease all" }}>
            {sidebar.toggle ?
              <Tooltip title="Contract" placement="bottom-start"><NavigateBefore className={classes.primaryIcon} onClick={() => sidebar.setToggle(false)} /></Tooltip>
              :
              <Tooltip title="Expand" placement="bottom-start"><NavigateNext className={classes.primaryIcon} onClick={() => sidebar.setToggle(true)} /></Tooltip>
            }
          </Box>
        </Box>
        <Box pb={2} pt={1.125}><Divider /></Box>
        <ThemeProvider theme={theme}>
          <List>
            {sidebarMenuList.map((item: any) => (
              item.visibleTo.some((x: any) => Cookies.get('userRole')?.split(',')?.includes(x)) &&
              <Fragment key={item.name}>
                {!sidebar.toggle ? <Tooltip title={item.name} placement="bottom-start">{renderListItem(item)}</Tooltip> : renderListItem(item)}
                {item.isSubMenu &&
                  <Collapse in={item.toggleState} timeout="auto" unmountOnExit>
                    <List className={sidebar.toggle ? classes.nestedListOpen : classes.nestedListClose} disablePadding>
                      {item.subMenuList.length && item.subMenuList.map((item: any) => (
                        !sidebar.toggle ? <Tooltip key={item.name} title={item.name} placement="bottom-start">{renderListItem(item)}</Tooltip> : renderListItem(item)))}
                    </List>
                  </Collapse>
                }
              </Fragment>
            ))}
          </List>
        </ThemeProvider>
      </Box>
    </Box>
  )
}

export default Sidebar
