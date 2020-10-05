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
<<<<<<< HEAD
  const switchMethod = useContext(HomeContext);
=======
  const { switchMethod, checkLogin } = useContext(HomeContext);
>>>>>>> F/feature/dashboard
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
        <Typography component={'div'} className={classes.logo}>
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
<<<<<<< HEAD
            <Typography component={'div'}
              className={`${classes.formRows} ${classes.text}`}
              variant="h3"
=======
            <Typography
              variant="h4"
              inputProps={{
                classes: {
                  input: `${classes.formRows} ${classes.text}`,
                },
              }}
>>>>>>> F/feature/dashboard
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
              <Typography component={'div'} variant="caption">
                Incorrect username or password.
              </Typography>
            )}

            <Button data-testid = "buttonTest" 
              className={`${classes.formRows} ${classes.loginButton}`}
              variant="contained"
              onClick={() => setIsUser(checkLogin(username, password))}
            >
              Login
            </Button>
            <Typography component={'div'} className={`${classes.formRows} ${classes.bottomText}`}>
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
