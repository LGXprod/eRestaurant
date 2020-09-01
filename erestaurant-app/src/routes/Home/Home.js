import React, { useState, createContext } from "react";
import { Button, withStyles } from "@material-ui/core";
import { Helmet } from "react-helmet";
import LoginForm from "./components/LoginForm";
import RegForm from "./components/RegForm";
import Styles from "./Styles";
import HomeContext from "./HomeContext";

function Home(props) {
  const { classes } = props;
  const [displaySignIn, setDisplaySignIn] = useState(true);

  function switchMethod() {
    setDisplaySignIn((displaySignIn) =>
      displaySignIn ? !displaySignIn : displaySignIn
    );
  }

  return (
    <HomeContext.Provider value={{ displaySignIn, switchMethod }}>
      <div className="Home">
        <Helmet>
          <title>Login to your account at DineOut</title>
        </Helmet>

        <div className={classes.root}>
          <Button
            color="primary"
            className={classes.button}
            onClick={() => {
              setDisplaySignIn(!displaySignIn);
            }}
            style={{ alignSelf: "center" }}
          >
            {displaySignIn ? "SIGN UP" : "LOGIN"}
          </Button>
        </div>

        {displaySignIn ? <LoginForm /> : <RegForm />}
      </div>
    </HomeContext.Provider>
  );
}

export default withStyles(Styles)(Home);
