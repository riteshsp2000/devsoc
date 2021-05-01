import { makeStyles } from '@material-ui/core';
import React from 'react';
import JSONPretty from 'react-json-pretty';
import { Container } from '@material-ui/core';

interface ResponseProps {
  data: string;
  error: boolean;
  errorMessage: null | string;
}

const Response: React.FC<ResponseProps> = ({ data, error, errorMessage }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Container>
        <p className={`${classes.data} ${error && classes.error}`}>
          {error ? errorMessage : <JSONPretty id='json-pretty' data={data} />}
        </p>
      </Container>
    </div>
  );
};

export default Response;

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '40vh',
    overflowY: 'scroll',
    overflowX: 'scroll',
    position: 'fixed',
    bottom: 0,
    left: 0,
    padding: '40px 30px',
    backgroundColor: '#1d2021',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  data: {
    color: '#b8bb26',
    fontSize: '18px',
  },
  error: {
    color: '#cc2418',
  },
}));
