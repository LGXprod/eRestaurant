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
import SectionTable from "./SectionTable";

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
  const [sections, setSections] = useState();
  const [divSections, setDivSections] = useState();
  const [selectedSections, setSelectedSections] = useState({});

  // useEffect(() => {
  //   console.log("pls", selectedSections);
  // }, [selectedSections]);

  useEffect(() => {
    console.log("img", formImg);
    let img = new Image();
    img.src = formImg;

    img.onload = function () {
      setImgRes({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
  }, [formImg]);

  useEffect(() => {
    let sections = [];
    let i = 0;

    for (let y = 0; y < imgRes.height; y += 15) {
      for (let x = 0; x < imgRes.width; x += 15) {
        sections.push({ key: i, x, y });
        i++;
      }
    }

    setSections(sections);
  }, [imgRes]);

  function onSectionClick(
    i,
    selectedSections,
    setSelectedSections,
    sectionsRef
  ) {
    console.log(i);
    let updatedSections = selectedSections;
    updatedSections[i.toString()] = true;
    setSelectedSections();
    sectionsRef.current.style.backgroundColor = "rgba(193, 66, 66, 0.5)";
    console.log(sectionsRef);
  }

  useEffect(() => {
    if (sections != null) {
      let divSections = sections.map(function (item) {
        return (
          <SectionTable
            item={item}
            onSectionClick={onSectionClick}
            selectedSections={selectedSections}
            setSelectedSections={setSelectedSections}
          />
        );
      });

      setDivSections(divSections);
    }
  }, [sections]);

  async function uploadResData() {}

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
              Upload File
              <input
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  // setFormImg(URL.createObjectURL(e.target.files[0]));
                  setFormImg(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </Button>

            <Button className={classes.formRows} onClick={uploadResData}>
              Submit
            </Button>
          </Grid>
        </Paper>
      </Container>

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
        >
          {divSections}
        </div>
      </div>
    </Fragment>
  );
}

export default withStyles(Styles)(RestaurantReg);
