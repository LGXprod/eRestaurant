import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Container,
  Button,
  withStyles
} from "@material-ui/core";
import queryString from "querystring";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import Styles, { STextField } from "../Styles";

const cookies = new Cookies();

const LoginForm = (props) => {
  const { classes } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUser, setIsUser] = useState(null);

  useEffect(() => {
    console.log("x", isUser);
  }, [isUser]);

  useEffect(() => {
    if (password === "" & username === "") setIsUser(null);
  }, [username, password])

  // setIsUser(null)

  async function checkLogin(username, password) {
    const response = await fetch("/Login", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: queryString.stringify({
        username: username,
        password: password,
      }),
    });

    response.json().then(res => {
      if (res.auth) {
        const expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + 30);
        console.log(expiryDate)

        cookies.set("Session id", res.session_id, {
          expires: expiryDate
        });
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    }).catch(err => console.log(err));
  }

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
              className={`${classes.formRows} ${classes.text}`}
              variant="h3"
            >
            Welcome Back
            </Typography>

            <STextField
              className={classes.formRows}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              inputProps={{style: {fontFamily: 'Nunito-Regular'}}}
              onChange={(event) => setUsername(event.target.value)}
            />

            <STextField
              className={classes.formRows}
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              inputProps={{style: {fontFamily: 'Nunito-Regular'}}}
              onChange={(event) => setPassword(event.target.value)}
            />

            {isUser === null ? null : isUser ? (
              <Redirect to="/Dashboard" />
            ) : (
              <Typography variant="caption">Incorrect username or password.</Typography>
            )}

            <Button
              className={`${classes.formRows} ${classes.loginButton}`}
              variant="contained"
              onClick={() => checkLogin(username, password)}
            >
              Login
            </Button>
            <Typography
              className={`${classes.formRows} ${classes.bottomText}`}
            >
            Don't have an account?
              <Typography
                className={`${classes.formRows} ${classes.bottomText}`}
                style = {{
                  color: '#54B82A',
                  cursor: 'pointer',
                }}
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
