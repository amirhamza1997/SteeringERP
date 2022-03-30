import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Typography, Box, AppBar } from '@material-ui/core'
import { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import pallete from './colors'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: pallete.white,
    color: pallete.black,
  },
  tabs: {
    "& .Mui-selected": {
      color: pallete.primary,
    },
    "& .MuiTabs-indicator": {
      backgroundColor: pallete.primary
    }
  }

}));

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box px={0.5} pt={3.5}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface iTabsProps {
  data: Array<any>
  label: Array<any>
}

const MuiTab = (props: iTabsProps) => {
  const classes = useStyles();
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <AppBar position="static" className={classes.root} >
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" className={classes.tabs}>
          {props.label.map(item => (<Tab key={item} label={item} {...a11yProps(0)} />))}
        </Tabs>
      </AppBar>
      {
        props.data.map((item: any, idx: number) => (
          <TabPanel key={idx} value={value} index={idx}>
            {item}
          </TabPanel>
        ))
      }
    </Fragment>
  );
}

export default MuiTab