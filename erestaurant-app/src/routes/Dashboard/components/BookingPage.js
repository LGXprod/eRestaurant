import React from 'react';
import {
  Paper,
  Typography,
  Grid,
  Button,
  withStyles,
} from "@material-ui/core";
import Navbar from './Navbar';
import { Helmet } from "react-helmet";
import DashboardStyles from "../DashboardStyles";

const BookingPage = (props) =>{
  const { classes } = props;

  return (
    <div className={classes.root}>
    <Helmet>
      <title>Dineout | Book a table</title>
    </Helmet>
      <Navbar />
        <Typography
          className={classes.text}
          variant="h3"
        >
          Select a Restaurant
        </Typography>

        <Paper elevation={2} square  className={classes.card}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
        <Typography className={classes.restPhoto}>
          <img
            style={{ width: "100%" }}
            src={require("../../../Assets/restaurant1photo.jpg")}
            alt="Logo"
          />
        </Typography>
        <Typography
          className={classes.restText}
          variant="h3"
        >
          Le Bistrot d'Andre
        </Typography>
        <Button
          className={classes.restButton}
          variant="contained"
        >
          Select
        </Button>

        </Grid>
        </Paper>
    </div>
  )
}

export default withStyles(DashboardStyles)(BookingPage);
