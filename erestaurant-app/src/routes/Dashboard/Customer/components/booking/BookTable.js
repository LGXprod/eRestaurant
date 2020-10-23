import React, { Fragment, useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
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
import Cookie from "universal-cookie";
import Menu from "../../../../Menu/Menu";

function BookTable(props) {
  const { classes } = props;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [layout, setLayout] = useState();
  const [tables, setTables] = useState([]);
  const [selectedTables, setSelectedTables] = useState();
  const [showMenu, setShowMenu] = useState(false);

  async function makeBooking() {
    const cookie = new Cookie();

    let tables = [];

    for (let x in selectedTables) if (selectedTables[x]) tables.push(x);

    const res = await fetch("/Booking", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: queryString.stringify({
        session_id: cookie.get("Session id"),
        date: selectedDate.toString(),
        selectedTables: tables,
      }),
    });

    if (res.status === 200) setShowMenu(true);
  }

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    async function getTables(restaurantID) {
      const res = await fetch(`/Table?restaurantID=${restaurantID}`, {
        method: "GET",
      });

      res.json().then((tables) => {
        console.log("tables", tables);
        let selectedTables = {};
        for (let table of tables) selectedTables[table._id] = false;
        setSelectedTables(selectedTables);
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
      {showMenu ? (
        <Menu />
      ) : (
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
              disablePast
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
              disablePast
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

          {layout !== null ? (
            <img id="layout" alt="Layout" src={layout} />
          ) : null}

          <FormGroup>
            {tables !== null
              ? tables.map(function (table, index) {
                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          name={table.tableNumber}
                          onChange={(e) => {
                            // let updatedSelectedTables = { ...selectedTables };
                            // updatedSelectedTables[table.id] = !selectedTables[table.id];
                            console.log(e.target.checked);
                            setSelectedTables({
                              ...selectedTables,
                              [table._id]: e.target.checked,
                            });
                          }}
                        />
                      }
                      label={`Table: ${table.tableNumber} (Number of Seats: ${
                        table.capacity
                      } | ${table.isOutside ? "Outside" : "Inside"})`}
                    />
                  );
                })
              : null}
          </FormGroup>

          <Button className={classes.formRows} onClick={makeBooking}>
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}

export default withStyles(Styles)(BookTable);
