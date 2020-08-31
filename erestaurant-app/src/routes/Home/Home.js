import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Helmet } from "react-helmet";
import LoginForm from "./components/LoginForm";
import RegForm from "./components/RegForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 20,
    marginRight: 80,
    marginTop: -100,
  },
  logo: {
    flexGrow: 1,
  },
  button: {
    alignSelf: "center",
    marginTop: -30,
  },
}));

function Home() {
  const [displaySignIn, setDisplaySignIn] = useState(true);
  const classes = useStyles();

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

export default Home;
