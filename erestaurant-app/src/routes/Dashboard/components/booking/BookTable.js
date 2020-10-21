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

  let tables = [];
  let i = 0;

  for (let y = 0; y < 600; y+=40) {
    for (let x = 0; x < 600; x+=40) {
      tables.push(
        <div
          key={i}
          style={{
            width: "40px",
            height: "40px",
            left: `${x}px`,
            top: `${y}px`,
            backgroundColor: "red",
            display: "inline-block",
            position: "absolute",
          }}
        ></div>
      );
      i++;
    }
  }

  return (
    <Fragment>
      <h1 className={classes.text}>{props.restaurantName}</h1>

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

<<<<<<< HEAD
      {/* <div className={classes.table_layout}>{tables}</div> */}
      <div>
        <canvas ref={canvasRef} width={600} height={600} />
      </div>
=======
      <div className={classes.table_layout}>{tables}</div>

>>>>>>> ecf4be2fe4d3742c8e17574070e50eefdc359e10
    </Fragment>
  );
}

export default withStyles(Styles)(BookTable);
