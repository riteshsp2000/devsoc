import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#282828',
    marginTop: '20px',
  },
  appbar: {
    backgroundColor: '#282828',
    boxShadow: 'none',
    color: '#ebdbb2',
  },
  tab: {
    color: '#ebdbb2',
  },
  selected: {
    color: '#83a598 !important',
    borderBottom: '1px solid #83a598 !important',
  },
  labelIcon: {
    textAlign: 'left',
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default' className={classes.appbar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          scrollButtons='auto'
          aria-label='scrollable auto tabs example'
          TabIndicatorProps={{
            color: '#83a598',
          }}
        >
          <Tab
            className={classes.tab}
            classes={{
              selected: classes.selected,
              labelIcon: classes.labelIcon,
            }}
            label='Params'
            {...a11yProps(0)}
          />
          <Tab
            className={classes.tab}
            label='Authorization'
            classes={{
              selected: classes.selected,
              labelIcon: classes.labelIcon,
            }}
            {...a11yProps(1)}
          />
          <Tab
            className={classes.tab}
            classes={{
              selected: classes.selected,
              labelIcon: classes.labelIcon,
            }}
            label='Headers'
            {...a11yProps(1)}
          />
          <Tab
            className={classes.tab}
            classes={{
              selected: classes.selected,
              labelIcon: classes.labelIcon,
            }}
            label='Body'
            {...a11yProps(2)}
          />
          <Tab
            className={classes.tab}
            classes={{
              selected: classes.selected,
              labelIcon: classes.labelIcon,
            }}
            label='Tests'
            {...a11yProps(3)}
          />
          <Tab
            className={classes.tab}
            classes={{
              selected: classes.selected,
              labelIcon: classes.labelIcon,
            }}
            label='Scripts'
            {...a11yProps(3)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
    </div>
  );
}
