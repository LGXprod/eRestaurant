import React, { Fragment, useState, useRef, useEffect } from "react";
import { Grid, Paper, withStyles } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Styles from "../../DashboardStyles";

function BookTable(props) {
  const { classes } = props;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = require("./table-layout.png");

    img.onload = () => {
      ctx.drawImage(img, 0, 0, 600, 600);

      const imgData = ctx.getImageData(0, 0, 600, 600).data;
      // console.log(imgData);

      let pixels = [];

      for (let x = 0; x < 600; x++) {
        pixels.push([]);
        for (let y = 0; y < 600; y++) {
          pixels[x].push({
            red: imgData[y * 600 * 4 + x * 4],
            green: imgData[y * 600 * 4 + x * 4 + 1],
            blue: imgData[y * 600 * 4 + x * 4 + 2],
            alpha: imgData[y * 600 * 4 + x * 4 + 3],
          });
        }
      }

      let tables = [];

      function isGreen(pixel) {
        return pixel.red === 2 && pixel.green === 187 && pixel.blue === 0
          ? true
          : false;
      }

      let partialTables = [];

      for (let x = 0; x < 600; x += 15) {
        for (let y = 0; y < 600; y += 15) {
          if (isGreen(pixels[x][y])) {
            let isNew = true;

            for (let partialTable of partialTables) {
              if (partialTable.yPos2 === y - 15) {
                partialTables.yPos2 = y;
                isNew = false;
              } 
              
              if (partialTable.xPos2 === x - 15) {
                partialTable.xPos2 = x;
                isNew = false;
              }
            } 

            if (isNew) {
              partialTables.push({
                xPos1: x,
                yPos1: y,
                xPos2: x,
                yPos2: y,
              });
            }
          } 
        }
      }

      console.log("x", partialTables);

      // for (let x = 0; x < 20; x += 30) {
      //   let isGreen = false;
      //   let table;

      //   for (let y = 0; y < 20; y += 30) {
      //     if (!isGreen) {
      //       if (isGreen(pixels[x][y])) {
      //         isGreen = true;

      //         table = {
      //           xStart: x,
      //           yStart: y,
      //           xEnd: x,
      //           yEnd: y,
      //         }
      //       }
      //     } else {
      //       if (isGreen(pixels[x][y])) {
      //         table.yEnd += 30;
      //       } else {

      //       }
      //     }
      //   }
      // }

      //   if (isGreen(pixels[x][y])) {
      //     let width = 30;
      //     while (isGreen(pixels[x+width][y])) width += 30;

      //     let height = 30;
      //     while (isGreen(pixels[x][y+height])) height += 30;

      //     tables.push({

      //     })
      //    }

      console.log(tables);
    };
  }, []);

  return (
    <Fragment>
      <h1>{props.restaurantName}</h1>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <KeyboardTimePicker
          variant="inline"
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={(time) => {
            let updatedDate = new Date();
            updatedDate.setFullYear(selectedDate.getFullYear());
            updatedDate.setMonth(selectedDate.getMonth());
            updatedDate.setDate(selectedDate.getDate());
            updatedDate.setHours(time.getHours());
            updatedDate.setMinutes(time.getMinutes());
            setSelectedDate(updatedDate);
          }}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
        />
      </MuiPickersUtilsProvider>

      {/* <div className={classes.table_layout}>{tables}</div> */}
      <div>
        <canvas ref={canvasRef} width={600} height={600} />
      </div>
    </Fragment>
  );
}

export default withStyles(Styles)(BookTable);
