import { withStyles } from '@material-ui/core/styles'
import { Checkbox } from '@material-ui/core'
import pallete from './colors'

const CustomCheckBox = withStyles({
  root: {
    '&$checked': { color: pallete.primary },
  },
  checked: {},
})((props: any) => <Checkbox color="default" {...props} />)

interface iCheckBoxComponentProps {
  isChecked?: Boolean
  defaultChecked?: Boolean
  onChange: Function
  name?: String
  size?: String
}

const MuiCheckBox = (props: iCheckBoxComponentProps) => {
  return (
    <CustomCheckBox checked={props.isChecked} defaultChecked={props.defaultChecked} onChange={props.onChange} size={props.size} name={props?.name} />
  )
}

export default MuiCheckBox