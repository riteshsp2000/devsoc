import * as React from 'react';

import {
  makeStyles,
  Container,
  ThemeProvider,
  CssBaseline,
} from '@material-ui/core';

import AppBar from './components/AppBar';
import TabNav from './components/TabNav';
import theme from './config/theme';

const App = () => {
  const classes = useStyles();
  const [url, setUrl] = React.useState('https://trial.com');
  const [requestType, setRequestType] = React.useState('GET');

  const sendRequest = () => {
    // tslint:disable-next-line: no-console
    console.log(url, requestType);
  };

  const appBarProps = {
    url,
    setUrl,
    requestType,
    setRequestType,
    sendRequest,
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Container>
          <AppBar {...appBarProps} />
          <TabNav />
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: 'auto',
    minHeight: '100vh',
    backgroundColor: '#282828',
    paddingTop: '30px',
  },
}));
