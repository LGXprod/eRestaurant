import React, { useState, useEffect } from "react";
import {Redirect} from "react-router-dom";
import {
  Paper,
  Typography,
  Grid,
  withStyles,
  TextField,
} from "@material-ui/core";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import Styles, { STextField } from "../DashboardStyles";
import { getUserInfo } from "../../../../common/user";

const UserAccount = (props) => {
  const { classes } = props;
  const [userInfo, setUserInfo] = useState({
    _id: "",
    fName: "",
    sName: "",
    mobileNum: "",
    email: "",
  });
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    getUserInfo(setUserInfo).then((sessionExists) => {
      if (!sessionExists) setLogout(true);
    });
  }, []);

  console.log(userInfo)

  return (
    <div className={classes.root}>
      { logout ? <Redirect to="/"/> : null }
      <Helmet>
        <title>Dineout | Account</title>
      </Helmet>
      <Navbar />
      <Typography className={classes.accountText} variant="h3">
        Your Account
      </Typography>

      <Paper elevation={2} square className={classes.accountCard}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={0}
        >
          <Grid item xs={4}>
            <TextField
              className={classes.accountformRows}
              label="First Name"
              inputProps={{
                className: classes.inputData,
                readOnly: true,
              }}
              rows={() => { console.log("r", userInfo.rows); return userInfo; }}
              InputLabelProps={{ className: classes.label }}
              InputProps={{ disableUnderline: true }}
              value={userInfo.fName}
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
              value={userInfo.sName}
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
              value={userInfo._id}
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
              value={userInfo.mobileNum}
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
              value={userInfo.email}
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
  );
};

export default withStyles(Styles)(UserAccount);
