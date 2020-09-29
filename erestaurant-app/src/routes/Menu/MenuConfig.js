import React, { Fragment, useState } from "react";
import {
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  withStyles,
} from "@material-ui/core";
import Styles, { STextField } from "../Styles";

function Menu(props) {
  const { classes } = props;
  const [itemImg, setItemImg] = useState(null);
  const [formText, setFormText] = useState({
    name: null,
    price: null,
    desc: null,
    category: null,
  });
  const [imgSent, setImgSent] = useState(null);

  function uploadImg(e) {
    setItemImg(e.target.files[0]);
  }

  async function submitNewItem(e) {
    e.preventDefault();
    setImgSent(false);

    const formData = new FormData();
    formData.append("img", itemImg);
    formData.append("name", formText.name);
    formData.append("price", parseFloat(formText.price));
    formData.append("desc", formText.desc);
    formData.append("category", formText.category);

    const sendImg = await fetch("/Menu/Item", {
      method: "POST",
      body: formData,
    });

    if (sendImg.status === 200) {
      setImgSent(true);
    } else {
      setImgSent(null);
      alert(
        "This new item was not saved successfully. Please try again or contact an adminstrator."
      );
    }
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
              className={classes.formRows}
              variant="h4"
              inputProps={{
                classes: {
                  input: classes.text,
                },
              }}
            >
              Add Menu Item
            </Typography>

            <STextField
              className={classes.formRows}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              onChange={(e) => {
                const updatedFormText = formText;
                updatedFormText.name = e.target.value;
                setFormText(updatedFormText);
              }}
            />

            <STextField
              className={classes.formRows}
              id="outlined-basic"
              label="Price"
              variant="outlined"
              onChange={(e) => {
                const updatedFormText = formText;
                updatedFormText.price = e.target.value;
                setFormText(updatedFormText);
              }}
            />

            <STextField
              className={classes.formRows}
              id="outlined-basic"
              label="Description"
              variant="outlined"
              multiline
              rows={5}
              onChange={(e) => {
                const updatedFormText = formText;
                updatedFormText.desc = e.target.value;
                setFormText(updatedFormText);
              }}
            />

            <STextField
              className={classes.formRows}
              id="outlined-basic"
              label="Category"
              variant="outlined"
              onChange={(e) => {
                const updatedFormText = formText;
                updatedFormText.category = e.target.value;
                setFormText(updatedFormText);
              }}
            />

            <Button
              variant="contained"
              component="label"
              className={classes.formRows}
            >
              Upload File
              <input
                type="file"
                style={{ display: "none" }}
                onChange={(e) => uploadImg(e)}
              />
            </Button>

            <Button
              onClick={(e) => submitNewItem(e)}
              className={classes.formRows}
            >
              Submit
            </Button>

            {imgSent == null ? null : imgSent ? <p>Sent</p> : <p>Sending</p>}
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default withStyles(Styles)(Menu);
