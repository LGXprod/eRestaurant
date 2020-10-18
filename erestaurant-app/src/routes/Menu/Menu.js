import React, { Fragment, useState, useEffect } from "react";
import {
  Typography,
  Paper,
  withStyles
} from "@material-ui/core";
import Styles from "../Styles";

function Menu(props) {
  const { classes } = props;
  let [items, setItems] = useState([]);

  useEffect(() => {
    async function getMenu(category) {
      const res = await fetch(`/Menu?${category}`);

      res
        .json()
        .then(async (menus) => {
          let i = 1;
          for (let menu of menus) {
            setItems(items.push(<Typography style={{ color: "Black",
            fontFamily: "Nunito-Bold",
            fontSize: 20, }}>{menu._id}</Typography>));
            for (let item of menu.items) {
              let menuItems = items;
              menuItems.push(
                <div key={i}>
                <Typography style={{ color: "Black",
                fontFamily: "Nunito",
                fontSize: 14, }}
                >{item.name}</Typography>
                  <img
                    alt="Menu item"
                    src={`data:image/png;base64, ${item.img}`}
                    style={{ height: 200, width: 200, objectFit: 'cover' }}
                  />
                </div>
              );
              setItems([...menuItems]);
              console.log(items);
              i++;

              // leave this in its just to show they each image is loaded in
              // one by one
              // await new Promise(resolve => setTimeout(() => {
              //   console.log("work");
              //   resolve();
              // }, 1000));
            }
          }
        })
        .catch((err) => console.log(err));
    }

    getMenu();
  }, []);

  return (
    <Fragment>
      <div className = {classes.menuBox}>{items}</div>
    </Fragment>
  );
}

export default withStyles(Styles)(Menu);
