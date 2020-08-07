import React from "react";
import { Grid, Paper, Typography, Container, TextField, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formRows: {
    margin: theme.spacing(1),
    textAlign: "center"
  },
  formHeading: {
    color: "#364f6b"
  }
}));

const LoginForm = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container maxWidth="xs">
        <Paper elevation={3}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography className={`${classes.formRows} ${classes.formHeading}`} variant="h3">eRestaurant Login</Typography>
            <TextField className={classes.formRows} id="outlined-basic" label="Username" variant="outlined" />
            <TextField className={classes.formRows} id="outlined-basic" label="Password" variant="outlined" />
            <Button className={classes.formRows} variant="contained">Submit</Button>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default LoginForm;