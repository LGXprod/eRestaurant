import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Paper,
  Typography,
  Container,
  Button,
  withStyles,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Styles, { STextField } from "../../Styles";
import HomeContext from "../HomeContext";

const LoginForm = (props) => {
  const { switchMethod, checkLogin } = useContext(HomeContext);
  const { classes } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUser, setIsUser] = useState(null);

  useEffect(() => {
    if ((password === "") & (username === "")) setIsUser(null);
  }, [username, password]);

  return (
    <React.Fragment>
      <Container maxWidth="xs">
        <Typography className={classes.logo}>
          <img
            style={{ height: 350 }}
            src={require("../../../Assets/dineout.png")}
            alt="Logo"
          />
        </Typography>
        <Paper elevation={2} square className={classes.middleground}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography
              variant="h4" className={`${classes.formRows} ${classes.text}`}
            >
              Welcome Back
            </Typography>

            <STextField
              className={classes.formRows}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              inputProps={{ labelRoot: { classes: { fontFamily: "Nunito-Regular" } }}}
              onChange={(event) => setUsername(event.target.value)}
            />

            <STextField
              className={classes.formRows}
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              inputProps={{ style: { fontFamily: "Nunito-Regular" } }}
              onChange={(event) => setPassword(event.target.value)}
            />

            {isUser === null ? null : isUser ? (
              <Redirect to="/Dashboard" />
            ) : (
              <Typography variant="caption">
                Incorrect username or password.
              </Typography>
            )}

            <Button
              className={`${classes.formRows} ${classes.loginButton}`}
              variant="contained"
              onClick={() => checkLogin(username, password, setIsUser)}
            >
              Login
            </Button>
            <Typography className={`${classes.formRows} ${classes.bottomText}`}>
              Don't have an account?
              <Typography
                className={`${classes.formRows} ${classes.bottomText}`}
                style={{
                  color: "#54B82A",
                  cursor: "pointer",
                }}
                onClick={switchMethod}
              >
                Sign up here
              </Typography>
            </Typography>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default withStyles(Styles)(LoginForm);
