import { useContext } from "react"
import { makeStyles } from "@material-ui/styles"
import { StoreContext } from "../store"
import { Box } from "@material-ui/core"
import Topbar from "./template/topbar"
import Sidebar from "./template/sidebar"

const useStyles = makeStyles((theme) => ({
  contentExpand: {
    padding: "90px 25px 40px 270px",
    transition: "0.7s ease all",
  },
  contentClose: {
    padding: "90px 25px 40px 95px",
    transition: "0.7s ease all",
  },
}))

const Dashboard = (props: any) => {
  const classes = useStyles()
  const { sidebar } = useContext(StoreContext)

  return (
    <>
      <Topbar />
      <Sidebar />
      <Box className={sidebar.toggle ? classes.contentExpand : classes.contentClose}>
        {props.body}
      </Box>
    </>
  )
}

export default Dashboard
