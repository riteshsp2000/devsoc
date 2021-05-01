import React from 'react';

// Libraries
import {
  makeStyles,
  Menu,
  MenuItem,
  InputBase,
  Button,
} from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';

interface AppBarProps {
  requestType: string;
  setRequestType: (param: string) => void;
  url: string;
  setUrl: (param: string) => void;
  sendRequest: () => void;
}

const AppBar: React.FC<AppBarProps> = ({
  requestType,
  setRequestType,
  url,
  setUrl,
  sendRequest,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = (param: string) => {
    setAnchorEl(null);

    if (typeof param === 'string') {
      setRequestType(param);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleInput = (event: React.BaseSyntheticEvent) => {
    setUrl(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
        className={classes.menu}
      >
        {requestType}
        <ArrowDropDown style={{ marginLeft: '10px' }} />
      </Button>

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map((requestTypeTemp) => (
          <MenuItem
            key={requestTypeTemp}
            onClick={() => handleClose(requestTypeTemp)}
          >
            {requestTypeTemp}
          </MenuItem>
        ))}
      </Menu>

      <InputBase value={url} onChange={handleInput} className={classes.input} />

      <button className={classes.send} onClick={sendRequest}>
        Send
      </button>
    </div>
  );
};

export default AppBar;

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: '40px',
    marginTop: '20px',
    border: '1px solid #ebdbb2',
    color: '#ebdbb2',
    fontSize: '16px',
  },
  menu: {
    borderRight: '1px solid #ebdbb2',
    borderRadius: 0,
    color: '#ebdbb2',
    fontSize: '14px',
    fontFamily: 'Helvetica',
    padding: 'auto 10px',
    // width: '70px',
  },
  input: {
    flex: 1,
    height: '100%',
    borderRadius: '0px',
    padding: '15px',
    color: '#ebdbb2',
    fontSize: '16px',
    fontFamily: 'Helvetica',
  },
  send: {
    width: '100px',
    backgroundColor: '#83a598',
    height: '100%',
    border: 'none',
    fontSize: '16px',
    fontFamily: 'Helvetica',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));
