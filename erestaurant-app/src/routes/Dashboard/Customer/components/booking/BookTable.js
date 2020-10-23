import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  Grid,
  Paper,
  withStyles,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Styles from "../../DashboardStyles";
import queryString from "querystring";

function BookTable(props) {
  const { classes } = props;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [layout, setLayout] = useState();
  const [tables, setTables] = useState([]);

  async function makeBooking() {
    const res = await fetch("/Booking", {
      method: "POST",
      body: queryString.stringify({
        
      })
    });

    
  }

  useEffect(() => {
    async function getTables(restaurantID) {
      const res = await fetch(`/Table?restaurantID=${restaurantID}`, {
        method: "GET",
      });

      res.json().then((tables) => {
        console.log("tables", tables);
        setTables(tables);
      });
    }

    async function getLayout() {
      const res = await fetch(`/Restaurant?name=${props.restaurantName}`, {
        method: "GET",
      });

      res.json().then((restaurant) => {
        console.log("x", restaurant);
        getTables(restaurant[0]._id);
        setLayout(`data:image/png;base64, ${restaurant[0].layout}`);
      });
    }

    getLayout();
  }, []);

  return (
    <div>
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

      {layout !== null ? <img id="layout" alt="Layout" src={layout} /> : null}

      <FormGroup>
        {tables !== null
          ? tables.map(function (table, index) {
              return (
                <FormControlLabel
                  key={index}
                  control={<Checkbox name={table.tableNumber} />}
                  label={`Table: ${table.tableNumber} (Number of Seats: ${
                    table.capacity
                  } | ${table.isOutside ? "Outside" : "Inside"})`}
                />
              );
            })
          : null}
      </FormGroup>

      <Button className={classes.formRows} onClick={}>
        Submit
      </Button>
    </div>
  );
}

export default withStyles(Styles)(BookTable);
