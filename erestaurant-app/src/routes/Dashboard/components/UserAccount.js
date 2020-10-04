import React from 'react';
import {
  Paper,
  Typography,
  Grid,
  withStyles,
  TextField,
} from "@material-ui/core";
import Navbar from './Navbar';
import { Helmet } from "react-helmet";
import Styles, { STextField } from "../../Home/Styles";

const UserAccount = (props) =>{
  const { classes } = props;

  return (
    <div className={classes.root}>
    <Helmet>
      <title>Dineout | Account</title>
    </Helmet>
      <Navbar />
        <Typography
          className={classes.accountText}
          variant="h3"
        >
          Your Account
        </Typography>

        <Paper elevation={2} square className={classes.accountCard}>
        <Grid
              container
              direction="row"
              justify="center"
              alignItems="center" spacing={0}
        >
        <Grid item xs={4}>
        <TextField
        className={classes.accountformRows}
        label="First Name"
        inputProps={{
          className: classes.inputData,
          readOnly: true,
        }}
        InputLabelProps={{ className: classes.label }}
        InputProps={{ disableUnderline: true }}
        defaultValue="John"
      />
        </Grid>
        <Grid item xs={4}>
        <TextField
          className={classes.accountformRows}
          label="Last Name"
          inputProps={{
            className: classes.inputData,
            readOnly: true,
          }}
          InputLabelProps={{ className: classes.label }}
          InputProps={{ disableUnderline: true }}
          defaultValue="Smith"
        />
        </Grid>
        <Grid item xs={4}>
        <TextField
          className={classes.accountformRows}
          label="Username"
          inputProps={{
            className: classes.inputData,
            readOnly: true,
          }}
          InputLabelProps={{ className: classes.label }}
          InputProps={{ disableUnderline: true }}
          defaultValue="smithy123"
        />
        </Grid>
        <Grid item xs={4}>
        <TextField
          className={classes.accountformRows}
          label="Phone Number"
          inputProps={{
            className: classes.inputData,
            readOnly: true,
          }}
          InputLabelProps={{ className: classes.label }}
          InputProps={{ disableUnderline: true }}
          defaultValue="0415 543 345"
        />
        </Grid>
        <Grid item xs={4}>
        <TextField
          className={classes.accountformRows}
          label="Email"
          inputProps={{
            className: classes.inputData,
            readOnly: true,
          }}
          InputLabelProps={{ className: classes.label }}
          InputProps={{ disableUnderline: true }}
          defaultValue="smithy123@gmail.com"
        />
        </Grid>
        <Grid item xs={4}>
      {/*Put nothing in this just to make the grids lineup nicely*/}
        <TextField
          className={classes.accountformRows}
          label=""
          inputProps={{
            className: classes.inputData,
            readOnly: true,
          }}
          InputLabelProps={{ className: classes.label }}
          InputProps={{ disableUnderline: true }}
          defaultValue=""
        />
        </Grid>
        </Grid>
        </Paper>
    </div>
  )
}

export default withStyles(Styles)(UserAccount);
