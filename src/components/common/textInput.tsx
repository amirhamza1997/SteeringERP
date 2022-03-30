import { TextField } from '@material-ui/core'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import pallete from './colors'

export interface iTextComponentProps {
  variant: "standard" | "filled" | "outlined" | undefined,
  label?: string,
  placeholder?: string,
  name?: string
  onChange: Function
  type: string,
  size?: "small" | "medium" | undefined,
  fullWidth?: boolean | undefined
  multiline?: boolean | undefined
  required?: boolean | undefined
  helperText?: string
  rows?: number | undefined
  inputProps?: object | undefined
  InputLabelProps?: object | undefined
  error?: boolean | undefined
  defaultValue?: string
  disabled?: boolean
}

const theme = createTheme({
  palette: {
    primary: { main: pallete.primary },
  },
})

const MuiTextfield = (props: iTextComponentProps) => (
  <ThemeProvider theme={theme}>
    <TextField
      variant={props?.variant}
      label={props?.label}
      name={props?.name}
      type={props?.type}
      onChange={(e) => props.onChange(e)}
      size={props.size}
      error={props?.error}
      placeholder={props?.placeholder}
      fullWidth={props?.fullWidth}
      required={props?.required}
      multiline={props?.multiline}
      rows={props?.rows}
      InputLabelProps={props?.InputLabelProps}
      InputProps={props?.inputProps}
      defaultValue={props?.defaultValue}
      disabled={props?.disabled}
      helperText={props?.helperText}
    />
  </ThemeProvider>
)

export default MuiTextfield