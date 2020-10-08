import React, { Fragment, useState, useEffect } from "react";
import { Paper, Typography, Grid, Button, withStyles } from "@material-ui/core";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import DashboardStyles from "../DashboardStyles";
import { getRestaurants } from "../../../../common/restaurant";
import BookingTable from "./booking/BookTable";

const BookingPage = (props) => {
  const { classes } = props;
  const [restaurantPanels, setRestaurantPanels] = useState();
  const [restaurantSelected, setRestaurantSelected] = useState();

  useEffect(() => {
    function createPanels(restaurants, setRestaurantPanels) {
      let restaurantPanels = [];

      restaurants.forEach(function (restaurant, i) {
        console.log("i", i, "res", restaurant);
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
                    style={{ width: "100%" }}
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

  return (
    <div className={classes.root}>
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

            <Grid container direction="row" justify="center" alignItems="center">
              {restaurantPanels}
            </Grid>
          </Fragment>
        )
      }
    </div>
  );
};

export default withStyles(DashboardStyles)(BookingPage);
