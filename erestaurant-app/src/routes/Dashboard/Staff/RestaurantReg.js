import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  withStyles,
} from "@material-ui/core";
import Styles, { STextField } from "../../Styles";

function RestaurantReg(props) {
  const { classes } = props;
  const [formText, setFormText] = useState({
    name: null,
    desc: null,
    category: null,
  });
  const [formImg, setFormImg] = useState();
  const [imgRes, setImgRes] = useState({
    width: 0,
    height: 0,
  });
  const [sections, setSections] = useState([]);
  const [imgClicked, setImgClicked] = useState(false);
  const [ords, setOrds] = useState({
    x: 0,
    y: 0,
  });
  const [tableNo, setTableNo] = useState("");
  const [removeTables, setRemoveTables] = useState([]); // by className
  const [remove, setRemove] = useState(false);
  const [files, setFiles] = useState([]);

  function deleteKeyUp(e) {
    e.preventDefault();
    if (e.key === "Backspace") setRemove(true);
  } //&& removeTables.length > 0

  useEffect(() => {
    window.addEventListener("keyup", deleteKeyUp);

    return () => {
      window.removeEventListener("keyup", deleteKeyUp);
    };
  }, []);

  useEffect(() => {
    console.log(remove);
    if (remove) {
      let updatedSections = [];

      for (let section of sections) {
        for (let table of removeTables) {
          if (parseInt(section.props.className) !== table)
            updatedSections.push(section.className);
        }
      }

      setSections(updatedSections);
      setRemove(false);
    }
  }, [remove]);

  useEffect(() => {
    let img = new Image();
    img.src = formImg;

    img.onload = function () {
      setImgRes({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
  }, [formImg]);

  async function uploadResData() {
    console.log("f", files)
    const formData = new FormData();
    formData.append("name", formText.name);
    formData.append("desc", formText.desc);
    formData.append("category", formText.category);
    formData.append("currentStaff", JSON.stringify([]));
    formData.append("img", files[0]);
    formData.append("sections", JSON.stringify(sections));
    let tableNums = [];
    for (let section of sections) {
      tableNums.push(section.props.className);
    }
    formData.append("tableNums", JSON.stringify(tableNums));

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
        body: formData
      })

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
                multiple
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setFormImg(URL.createObjectURL(e.target.files[0]));
                  setFiles([...files, e.target.files[0]]);
                }}
              />
            </Button>

            <Button className={classes.formRows} onClick={uploadResData}>
              Submit
            </Button>
          </Grid>
        </Paper>
      </Container>

      <Container>
        <Container maxWidth="xs" style={{ marginTop: "10px" }}>
          <Paper elevation={2} square className={classes.middleground}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <STextField
                className={classes.formRows}
                id="outlined-basic"
                label="Table Number"
                variant="outlined"
                onChange={(e) => setTableNo(e.target.value)}
              />
            </Grid>
          </Paper>
        </Container>
      </Container>

      <div>
        <h1>Table</h1>
      </div>

      <div style={{ position: "absolute" }}>
        <img
          style={{ zIndex: "-1", left: "0", top: "0" }}
          src={formImg}
          alt="Layout"
        />
        <div
          style={{
            position: "absolute",
            zIndex: "1",
            width: imgRes.width,
            height: imgRes.height,
            left: "0",
            top: "0",
          }}
          onMouseDown={(e) => {
            if (tableNo !== "") {
              setOrds({
                x: e.clientX,
                y: e.clientY,
              });
              let updatedSections = [...sections];
              updatedSections.push(
                <div
                  style={{
                    left: `${e.clientX}px`,
                    top: `${e.clientY}px`,
                    display: "inline-block",
                    position: "fixed",
                  }}
                ></div>
              );
              setSections(updatedSections);
              setImgClicked(true);
            } else {
              alert(
                "Cannot make a table selection without entering a table number."
              );
            }
          }}
          onMouseMove={(e) => {
            if (imgClicked) {
              let updatedSections = [...sections];

              updatedSections[updatedSections.length - 1] = (
                <div
                  className={tableNo}
                  style={{
                    left: `${e.clientX >= ords.x ? ords.x : e.clientX}px`,
                    top: `${ords.y}px`,
                    width: `${Math.abs(e.clientX - ords.x)}px`,
                    height: `${e.clientY - ords.y}px`,
                    backgroundColor: "rgba(63, 191, 127, 0.48)",
                    border: "2.5px solid rgba(193, 66, 66, 0.5)",
                    display: "inline-block",
                    position: "fixed",
                    zIndex: `${updatedSections.length + 2}`,
                  }}
                  onClick={() => {
                    setRemoveTables([...removeTables, tableNo]);
                  }}
                >
                  <p style={{ textAlign: "center" }}>{tableNo}</p>
                </div>
              );
              setSections(updatedSections);
            }
          }}
          onClick={() => setImgClicked(false)}
        >
          {sections}
        </div>
      </div>
    </div>
  );
}

export default withStyles(Styles)(RestaurantReg);
