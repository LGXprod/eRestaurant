import React, { Fragment, useState } from "react";
import { Button, Container, Typography, Paper, Grid, withStyles } from "@material-ui/core";
import queryString from "querystring";
import Styles, { STextField } from "../Styles";

function Menu(props) {
  const { classes } = props;
  const [itemImg, setItemImg] = useState(null);

  function uploadImg(e) {
    setItemImg(e.target.files[0]);
  }

  async function submitNewItem(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("itemImg", itemImg);

    const sendImg = await fetch("/Menu/Item", {
      method: "POST",
      body: queryString.stringify(formData),
    });

    console.log(sendImg);
  }

  return (
    <Fragment>
      <Container maxWidth="xs">
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
              Add Menu Item
            </Typography>
          </Grid>
        </Paper>
      </Container>
      <h1>Work</h1>

      <Button variant="contained" component="label">
        Upload File
        <input
          type="file"
          style={{ display: "none" }}
          onChange={(e) => uploadImg(e)}
        />
      </Button>

      <Button onClick={(e) => submitNewItem(e)}>Submit</Button>
    </Fragment>
  );
}

export default withStyles(Styles)(Menu);
