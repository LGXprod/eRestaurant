import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import { Helmet } from "react-helmet";
import LoginForm from "./components/LoginForm";
import RegForm from "./components/RegForm";
import Styles from "./Styles";

function Home(props) {
  const { classes } = props;
  const [displaySignIn, setDisplaySignIn] = useState(true);

  return (
    <div className="Home">
      <Helmet>
        <title>Login to your account at DineOut</title>
      </Helmet>

      <div className={classes.root}>
        <AppBar
          position="static"
          style={{ background: "transparent", boxShadow: "none" }}
        >
          <Toolbar>
            <Typography className={classes.logo}>
              <img
                style={{ height: 300 }}
                src={require("../../Assets/dineout.png")}
                alt="Logo"
              />
            </Typography>
            <Button
              color="primary"
              className={classes.button}
              onClick={() => {
                setDisplaySignIn(!displaySignIn);
              }}
              style={{ alignSelf: "center", marginTop: -30 }}
            >
              {displaySignIn ? "SIGN UP" : "LOGIN"}
            </Button>
          </Toolbar>
        </AppBar>
      </div>

      {displaySignIn ? <LoginForm /> : <RegForm />}
    </div>
  );
}

export default withStyles(Styles)(Home);
