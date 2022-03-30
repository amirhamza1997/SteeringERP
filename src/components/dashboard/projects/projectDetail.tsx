import { iProject } from "./interface";
import { makeStyles } from "@material-ui/styles";
import { useLocation, useHistory } from "react-router";
import { AlarmOn, Assignment, Description, Grade, Note, RateReview, Update, EmojiPeople, AccessibilityNew, RecordVoiceOver, People, } from "@material-ui/icons";
import pallete from "../../common/colors";
import Dashboard from "..";
import moment from "moment";
import Details from "../../common/Details";

const useStyles = makeStyles((theme: any) => ({
  icon: { fontSize: 19, color: pallete.primary },
  headingIcon: { fontSize: 19, color: pallete.primary },
}));

export interface iLocationProp {
  pathname: string;
  state: iProject;
}
export interface iHistoryProp {
  goBack: any;
}

const ProjectDetail = () => {
  const location: iLocationProp = useLocation();
  const history: iHistoryProp = useHistory();
  const classes = useStyles();

  const leftSection = [
    {
      icon: <Description className={classes.icon} />,
      title: "Description",
      value: location?.state?.description,
    },
    {
      icon: <RateReview className={classes.icon} />,
      title: "Work",
      value: location?.state?.typeOfWork,
    },
    {
      icon: <Note className={classes.icon} />,
      title: "Notes",
      value: location?.state?.notes,
    },
    {
      icon: <People className={classes.icon} />,
      title: "Resources",
      value: location?.state?.resources.map((item: any) => item?.fullName),
    },
  ];

  const rightSection = [
    {
      icon: <Update className={classes.headingIcon} />,
      title: "Start date",
      value: moment(location?.state?.startDate).format("MMM Do YY"),
    },
    {
      icon: <AlarmOn className={classes.headingIcon} />,
      title: "End date",
      value: moment(location?.state?.closeDate).format("MMM Do YY"),
    },
    {
      icon: <AccessibilityNew className={classes.headingIcon} />,
      title: "Client",
      value: location?.state?.client?.name,
    },
    {
      icon: <EmojiPeople className={classes.headingIcon} />,
      title: "Manager",
      value: location?.state?.manager?.fullName,
    },
    {
      icon: <RecordVoiceOver className={classes.headingIcon} />,
      title: "Voice",
      value: location?.state?.voice?.fullName,
    },
    {
      icon: <Assignment className={classes.headingIcon} />,
      title: "Term",
      value: location?.state?.term,
    },
    {
      icon: <Grade className={classes.headingIcon} />,
      title: "Rate",
      value: location?.state?.rate,
    },
  ];

  const body = () => (
    <Details
      location={location}
      history={history}
      leftSection={leftSection}
      rightSection={rightSection}
    />
  );

  return <Dashboard body={body()} />;
};

export default ProjectDetail;
