import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

// Using history in props for routing to different components
const Navbar = (props) => {

  const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeButton: {
    textTransform: "none",
    fontFamily: 'Nunito-Bold',
    color: "black",
    marginTop: -120,
  },
  bookButton: {
    marginLeft: "20px",
    textTransform: "none",
    color: "black",
    fontFamily: 'Nunito-Bold',
    marginTop: -120,
  },
  logoutButton: {
    marginLeft: "20px",
    textTransform: "none",
    color: "#54B82A",
    fontFamily: 'Nunito-Bold',
    marginTop: -120,
    marginRight: -31,
  },
  logo: {
    maxWidth: 300,
    marginTop: -80,
    marginLeft: -108,
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
            color="inherit"
            className={classes.homeButton}
            onClick={() => props.history.push('/Dashboard')}
          >
            Home
          </Button>
          <Button
            color="inherit"
            className={classes.bookButton}
            onClick={() => props.history.push('/Booking')}
          >
          Book a table
          </Button>
          <Button
            color="inherit"
            className={classes.bookButton}
            onClick={() => props.history.push('/UserAccount')}
          >
          Account
          </Button>
          <Button
            color="inherit"
            className={classes.logoutButton}
          >
          Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
// Wrapping Navbar in a withRouter function in order to give it access to
// this.props.history to redirect the user to the different components
export default withRouter(Navbar);
