import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  withStyles,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import Styles, { STextField } from "../../Styles";

function RestaurantReg(props) {
  const { classes } = props;
  const [formText, setFormText] = useState({
    name: null,
    desc: null,
    category: null,
    tables: [],
  });
  const [files, setFiles] = useState([]);
  const [table, setTable] = useState({
    number: null,
    numSeats: null,
    located: "inside",
    isOutside: false,
  });

  async function uploadResData() {
    console.log("f", files);
    const formData = new FormData();
    formData.append("name", formText.name);
    formData.append("desc", formText.desc);
    formData.append("category", formText.category);
    formData.append("currentStaff", JSON.stringify([]));
    formData.append("img", files[0]);
    console.log("tables", formText.tables);
    formData.append("tables", formText.tables);

    const res = await fetch("/Restaurant", {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      const formData = new FormData();
      formData.append("name", formText.name);
      formData.append("img", files[1]);
      const res = await fetch("/Restaurant/Layout", {
        method: "POST",
        body: formData,
      });

      if (res.status === 200) {
        alert("Restaurant Successfully");
      }
    }
  }

  return (
    <div>
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
              Add New Restaurant
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
              Upload Thumbnail
              <input
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setFiles([...files, e.target.files[0]]);
                }}
              />
            </Button>

            <Button
              variant="contained"
              component="label"
              className={classes.formRows}
            >
              Upload Layout
              <input
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setFiles([...files, e.target.files[0]]);
                }}
              />
            </Button>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <STextField
                className={classes.formRows}
                id="outlined-basic"
                label="Table Num"
                variant="outlined"
                onChange={(e) => setTable({ ...table, number: e.target.value })}
                style={{ width: "25%" }}
              />

              <STextField
                className={classes.formRows}
                id="outlined-basic"
                label="Num Seats"
                variant="outlined"
                onChange={(e) =>
                  setTable({ ...table, numSeats: e.target.value })
                }
                style={{ width: "25%" }}
              />

              <RadioGroup
                value={table.outside}
                onChange={(e) => {
                  setTable({
                    ...table,
                    located: e.target.value,
                    isOutside: e.target.value ? false : true,
                  });
                }}
              >
                <FormControlLabel
                  value="inside"
                  control={<Radio />}
                  label="Inside"
                />
                <FormControlLabel
                  value="outside"
                  control={<Radio />}
                  label="Outside"
                />
              </RadioGroup>

              <Button
                style={{ width: "10%" }}
                onClick={() => {
                  if (table.number !== null && table.numSeats !== null) {
                    let tables = [...formText.tables];
                    tables.push(table);
                    setFormText({ ...formText, tables });
                    setTable({
                      number: null,
                      numSeats: null,
                    });
                  } else {
                    alert(
                      "Please enter both a table number and the number of seats that table has."
                    );
                  }
                }}
              >
                Add
              </Button>
            </Grid>

            <Button className={classes.formRows} onClick={uploadResData}>
              Submit
            </Button>
          </Grid>
        </Paper>

        <Paper
          elevation={2}
          square
          className={classes.middleground}
          style={{ marginTop: "10px" }}
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            {formText.tables.map(function (value, index) {
              return (
                <p key={index}>
                  Table Number: {value.number} | Number of Seats:{" "}
                  {value.numSeats}
                </p>
              );
            })}
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default withStyles(Styles)(RestaurantReg);
