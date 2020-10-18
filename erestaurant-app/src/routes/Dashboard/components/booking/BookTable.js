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
    </Fragment>
  );
}

export default withStyles(Styles)(BookTable);
