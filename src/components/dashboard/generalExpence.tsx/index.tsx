import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Dashboard from '..';
import MuiButton from '../../common/button';
import pallete from '../../common/colors';
import MuiSelect from '../../common/select';
import MuiTextfield from '../../common/textInput';

const useStyles = makeStyles((theme: any) => ({
  taskBanner: { background: pallete.primary, height: 150, position: "relative" },
  taskBannerHeading: { color: `${pallete.white} !important` }
}))

const GeneralExpense = () => {
  const classes = useStyles()

  const body = () => (
    <Box>
      <Container maxWidth='lg'>
        <Paper elevation={2}>
          <Box className={classes.taskBanner}>
            <Box pt={7} pl={5}>
              <Typography className={classes.taskBannerHeading} variant="h6">General Expenses</Typography>
            </Box>
          </Box>
          <Box ml={28} px={7} py={7}>
            <Box pb={2}>
              <Grid container spacing={2} >
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6">Type of Expense</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <MuiSelect
                    size='medium'
                    variant="outlined"
                    data={['Administrative Expenses', 'Location Expenses', 'Accounting and Banks Expenses', 'Education and training Expenses', 'Business Insurance Expenses']}
                    onChange={(e: any) => undefined}
                    name="name"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box pb={2}>
              <Grid container spacing={2} >
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6">Payment Type</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <MuiSelect
                    size='medium'
                    variant="outlined"
                    data={['Cash', 'Cheque']}
                    onChange={(e: any) => undefined}
                    name="name"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box pb={2}>
              <Grid container spacing={2} >
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6">Party (Pay to)</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <MuiSelect
                    size="medium"
                    variant="outlined"
                    data={['Amenda', 'Alex Arrivalo']}
                    onChange={(e: any) => undefined}
                    name="name"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box pb={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6">Amount</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <MuiTextfield
                    size="medium"
                    fullWidth
                    type="number"
                    variant="outlined"
                    onChange={(e: any) => undefined}
                    name="name"
                  />
                </Grid>
              </Grid>
            </Box>
            <Grid style={{ justifyContent: 'end', paddingTop: "28px", display: "flex" }} item xs={12} sm={6} md={9}>
              <Box pr={1}>
                <MuiButton variant="outlined" size="medium" label="Add" className="primaryBtn" onClick={() => undefined} />
              </Box>
              <MuiButton variant="outlined" size="medium" label="Cancel" className="otherBtn" onClick={() => undefined} />
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
  return <Dashboard body={body()} />
}

export default GeneralExpense