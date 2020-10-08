import React, { Fragment, useState, useEffect } from "react";
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

  // let tables = [];

  // for (let i = 1; i <= 30; i++) {
  //   tables.push(
  //     <div
  //       key={i}
  //       style={{
  //         backgroundColor: "red",
  //         display: "inline-block",
  //         visibility: `${i % 10 < 2 && i < 20 ? "hidden" : "visible"}`,
  //         width: "20px",
  //         height: "20px",
  //         marginLeft: `${((i%10)*20)+20}px`,
  //         marginTop: `${i > 9 ? (((i-i*10)/10)*20)+20 : 0}px`,
  //       }}
  //     ></div>
  //   );
  // }

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
      
    </Fragment>
  );
}

export default withStyles(Styles)(BookTable);
