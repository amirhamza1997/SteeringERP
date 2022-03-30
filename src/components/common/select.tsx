import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { useState } from 'react'
import pallete from './colors'

interface iSelectComponentProps {
  variant: "standard" | "filled" | "outlined" | undefined,
  label?: string,
  size?: "small" | "medium" | undefined,
  fullWidth?: boolean | undefined,
  data?: Array<any>
  defaultValue?: string
  onChange: Function
  name: string
  disabled?: boolean
  multiple?: boolean
  required?: boolean
}

const theme = createTheme({
  palette: {
    primary: { main: pallete.primary },
  },
})

const MuiSelect = (props: iSelectComponentProps) => {
  const [selectValue, setSelectValue] = useState<string | number | Array<any>>(props.multiple ? (props.defaultValue ?? []) : (props.defaultValue ?? ''))

  const handleChange = (event: any) => {
    const { target: { value } } = event;
    props.multiple ? setSelectValue(typeof value === 'string' ? value.split(',') : value) : setSelectValue(value)
    props.onChange(props.multiple ? (typeof value === 'string' ? (event.target.value.split(',') && event) : event) : event)
  }

  return (
    <ThemeProvider theme={theme}>
      <FormControl variant={props.variant} size={props.size} fullWidth={props.fullWidth} required={props?.required}>
        <InputLabel>{props.label}</InputLabel>
        <Select
          value={selectValue}
          onChange={handleChange}
          label={props.label}
          name={props.name}
          disabled={props?.disabled}
          multiple={props?.multiple}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {props?.data?.map((item: any) => <MenuItem key={item?.label ?? item} value={item?.label ?? item}>{item?.label ?? item}</MenuItem>)}
        </Select>
      </FormControl>
    </ThemeProvider>
  )
}
export default MuiSelect