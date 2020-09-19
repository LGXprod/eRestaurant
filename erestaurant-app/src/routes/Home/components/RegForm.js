import React, { useContext } from "react";
import {
  Grid,
  Paper,
  Typography,
  Container,
  Button,
  withStyles,
} from "@material-ui/core";
import Styles, { STextField } from "../Styles";
import InputMask from "react-input-mask";
import HomeContext from "../HomeContext";

function RegForm(props) {
  const { switchMethod } = useContext(HomeContext);
  const { classes } = props;

  return (
    <Container maxWidth="xs">
      <Typography className={classes.logo}>
        <img
          style={{ height: 350 }}
          src={require("../../../Assets/dineout.png")}
          alt="Logo"
        />
      </Typography>
      <Paper elevation={2} square className={classes.middleground}>
        <Grid container
              direction="row"
              justify="center"
              alignItems="center" spacing={0}>

          <Grid item xs={12}>
            <Typography
              variant="h3"
              className={`${classes.formRows} ${classes.text}`}
            >
              Create your Dineout account
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <STextField
              variant="outlined"
              label="Username"
              width="400px"
              className={classes.signformRows}
            />
          </Grid>

          <Grid item xs={6}>
            <STextField
              variant="outlined"
              label="Password"
              type="password"
              className={classes.signformRows}
            />
          </Grid>

          <Grid item xs={6}>
          <STextField
            variant="outlined"
            label="First name"
            className={classes.signformRows}
          />
          </Grid>

          <Grid item xs={6}>
          <STextField
            variant="outlined"
            label="Last name"
            className={classes.signformRows}
          />
          </Grid>

          <Grid item xs={6}>
          <STextField
            variant="outlined"
            label="Email"
            className={classes.signformRows}
          />
          </Grid>

          <Grid item xs={6}>
          <InputMask mask="+61 499 999 999">
            {() => (
              <STextField
                variant="outlined"
                label="Phone number"
                className={classes.signformRows}
              />
            )}
          </InputMask>
          </Grid>

          <Grid item xs={12}>
          <Button
            className={`${classes.signformRows} ${classes.signupButton}`}
            variant="contained"
          >
            Sign Up
          </Button>
          </Grid>

          <Typography className={`${classes.formRows} ${classes.bottomText}`}>
            Already use Dineout?
            <Typography
              className={`${classes.formRows} ${classes.bottomText}`}
              style={{
                color: "#54B82A",
                cursor: "pointer",
              }}
              onClick={switchMethod}
            >Log in
            </Typography>
          </Typography>
        </Grid>
      </Paper>
    </Container>
  );
}

export default withStyles(Styles)(RegForm);
