import { Box } from '@material-ui/core'
import Dashboard from '..'

const Setting = () => {

  const body = () => (
    <Box>
      setting
    </Box>
  )

  return <Dashboard body={body()} />
}

export default Setting