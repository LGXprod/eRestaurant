import React, { Fragment, useState, useEffect, useRef } from "react";
import { Grid, Paper, withStyles } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Styles from "../../DashboardStyles";
import useDimensions from "react-cool-dimensions";

function BookTable(props) {
  const { classes } = props;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [layout, setLayout] = useState();
  const [sections, setSections] = useState();
  const [tablesSelected, setTablesSelected] = useState([]);
  const layoutRef = useRef();

  useEffect(() => {
    async function getLayout() {
      const res = await fetch(`/Restaurant?name=${props.restaurantName}`, {
        method: "GET",
      });

      res.json().then((restaurant) => {
        let sections = [];
        const img = new Image();
        img.src = `data:image/png;base64, ${restaurant[0].layout}`;

        img.onload = () => {
          console.log(img.naturalHeight);
          for (let section of JSON.parse(restaurant[0].sections)) {
            const style = section.props.style;
            if (style !== null) {
              sections.push({
                tableNo: section.props.className,
                x1: parseInt(style.left.substring(0, style.left.length - 2)),
                x2:
                  parseInt(style.left.substring(0, style.left.length - 2)) +
                  parseInt(style.width.substring(0, style.width.length - 2)),
                y1:
                  img.naturalHeight -
                  parseInt(style.top.substring(0, style.top.length - 2)),
                y2:
                  img.naturalHeight -
                  parseInt(style.top.substring(0, style.top.length - 2)) +
                  parseInt(style.height.substring(0, style.height.length - 2)),
              });
            }
          }
          console.log("new", sections);
          setSections(sections);

          setLayout(`data:image/png;base64, ${restaurant[0].layout}`);
        };
      });
    }

    getLayout();
  }, []);

  useEffect(() => {
    console.log(layoutRef)
  }, [layoutRef]);

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

      {layout !== null ? (
        <img
          id="layout"
          alt="Layout"
          src={layout}
          ref={layoutRef}
          onClick={(e) => {
            for (let section of sections) {
              console.log("s", sections);
              console.log([e.clientX, e.clientY]);
              if (e.clientX >= section.x1 && e.clientX <= section.x2) {
                console.log("x!");
                if (e.clientY <= section.y1 && e.clientY >= section.y2) {
                  setTablesSelected([...tablesSelected, section.tableNo]);
                }
              }
            }
          }}
        />
      ) : null}
    </div>
  );
}

export default withStyles(Styles)(BookTable);
