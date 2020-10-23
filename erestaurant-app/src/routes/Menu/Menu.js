import React, { Fragment, useState, useEffect } from "react";
import { Typography, Paper, withStyles, Button } from "@material-ui/core";
import Styles, { STextField } from "../Styles";
import MenuItem from "./MenuItem";
import queryString from "querystring";
import Cookie from "universal-cookie";
import Invoice from "./Invoice";

function Menu(props) {
  const { classes } = props;
  let [items, setItems] = useState([]);
  let [price, setPrice] = useState();
  let [prices, setPrices] = useState({});
  let [totalPrice, setTotalPrice] = useState(0);
  let [showInvoice, setShowInvoice] = useState(false);

  async function makeOrder() {
    const cookie = new Cookie();
    let order = prices;

    delete order["item_id"];
    console.log("order", order);

    const res = await fetch("/Booking/MenuItems", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: queryString.stringify({
        session_id: cookie.get("Session id"),
        order: JSON.stringify(order),
      }),
    });

    if (res.status === 200) setShowInvoice(true);
  }

  useEffect(() => {
    console.log("what", price);
    try {
      // setPrices({ ...prices, [price.item_id]: price.price });
      setPrices({
        ...prices,
        [price.item_id]: {
          price: price.price,
          quantity: price.quantity,
          name: price.name,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }, [price]);

  useEffect(() => {
    let total = 0;

    for (let x in prices) if (x !== "item_id") total += prices[x].price;

    setTotalPrice(total);
  }, [prices]);

  useEffect(() => {
    async function getMenu(category) {
      const res = await fetch(`/Menu?${category}`);

      res
        .json()
        .then(async (menus) => {
          let i = 1;

          for (let menu of menus) {
            setItems(
              items.push(
                <Typography
                  style={{
                    color: "Black",
                    fontFamily: "Nunito-Bold",
                    fontSize: 20,
                  }}
                >
                  {menu._id}
                </Typography>
              )
            );

            for (let item of menu.items) {
              let menuItems = items;
              menuItems.push(
                <MenuItem
                  i={i}
                  item={item}
                  classes={classes}
                  setPrice={setPrice}
                />
              );
              setItems([...menuItems]);
              setPrices({ ...prices, item_id: item.id });

              i++;
            }
          }
        })
        .catch((err) => console.log(err));
    }

    getMenu();
  }, []);

  return (
    <Fragment>
      {!showInvoice ? (
        <div className={classes.menuBox}>
          {items}
          <h3>{`$${totalPrice.toFixed(2)}`}</h3>
          <Button
            className={`${classes.formRows} ${classes.loginButton}`}
            variant="contained"
            onClick={makeOrder}
          >
            Make Order
          </Button>
        </div>
      ) : (
        <Invoice order={prices} totalPrice={totalPrice} />
      )}
    </Fragment>
  );
}

export default withStyles(Styles)(Menu);
