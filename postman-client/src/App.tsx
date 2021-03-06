import * as React from 'react';

import {
  makeStyles,
  Container,
  ThemeProvider,
  CssBaseline,
} from '@material-ui/core';
import axios from 'axios';

import AppBar from './components/AppBar';
import TabNav from './components/TabNav';
import Response from './components/Response';
import theme from './config/theme';

const App = () => {
  const classes = useStyles();
  const [url, setUrl] = React.useState('https://trial.com');
  const [requestType, setRequestType] = React.useState('GET');
  const [data, setData] = React.useState<any>(null);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<null | string>(null);

  const sendRequest = async () => {
    // @ts-ignore
    try {
      const { data: requestData } = await axios.get(url);
      setData(requestData);
      console.log(data);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      console.log(error);
    }
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
          <Response data={data} error={error} errorMessage={errorMessage} />
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
