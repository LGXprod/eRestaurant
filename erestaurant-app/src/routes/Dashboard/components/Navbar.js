import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

const Navbar = (props) => {

  const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeButton: {
    marginLeft: "20px",
    textTransform: "none",
    fontFamily: 'Nunito-Bold',
    float: "right",
    marginTop: -120,
  },
  bookButton: {
    marginLeft: "20px",
    textTransform: "none",
    fontFamily: 'Nunito-Bold',
    marginTop: -120,
  },
  logoutButton: {
    marginLeft: "20px",
    textTransform: "none",
    color: "#54B82A",
    fontFamily: 'Nunito-Bold',
    marginTop: -120,
    marginRight: 77,
  },
  logo: {
    maxWidth: 300,
    marginTop: -80,
  },
  title: {
   flexGrow: 1,
 },
}));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
          <Typography className={classes.title}>
            <img src={require("../../../Assets/dineout.png")} alt="logo" className={classes.logo} />
          </Typography>
          <Button
            color="black"
            className={classes.homeButton}
            onClick={() => props.history.push('/Dashboard')}
          >
            Home
          </Button>
          <Button
            color="black"
            className={classes.bookButton}
            onClick={() => props.history.push('/BookingPage')}
          >
          Book a table
          </Button>
          <Button
            color="black"
            className={classes.logoutButton}
          >
          Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Navbar);
