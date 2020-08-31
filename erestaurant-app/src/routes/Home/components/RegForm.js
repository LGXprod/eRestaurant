import React from "react";
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

function RegForm(props) {
  const { classes } = props;

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} className={classes.middleground}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography
            variant="h3"
            className={`${classes.formRows} ${classes.text}`}
          >
            Registration
          </Typography>

          <STextField
            variant="outlined"
            label="Username"
            className={classes.formRows}
          />

          <STextField
            variant="outlined"
            label="Password"
            type="password"
            className={classes.formRows}
          />

          <STextField
            variant="outlined"
            label="First name"
            className={classes.formRows}
          />

          <STextField
            variant="outlined"
            label="Last name"
            className={classes.formRows}
          />

          <STextField
            variant="outlined"
            label="Email"
            className={classes.formRows}
          />

          <InputMask mask="+61 499 999 999">
            {() => (
              <STextField
                variant="outlined"
                label="Phone number"
                className={classes.formRows}
              />
            )}
          </InputMask>

          <Button
            className={`${classes.formRows} ${classes.button}`}
            variant="contained"
          >
            Submit
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
}

export default withStyles(Styles)(RegForm);
