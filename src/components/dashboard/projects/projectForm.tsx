import { Box, Paper, Typography, Container, Grid, CircularProgress } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { createProject } from "./api";
import { getProjectById, updateProject } from "./api";
import { getAllClients } from "../clients/apis";
import { getAllemploys } from "../employee/api";
import { projectCreationForm } from "./formFields";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { iClient } from "../clients/interface";
import { iEmployee } from '../employee/interface';
import { iHistoryProp } from './interface';
import pallete from "../../common/colors";
import MuiTextfield from "../../common/textInput";
import Dashboard from "..";
import MuiButton from "../../common/button";
import MuiSelect from "../../common/select";
import NotificationSnackbar from "../../common/snackbar";
import moment from 'moment';

const useStyles = makeStyles((theme: any) => ({
  profileBanner: { background: pallete.primary, height: 150, position: "relative", boxSizing: "border-box", width: "100%" },
}));

const ProjectForm = () => {
  const classes = useStyles();
  const history: iHistoryProp = useHistory();
  const { projId }: { projId: string } = useParams()
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [formValues, setFormValues] = useState<object>({});
  const [projects, setProjects] = useState<any>({})
  const [clients, setClients] = useState<iClient[]>([])
  const [employees, setEmployees] = useState<iEmployee[]>([])
  const [hasMadeApiCall, setHasMadeApiCall] = useState<boolean>(false)
  const [updatedProject, setUpdatedProject] = useState<any>({})

  useEffect(() => {
    let hasUnMounted = false
    const getData = async () => {
      !history.location.pathname.includes('/project/create') && await getProjectById(hasUnMounted, setProjects, setSnackbar, projId)
      await getAllemploys(hasUnMounted, setEmployees, setSnackbar)
      await getAllClients(hasUnMounted, setClients, setSnackbar)
      setHasMadeApiCall(true)
    }
    getData()

    return (() => {
      hasUnMounted = true
    })
  }, [projId, history])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: "" });
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message });
  const isPage = (page: string) => history.location?.state?.page === page

  const handleFormInput = (e: any) => {
    if (isPage("create")) {
      setFormValues({ ...formValues, [e.target.name]: e.target.value })
    } else if (isPage("edit")) {
      let prevProject = { ...projects }
      let projectToUpdate: { [key: string]: any } = prevProject
      prevProject[e.target.name] = e.target.value
      setUpdatedProject(projectToUpdate)
    }
  };

  const saveForm = (e: any, showSnackbar: any) => {
    e.preventDefault();
    if (isPage("create")) {
      createProject(formValues, showSnackbar, employees, clients);
    } else if (isPage("edit")) {
      updateProject(updatedProject, employees, showSnackbar, clients, projId);
    }
  };

  const selectData = (item: any) => {
    if (isPage("create") && item.label === "Client") {
      return clients.map((item: any) => item.name)
    } else if (isPage("create") && item.label !== "Client") {
      return employees.map((item: any) => item.fullName)
    } else if (isPage("edit") && item.label === "Client") {
      return clients.map((item: any) => item.name)
    } else if (isPage("edit") && item.label !== "Client") {
      return employees.map((item: any) => item.fullName)
    }
  }

  const textFieldDeafultValue = (item: any) => {
    if (isPage("edit") && (item.type === "date")) {
      return moment(projects[item?.name] ?? "").format("YYYY-MM-DD")
    } else if (isPage("edit")) {
      return projects[item?.name]
    }
  }

  const selectDefaultData = (item: any) => {
    if (isPage("edit") && (item.label === "Client")) {
      return projects.client?.name
    } else if (isPage("edit") && (item.label === "Manager")) {
      return projects.manager?.fullName
    } else if (isPage("edit") && (item.label === "Voice")) {
      return projects.voice?.fullName
    } else if (isPage("edit") && (item.label === "Resources")) {
      return projects.resources.map((item: any) => item.fullName)
    } else if (isPage("edit") && (item.label === "Currency")) {
      return projects.currency
    } else if (isPage("edit") && (item.label === "Project type")) {
      return projects.projectType
    }
  }

  const renderFields = (formFields: Array<any>) =>
    formFields.map((item: any) => (
      <Grid item xs={12} sm={6} md={4}>
        {item.field === "input" ? (
          <MuiTextfield
            variant={item?.variant}
            defaultValue={textFieldDeafultValue(item)}
            onChange={(e: any) => handleFormInput(e)}
            name={item.name}
            placeholder={item?.placeholder}
            label={item?.label}
            type={item?.type}
            size={item?.size}
            required={item?.required}
            fullWidth={item?.fullWidth}
            multiline={item?.multiline}
            rows={item?.rows}
            InputLabelProps={
              item.type === "date" ? { shrink: true } : undefined
            }
          />
        ) : (
          <MuiSelect
            variant={item.variant}
            name={item.name}
            label={item.label}
            data={item.data ?? selectData(item)}
            size={item.size}
            fullWidth={item.fullWidth}
            onChange={(e: any) => handleFormInput(e)}
            defaultValue={selectDefaultData(item)}
            multiple={item.multiple}
          />
        )}
      </Grid>
    ));

  const body = () => (
    hasMadeApiCall ?
      <Box>
        <Container maxWidth="lg">
          <Paper elevation={2}>
            <Box className={classes.profileBanner}>
              <Box pl={5} pt={8}>
                <Typography variant="h5" style={{ color: pallete.white }}>{isPage("create") ? "Create Project" : "Edit Project"}</Typography>
              </Box>
            </Box>
            <Box px={7} py={7}>
              <form onSubmit={(e: any) => saveForm(e, showSnackbar)}>
                <Grid container spacing={2}>{renderFields(projectCreationForm)}</Grid>
                <Box display="flex" alignItems="center" flexWrap="wrap">
                  <Box width="150px" my={4} alignItems="center" display="flex">
                    <MuiButton variant="contained" label="Save" className="primaryBtn" fullWidth type="submit" />
                  </Box>
                  <Box width="150px" my={4} ml={2} alignItems="center" display="flex">
                    <MuiButton variant="outlined" label="Back" className="otherBtn" onClick={(e) => history.goBack()} />
                  </Box>
                </Box>
              </form>
            </Box>
          </Paper>
        </Container>
        {snackbar.open && (<NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />)}
      </Box >
      : <Box textAlign="center"><CircularProgress /></Box>
  );
  return <Dashboard body={body()} />;
};

export default ProjectForm;
