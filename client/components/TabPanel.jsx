import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 448,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { categories, container } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [];
  const tabPanels = [];
  const urls = {
    0: 'https://www.tctc.edu/media/5909/2018-1040.png',
    1: 'https://amazinghealthcareconsultants.com/wp-content/uploads/phr_screenshot_dashboard.gif',
    2: 'https://help.tallie.com/hc/article_attachments/360009901633/photo_4.jpg',
  };

  for (let i = 0; i < categories.length; i++) {
    tabs.push(<Tab key={`tab-${i}`} label={categories[i]} {...a11yProps(i)} />);
    console.log(props);
    tabPanels.push(
      <TabPanel key={`tab-panel-${i}`} value={value} index={i}>
        <img src={urls[i]} />
      </TabPanel>
    );
  }

  return (
    <div className={classes.root}>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        className={classes.tabs}
        scrollButtons='auto'
      >
        {tabs}

        <Tab ref={container}></Tab>
      </Tabs>

      {tabPanels}
    </div>
  );
}
