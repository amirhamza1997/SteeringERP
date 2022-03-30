import { useContext, useState } from "react"
import { makeStyles } from "@material-ui/styles"
import { Box, AppBar, Toolbar, Hidden, IconButton, Avatar, MenuItem, Menu, Tooltip } from "@material-ui/core"
import { NavLink } from "react-router-dom"
import { ExitToApp } from "@material-ui/icons"
import { StoreContext } from "../../../store"
import pallet from "../../../common/colors"
import MenuIcon from '@material-ui/icons/Menu'
import userImg from "../../../../assets/images/user.jpg"
import Cookies from "js-cookie"

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: `0 8px 10px -6px ${pallet.blue200}`,
    backgroundColor: pallet.white,
    width: "calc(100% - 240px)",
    color: pallet.secondary,
    transition: "0.7s ease all",
  },
  close: {
    boxShadow: `0 8px 10px -6px ${pallet.blue200}`,
    backgroundColor: pallet.white,
    width: "calc(100% - 67px)",
    color: pallet.tertiary,
    transition: "0.7s ease all",
  },
  userMenu: { cursor: "pointer" },
  primaryIcon: { color: pallet.primary }
}))

const Topbar = () => {
  const classes = useStyles()
  const { sidebar } = useContext<any>(StoreContext)
  const [openUserMenu, setopenUserMenu] = useState(null)

  const handleLogout = () => {
    Cookies.remove("isAuthenticated")
    Cookies.remove("userRole")
    Cookies.remove("employeeId")
    Cookies.remove("permission")
    Cookies.remove("userId")
    Cookies.remove("userName")
  }

  const handleClick = (event: any) => setopenUserMenu(event.currentTarget)
  const handleClose = () => setopenUserMenu(null)

  const avatarMenuList = [
    { label: "Profile", link: `/profile/view/${Cookies.get("employeeId")}` },
    { label: "Apply Leave", link: '/leave/apply' },
    { label: "My Leave History", link: `/employees/leave-history/${Cookies.get('employeeId')}` },
    { label: "Setting", link: "/setting" },
  ]

  const renderMenu = (menuList: any) => (
    <Menu
      anchorEl={openUserMenu}
      keepMounted
      open={Boolean(openUserMenu)}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
    >
      {menuList.map((item: any) => <MenuItem component={NavLink} key={item.label} to={item.link} onClick={item.label !== "Logout" ? handleClose : handleLogout}>{item.label}</MenuItem>)}
    </Menu>
  )

  return (
    <AppBar className={sidebar.toggle ? classes.root : classes.close}>
      <Toolbar>
        <Box flexGrow={1} display="flex" alignItems="center">
        </Box>
        <Hidden mdDown>
          <Box>
            <Avatar className={classes.userMenu} src={userImg} onClick={handleClick} />
            {renderMenu(avatarMenuList)}
          </Box>
          <Box ml={1}>
            <Tooltip title="Log out">
              <IconButton component={NavLink} to="/login" className={classes.primaryIcon} onClick={handleLogout}><ExitToApp /></IconButton>
            </Tooltip>
          </Box>
        </Hidden>
        <Hidden lgUp>
          <IconButton className={classes.primaryIcon} onClick={handleClick}><MenuIcon /></IconButton>
          {renderMenu([...avatarMenuList, { label: "Logout", link: "/login" }])}
        </Hidden>
      </Toolbar>
    </AppBar >
  )
}

export default Topbar
