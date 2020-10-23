import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { STextField } from "../Styles";

function MenuItem(props) {
  // const [total, setTotal] = useState(0);

  // useEffect(() => {
  //   console.log(`${props.item.name}`, total);
  // }, [total]);

  return (
    <div key={props.i}>
      <div>
        <Typography
          style={{
            color: "Black",
            fontFamily: "Nunito",
            fontSize: 14,
          }}
        >
          {props.item.name}
        </Typography>
        <img
          alt="Menu item"
          src={`data:image/png;base64, ${props.item.img}`}
          style={{ height: 200, width: 200, objectFit: "cover" }}
        />
        <Typography
          style={{
            color: "Black",
            fontFamily: "Nunito",
            fontSize: 14,
          }}
        >
          {`$${props.item.price.toFixed(2)}`}
        </Typography>
      </div>
      <STextField
        className={props.classes.formRows}
        id="outlined-basic"
        label="Quantity"
        variant="outlined"
        type="number"
        style={{ width: "80px" }}
        inputProps={{
          labelRoot: { classes: { fontFamily: "Nunito-Regular" } },
          min: 0,
        }}
        onChange={(e) =>
          e.target.value !== ""
            ? props.setPrice({
                item_id: props.item._id,
                price: e.target.value * props.item.price,
                quantity: e.target.value,
                name: props.item.name
              })
            : props.setPrice({
                item_id: props.item._id,
                price: 0,
                quantity: e.target.value,
                name: props.item.name
              })
        }
      />
    </div>
  );
}

export default MenuItem;
