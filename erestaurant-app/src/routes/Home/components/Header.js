import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 80,
    marginRight: 80,
    marginTop: -80,
  },
  logo: {
    flexGrow: 1,
  },
  button: {
    alignSelf: "center",
    color: "white",
    marginTop: -30,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
          <Typography className={classes.logo}>
             <img style={{ height: 250}} src={require('../../../Assets/dineout.png')} alt="Logo"/>
          </Typography>
          <Button color="primary" className={classes.button}>
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
