import { Box, Container, Divider, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useEffect, useState } from 'react'
import { getAllCoa, getAllFinancialYear } from './api'
import { iCompany } from '../company/interface'
import { getAllCompanies } from '../company/apis'
import { iCoaFilter } from './interface'
import Dashboard from '..'
import MuiTree from './muiTree'
import pallete from '../../common/colors'
import MuiSelect from '../../common/select'
import NotificationSnackbar from '../../common/snackbar'
import MuiButton from '../../common/button'

const useStyles = makeStyles((theme: any) => ({
  taskBanner: { background: pallete.primary, height: 150, position: "relative" },
  infoBox: { border: '1px solid grey', height: 98, position: "relative" },
  taskBannerHeading: { color: `${pallete.white} !important` },
  infoBoxHeading: { color: `${pallete.black} !important` },
  root: { width: "44%" },
}))

const ChartOfAccounts = () => {
  const classes = useStyles()
  const [coa, setCoa] = useState<any>(null)
  const [companies, setCompanies] = useState<iCompany[]>([])
  const [financialYear, setFinancialYear] = useState<any[]>([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })
  const [hasUpdated, setHasUpdated] = useState<boolean>(false)
  const [coaFilter, setCoaFilter] = useState<iCoaFilter>({ fyId: null, companyId: null })

  useEffect(() => {
    let hasUnMounted = false
    getAllCompanies(hasUnMounted, setCompanies, setSnackbar)
    getAllFinancialYear(hasUnMounted, setFinancialYear, setSnackbar)

    return (() => {
      hasUnMounted = true
    })
  }, [])

  useEffect(() => {
    let hasUnMounted = false
    const filter = {
      ...coaFilter,
      fyId: financialYear.filter(x => x.fy_year === coaFilter.fyId)[0]?.uuid,
      companyId: companies.filter(x => x.name === coaFilter.companyId)[0]?.uuid
    }
    if (coaFilter.fyId && coaFilter.companyId && hasUpdated) getAllCoa(hasUnMounted, setCoa, filter, setSnackbar)
    setHasUpdated(false)

    return (() => {
      hasUnMounted = true
    })
  }, [hasUpdated, coaFilter, companies, financialYear])

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })

  const body = () => (
    <Container maxWidth='lg'>
      <Paper elevation={2}>
        <Box className={classes.taskBanner}>
          <Box pt={7} pl={5}>
            <Typography className={classes.taskBannerHeading} variant="h6">Chart of Accounts</Typography>
          </Box>
        </Box>
        <Box px={7} pt={3}><Typography variant="h6">COA Filter</Typography></Box>
        <Box px={7} py={3} display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
          <Box display="flex" alignItems="center" flexWrap="wrap">
            <Box width="300px" my={1} mr={2}>
              <MuiSelect
                variant="outlined"
                size="medium"
                onChange={(e: any) => setCoaFilter((state: iCoaFilter) => ({ ...state, [e.target.name]: e.target.value }))}
                name="companyId"
                label="Company"
                data={(companies && companies.length) ? companies.map(x => x.name) : []}
                fullWidth
              />
            </Box>
            <Box width="300px" my={1}>
              <MuiSelect
                variant="outlined"
                size="medium"
                onChange={(e: any) => setCoaFilter((state: iCoaFilter) => ({ ...state, [e.target.name]: e.target.value }))}
                name="fyId"
                label="Financial Year"
                data={(financialYear && financialYear.length) ? financialYear.map(x => x.fy_year) : []}
                fullWidth
              />
            </Box>
          </Box>
          <MuiButton label="Show COA" className="primaryBtn" size="large" onClick={() => setHasUpdated(true)} />
        </Box>
        <Box px={7}><Divider orientation="horizontal" /></Box>
        <Box px={7} py={7}>
          {(coa && coaFilter.fyId && coaFilter.companyId) &&
            <Box mb={2}><Typography variant="h6">{`${coaFilter.companyId} | ${coaFilter.fyId}`}</Typography></Box>
          }
          <MuiTree
            coa={coa}
            setHasUpdated={setHasUpdated}
            companies={companies}
            financialYear={financialYear}
          />
        </Box>
      </Paper>
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </Container>
  )

  return <Dashboard body={body()} />
}

export default ChartOfAccounts;