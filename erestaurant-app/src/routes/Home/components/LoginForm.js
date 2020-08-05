import React from "react";
import { Grid, Paper, Typography, Container, TextField, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  control: {
    margin: theme.spacing(2)
  }
}));

const LoginForm = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Paper elevation={3}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography className={classes.control} variant="h3">eRestaurant Login</Typography>
            <TextField className={classes.control} id="outlined-basic" label="Username" variant="outlined" />
            <TextField className={classes.control} id="outlined-basic" label="Password" variant="outlined" />
            <Button className={classes.control} variant="contained">Submit</Button>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default LoginForm;