import { iCoaDialog } from './interface';
import { createCoa, deleteCoa, updateCoa } from './api';
import { alpha, makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Add, Delete, Edit } from '@material-ui/icons';
import { Box, DialogContent, Divider, Typography } from '@material-ui/core';
import { useState } from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import MuiDialog from '../../common/dialog';
import MuiSelect from '../../common/select';
import MuiTextfield from '../../common/textInput';
import MuiButton from '../../common/button';
import pallete from '../../common/colors'
import NotificationSnackbar from '../../common/snackbar';

function MinusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props: SvgIconProps) {
  return (
    <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

const StyledTreeItem = withStyles((theme: Theme) =>
  createStyles({
    iconContainer: {
      '& .close': {
        opacity: 0.3,
      },
    },
    group: {
      marginLeft: 7,
      paddingLeft: 18,
      borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
  }),
)((props: TreeItemProps) => <TreeItem {...props} />);

const useStyles = makeStyles(
  createStyles({
    root: { height: 264, flexGrow: 1, maxWidth: 400 },
    coaActionIcon: { fontSize: 18, color: pallete.primary },
    coaDeleteIcon: { fontSize: 18, color: pallete.red }
  }),
);

const MuiTree = (props: any) => {
  const classes = useStyles();
  const [dialog, setDialog] = useState<iCoaDialog>({ open: false, name: "", title: "", data: null })
  const [formValue, setFormValue] = useState<any>({})
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message })

  const labelWithActions = (label: string, item: any) => (
    <Box p={1} display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="body2">{label}</Typography>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Add className={classes.coaActionIcon} onClick={(e) => { e.preventDefault(); setDialog({ open: true, title: "Add Chart Of Account", name: "add", data: item }) }} />
        <Edit className={classes.coaActionIcon} onClick={(e) => { e.preventDefault(); setDialog({ open: true, title: "Edit Chart Of Account", name: "edit", data: item }) }} />
        {(!item?.children) && <Delete className={classes.coaDeleteIcon} onClick={(e) => { e.preventDefault(); deleteCoa(item.uuid, showSnackbar).then(res => props.setHasUpdated(true)) }} />}
      </Box>
    </Box>
  )

  const formFields = [
    { variant: "outlined", type: "text", label: "Name", name: "name", defaultValue: "name", placeholder: "John Wick", size: "medium", fullWidth: true, field: "input", validate: { regex: /^[a-zA-Z ]+$/, errorMessage: "Only letters" }, required: true },
    { variant: "outlined", type: "text", label: "Gl_Code", name: "gl_Code", placeholder: "John Wick", size: "medium", fullWidth: true, field: "input", validate: { regex: /^[a-zA-Z ]+$/, errorMessage: "Only letters" }, required: true },
    { variant: "outlined", type: "number", label: "Level", name: "level", placeholder: "John Wick", size: "medium", fullWidth: true, field: "input", required: true },
    { variant: "outlined", type: "number", label: "Rank", name: "rank", placeholder: "eg:2", size: "medium", fullWidth: true, field: "input", required: true },
    { variant: "outlined", label: "Financial Year", name: "financialYear", data: props.financialYear.map((item: any) => item.fy_year), size: "medium", fullWidth: true, field: "select", required: true },
    { variant: "outlined", label: "Company", name: "company", data: props.companies.map((item: any) => item.name), size: "medium", fullWidth: true, field: "select", required: true },
  ]

  const renderTree = (item: any) => (
    <StyledTreeItem key={item.uuid} nodeId={item.uuid} label={labelWithActions(item.name, item)}>
      {Array.isArray(item.children) ? item.children.map((node: any) => renderTree(node)) : null}
    </StyledTreeItem>
  )

  const dialogContent = () => (
    <form>
      {formFields.map((item: any, index: any) => (
        <Box key={index} py={0.5}>
          {item.field === "input" ?
            <MuiTextfield
              key={index}
              variant={item.variant}
              defaultValue={(dialog.data && dialog.name === "edit") ? (dialog.data[item?.name]) : ""}
              inputProps={item.inputProps}
              type={item.type}
              label={item.label}
              name={item.name}
              required={item.required}
              placeholder={item.placeholder}
              size={item.size}
              fullWidth={item.fullWidth}
              multiline={item?.multiline}
              rows={item?.rows}
              onChange={(e: any) => setFormValue((state: any) => ({ ...state, [e.target.name]: e.target.value }))}
              InputLabelProps={item.type === "date" ? { shrink: true } : undefined}
              disabled={item.disabled}
            />
            :
            <MuiSelect
              variant={item.variant}
              name={item.name}
              defaultValue={(dialog.data && dialog.name === "edit") ? (dialog.data[item?.name]) : ""}
              label={item.label}
              data={item.data}
              size={item.size}
              fullWidth={item.fullWidth}
              onChange={(e: any) => setFormValue((state: any) => ({ ...state, [e.target.name]: e.target.value }))}
            />}
        </Box>
      ))}
    </form>
  )

  const handleFormSave = () => {
    const { name, gl_Code, level, rank, financialYear, company } = formValue
    if (name && gl_Code && level && rank && financialYear && company) {
      return dialog.name === "edit" ?
        updateCoa(dialog.data.uuid, formValue, dialog.data, props.companies, props.financialYear, showSnackbar)
          .then(res => { setDialog({ open: false, name: "", title: "", data: null }); props.setHasUpdated(true) }) :
        createCoa({ ...formValue, parent: dialog?.data?.uuid ?? null }, props.companies, props.financialYear, showSnackbar)
          .then(res => { setDialog({ open: false, name: "", title: "", data: null }); props.setHasUpdated(true) })
    } else {
      showSnackbar("Please fill out all the fields")
    }
  }

  return (
    <>
      {props.coa !== null ?
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          defaultEndIcon={<CloseSquare />}
          style={{ height: "auto" }}
        >
          {renderTree(props.coa)}
        </TreeView>
        :
        <Box><Typography variant="body2">Please select filters to get chart of account</Typography></Box>
      }
      <Box py={4}><Divider orientation="horizontal" /></Box>
      <MuiButton label="Create New COA" className="primaryBtn" size="large" onClick={() => setDialog({ open: true, title: "Create new Chart Of Account", name: "new", data: null })}></MuiButton>
      <MuiDialog
        isButtonRequired={false}
        open={dialog.open}
        handleClose={() => setDialog({ open: false, title: "", name: "", data: null })}
        handleSave={handleFormSave}
        handleClickOpen={() => undefined}
        buttonLabel="any"
        buttonClass="primaryBtn"
        dialogContent={<DialogContent><Box mx={2} my={2} >{dialogContent()}</Box></DialogContent>}
        dialogTitle={dialog.title}
      />
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </>
  )
}

export default MuiTree
