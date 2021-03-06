import React, { Fragment, useState, useEffect } from "react";
import { Paper, Typography, Grid, Button, withStyles } from "@material-ui/core";
import DashboardStyles from "../DashboardStyles";
import { getRestaurants } from "../../../../common/restaurant";
import BookingTable from "./booking/BookTable";
import { getUserInfo } from "../../../../common/user";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "./Navbar";

const BookingPage = (props) => {
  const { classes } = props;
  const [restaurantPanels, setRestaurantPanels] = useState();
  const [restaurantSelected, setRestaurantSelected] = useState();

  useEffect(() => {
    function createPanels(restaurants, setRestaurantPanels) {
      let restaurantPanels = [];

      restaurants.forEach(function (restaurant, i) {
        restaurantPanels.push(
          <Grid item className={classes.control}>
            <Paper elevation={2} square className={classes.card}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Typography className={classes.restPhoto}>
                  <img
                    style={{ width: "100%", height: '200px'}}
                    src={`data:image/png;base64, ${restaurant.img}`}
                    alt="Logo"
                  />
                </Typography>
                <Typography className={classes.restText} variant="h3">
                  {restaurant.name}
                </Typography>
                <Button
                  className={classes.restButton}
                  variant="contained"
                  onClick={() => {
                    setRestaurantSelected(restaurant.name);
                  }}
                >
                  Select
                </Button>
              </Grid>
            </Paper>
          </Grid>
        );
      });

      setRestaurantPanels(restaurantPanels);
    }

    getRestaurants(setRestaurantPanels, createPanels);
  }, []);

  const [logout, setLogout] = useState(false);

  useEffect(() => {
    getUserInfo().then((sessionExists) => {
      if (!sessionExists) setLogout(true);
    });
  }, []);

  return (
    <div className={classes.root}>
    { logout ? <Redirect to="/"/> : null }
    <Helmet>
      <title>Dineout | Book a table</title>
    </Helmet>
      <Navbar />
      {
        restaurantSelected != null ? <BookingTable restaurantName={restaurantSelected} /> : (
          <Fragment>
            <Typography className={classes.text} variant="h3">
              Select a Restaurant
            </Typography>

            <Grid container direction="row" justify="center">
              {restaurantPanels}
            </Grid>
          </Fragment>
        )
      }
    </div>
  );
};

export default withStyles(DashboardStyles)(BookingPage);
