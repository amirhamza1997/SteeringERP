import { Box, Typography } from '@material-ui/core'
import Dashboard from '..'

const Landing = () => {

  const body = () => (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Typography variant="h4">Steering</Typography>
    </Box>
  )

  return (
    <Dashboard body={body()} />
  )
}

export default Landing