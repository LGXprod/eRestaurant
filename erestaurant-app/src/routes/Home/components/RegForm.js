import React, { useContext, useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Container,
  Button,
  withStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Styles, { STextField } from "../Styles";
import InputMask from "react-input-mask";
import HomeContext from "../HomeContext";
import queryString from "querystring";
import { Redirect } from "react-router-dom";

function RegForm(props) {
  const { switchMethod, checkLogin } = useContext(HomeContext);
  const { classes } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [formCompleted, setFormCompleted] = useState(null);
  const [registerStaff, setRegisterStaff] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const customer = {
    username: null,
    password: null,
    fName: null,
    sName: null,
    email: null,
    mobileNum: null,
    role: "customer",
  };

  const staff = {
    username: null,
    password: null,
    fName: null,
    sName: null,
    email: null,
    mobileNum: null,
    role: null,
  };

  const [formData, setFormData] = useState(customer);

  useEffect(() => {
    if (registerStaff) {
      setFormData(staff);
    } else {
      setFormData(customer);
    }
  }, [registerStaff]);

  function updateFormData(value, prop) {
    let updatedFormData = formData;

    if (value !== "") {
      updatedFormData[prop] = value;
    } else {
      updatedFormData[prop] = null;
    }

    setFormData(updatedFormData);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function registerUser() {
    let completed = true;

    for (let prop in formData) {
      if (formData[prop] == null) {
        completed = false;
        break;
      }
    }

    setFormCompleted(completed);

    const res = await fetch("/Registration", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: queryString.stringify(formData),
    });

    if (res.status === 200) {
      setIsUser(checkLogin(formData.username, formData.password));
    }
  }

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
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={0}
        >
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
              onChange={(e) => updateFormData(e.target.value, "username")}
            />
          </Grid>

          <Grid item xs={6}>
            <STextField
              variant="outlined"
              label="Password"
              type="password"
              className={classes.signformRows}
              onChange={(e) => updateFormData(e.target.value, "password")}
            />
          </Grid>

          <Grid item xs={6}>
            <STextField
              variant="outlined"
              label="First name"
              className={classes.signformRows}
              onChange={(e) => updateFormData(e.target.value, "fName")}
            />
          </Grid>

          <Grid item xs={6}>
            <STextField
              variant="outlined"
              label="Last name"
              className={classes.signformRows}
              onChange={(e) => updateFormData(e.target.value, "sName")}
            />
          </Grid>

          <Grid item xs={6}>
            <STextField
              variant="outlined"
              label="Email"
              className={classes.signformRows}
              onChange={(e) => updateFormData(e.target.value, "email")}
            />
          </Grid>

          <Grid item xs={6}>
            <InputMask
              mask="+61 499 999 999"
              onChange={(e) => updateFormData(e.target.value, "mobileNum")}
            >
              {() => (
                <STextField
                  variant="outlined"
                  label="Phone number"
                  className={classes.signformRows}
                />
              )}
            </InputMask>
          </Grid>

          {registerStaff ? (
            <React.Fragment>
              <Grid item xs={6}>
                <InputMask
                  mask="99999999"
                  onChange={(e) => updateFormData(e.target.value, "mobileNum")}
                >
                  {() => (
                    <STextField
                      variant="outlined"
                      label="TFN"
                      className={classes.signformRows}
                    />
                  )}
                </InputMask>
              </Grid>

              <Grid item xs={6}>
                <STextField
                  variant="outlined"
                  label="Account Name"
                  className={classes.signformRows}
                  onChange={(e) => updateFormData(e.target.value, "email")}
                />
              </Grid>

              <Grid item xs={6}>
                <InputMask
                  mask="999999999999"
                  onChange={(e) => updateFormData(e.target.value, "mobileNum")}
                >
                  {() => (
                    <STextField
                      variant="outlined"
                      label="Account Number"
                      className={classes.signformRows}
                    />
                  )}
                </InputMask>
              </Grid>

              <Grid item xs={6}>
                <InputMask
                  mask="999999"
                  onChange={(e) => updateFormData(e.target.value, "mobileNum")}
                >
                  {() => (
                    <STextField
                      variant="outlined"
                      label="BSB"
                      className={classes.signformRows}
                    />
                  )}
                </InputMask>
              </Grid>

              <Button
                className={`${classes.signformRows} ${classes.signupButton}`}
                variant="contained"
                onClick={handleClick}
              >
                {formData.role == null ? "Select Role" : formData.role}
              </Button>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    updateFormData("Management", "role");
                  }}
                >
                  Management
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    updateFormData("Customer Service", "role");
                  }}
                >
                  Customer Service
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    updateFormData("Chef", "role");
                  }}
                >
                  Chef
                </MenuItem>
              </Menu>
            </React.Fragment>
          ) : null}

          <Grid item xs={12}>
            <Button
              className={`${classes.signformRows} ${classes.signupButton}`}
              variant="contained"
              onClick={registerUser}
            >
              Sign Up
            </Button>
          </Grid>

          {formCompleted == null || formCompleted ? null : (
            <Grid item xs={6}>
              <Typography variant="caption">
                Form has not been correctly filled out.
              </Typography>
            </Grid>
          )}

          <Typography className={`${classes.formRows} ${classes.bottomText}`}>
            Already use Dineout?
            <Typography
              className={`${classes.formRows} ${classes.bottomText}`}
              style={{
                color: "#54B82A",
                cursor: "pointer",
              }}
              onClick={switchMethod}
            >
              Log in
            </Typography>
          </Typography>

          <Typography className={`${classes.formRows} ${classes.bottomText}`}>
            Registering as a {!registerStaff ? "staff member" : "customer "}?
            <Typography
              className={`${classes.formRows} ${classes.bottomText}`}
              style={{
                color: "#54B82A",
                cursor: "pointer",
              }}
              onClick={() => setRegisterStaff(!registerStaff)}
            >
              {!registerStaff ? "Staff" : "Customer"} Registration
            </Typography>
          </Typography>
        </Grid>
      </Paper>

      {isUser ? <Redirect to="/Dashboard" /> : null}
    </Container>
  );
}

export default withStyles(Styles)(RegForm);
