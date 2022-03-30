import { Box, Paper, Typography, Container, Grid, CircularProgress } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { createClient, getClientById, updateClient } from "./apis";
import { getAllCompanies } from "../projects/api";
import { projectCreationForm } from "./formFields";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { iHistoryProp } from '../projects/interface';
import pallete from "../../common/colors";
import MuiTextfield from "../../common/textInput";
import Dashboard from "..";
import MuiButton from "../../common/button";
import MuiSelect from "../../common/select";
import NotificationSnackbar from "../../common/snackbar";
import moment from 'moment';

const useStyles = makeStyles((theme: any) => ({
  profileBanner: { background: pallete.primary, height: 150, position: "relative", boxSizing: "border-box", width: "100%" }
}));

const ClientForm = () => {
  const classes = useStyles();
  const history: iHistoryProp = useHistory();
  const { clientId }: { clientId: string } = useParams()
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [formValues, setFormValues] = useState<object>({});
  const [clients, setClients] = useState<any>([])
  const [company, setCompany] = useState<any[]>([])
  const [hasMadeApiCall, setHasMadeApiCall] = useState<boolean>(false)

  useEffect(() => {
    let hasUnMounted = false
    const getData = async () => {
      !history.location.pathname.includes('/client/create') && await getClientById(hasUnMounted, setClients, setSnackbar, clientId, setHasMadeApiCall)
      await getAllCompanies(hasUnMounted, setCompany, setSnackbar)
      setHasMadeApiCall(true)
    }
    getData()

    return (() => {
      hasUnMounted = true
    })
  }, [clientId, history])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: "" });
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message });
  const isPage = (page: string) => history.location?.state?.page === page

  const handleFormInput = (e: any) => {
    if (isPage("create")) {
      setFormValues({ ...formValues, [e.target.name]: e.target.value })
    } else if (isPage("edit")) {
      let prevClient = { ...clients }
      let clientToUpdate: { [key: string]: any } = prevClient
      prevClient[e.target.name] = e.target.value
      setClients(clientToUpdate)
    }
  };

  const saveForm = (e: any, showSnackbar: any, history: iHistoryProp) => {
    e.preventDefault();
    if (isPage("create")) {
      createClient(formValues, showSnackbar, company)
    } else if (isPage("edit")) {
      updateClient(clients, showSnackbar, clientId, company);
    }
  };

  const selectDefaultData = (item: any) => {
    if (isPage("edit") && (item.label === "Location")) {
      return clients.location
    } else if (isPage("edit") && (item.label === "Timezone")) {
      return clients.timezone
    } else if (isPage("edit") && (item.label === "Billing Cycle") && (clients.billingCycle === "weekly")) {
      return "Weekly"
    } else if (isPage("edit") && (item.label === "Billing Cycle") && (clients.billingCycle === "biweekly")) {
      return "Biweekly"
    } else if (isPage("edit") && (item.label === "Billing Cycle") && (clients.billingCycle === "monthly")) {
      return "Monthly"
    } else if (isPage("edit") && (item.label === "Company")) {
      return company.map((items: any) => items.name)
    } else if (isPage("edit") && (item.label === "Billing Mode")) {
      return clients.billingMode
    } else if (isPage("edit") && (item.label === "Relocation") && (clients.relocation === true)) {
      return "Yes"
    } else if (isPage("edit") && (item.label === "Relocation") && (clients.relocation === false)) {
      return "No"
    } else if (isPage("edit") && (item.label === "Remote") && (clients.remote === true)) {
      return "Yes"
    } else if (isPage("edit") && (item.label === "Remote") && (clients.remote === false)) {
      return "No"
    }
  }

  const renderFields = (formFields: Array<any>) =>
    formFields.map((item: any) => (
      <Grid item xs={12} sm={6} md={4} key={item.label}>
        {item.field === "input" ? (
          <MuiTextfield
            variant={item?.variant}
            defaultValue={(isPage("edit") ? (item.type === "date") ? moment(clients[item?.name]).format("YYYY-MM-DD") : clients[item?.name] : "")}
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
            data={item.data ?? (item.label === "Company" && company.map((item: any) => item.name))}
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
                <Typography variant="h5" style={{ color: pallete.white }}>{isPage("create") ? "Create Client" : "Edit Client"}</Typography>
              </Box>
            </Box>
            <Box px={7} py={7}>
              <form onSubmit={(e: any) => saveForm(e, showSnackbar, history)}>
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

export default ClientForm;