import React from "react";
import { Typography, withStyles } from "@material-ui/core";
import Navbar from "./Navbar";
import DashboardStyles from "../DashboardStyles";

const HomePage = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Navbar />
      <Typography className={classes.mainTitle} style={{ marginTop: -60 }}>
        Dining made simple
      </Typography>
      <Typography className={classes.title} style={{ marginTop: 10 }}>
        Book a table and order your favourite
      </Typography>
      <Typography className={classes.title}>
        restaurant foods in advance,
      </Typography>
      <Typography className={classes.title}>with Dineout</Typography>

      <img
        src={require("../../../../Assets/dashboardIMG.svg")}
        alt="logo"
        className={classes.logo}
      />
    </div>
  );
};

export default withStyles(DashboardStyles)(HomePage);
