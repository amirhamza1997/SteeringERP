import { LocationOn, AccountCircle, NotListedLocation, AccessTime, SettingsRemote, Payment, Forum, CalendarToday, ContactPhone, AttachFile } from '@material-ui/icons'
import { makeStyles } from "@material-ui/styles"
import { iLocationProp } from './interface'
import { useLocation, useHistory } from 'react-router'
import Dashboard from '..'
import pallete from '../../common/colors'
import moment from 'moment'
import Details from "../../common/Details"

const useStyles = makeStyles((theme: any) => ({
  icon: { fontSize: 19, color: pallete.primary },
  headingIcon: { fontSize: 19, color: pallete.primary }
}))

const ClientDetail = () => {
  const location: iLocationProp = useLocation()
  const history = useHistory()
  const classes = useStyles()

  const leftSection = [
    { icon: <AccountCircle className={classes.icon} />, title: "Profile", value: location?.state?.profile },
    { icon: <LocationOn className={classes.icon} />, title: "Location", value: location?.state?.location },
    { icon: <NotListedLocation className={classes.icon} />, title: "Relocation", value: location?.state?.relocation && location.state.relocation === true ? "Yes" : "No" },
    { icon: <SettingsRemote className={classes.icon} />, title: "Remote", value: location?.state?.remote && location?.state?.remote === true ? "Yes" : "No" },
    { icon: <AccessTime className={classes.icon} />, title: "Timezone", value: location?.state?.timezone },
  ]

  const rightSection = [
    { icon: <Payment className={classes.icon} />, title: "Billing Cycle", value: location?.state?.billingCycle },
    { icon: <CalendarToday className={classes.icon} />, title: "Next Invoice", value: moment(location?.state?.nextInvoiceDate).format("MMM Do YY") },
    { icon: <AttachFile className={classes.icon} />, title: "Email", value: location?.state?.email },
    { icon: <ContactPhone className={classes.icon} />, title: "Phone", value: location?.state?.phone },
    { icon: <Forum className={classes.icon} />, title: "Communication", value: location?.state?.communication },
  ]

  const body = () => (
    <Details location={location} history={history} leftSection={leftSection} rightSection={rightSection} />
  )
  return <Dashboard body={body()} />
}

export default ClientDetail