import React from "react";
import Helmet from "react-helmet";

function Invoice(props) {
  let items = [];

  for (let item in props.order) {
    items.push(
      Object.keys(props.order)[Object.keys(props.order) - 2] === item ? (
        <tr class="item">
          <td>{`${props.order[item].name} (x${props.order[item].quantity})`}</td>

          <td>{`$${props.order[item].price.toFixed(2)}`}</td>
        </tr>
      ) : (
        <tr class="item last">
          <td>{`${props.order[item].name} (x${props.order[item].quantity})`}</td>

          <td>{`$${props.order[item].price.toFixed(2)}`}</td>
        </tr>
      )
    );
  }

  // https://github.com/sparksuite/simple-html-invoice-template
  return (
    <React.Fragment>
      <Helmet>
        <title>A simple, clean, and responsive HTML invoice template</title>
        <link rel="stylesheet" href="./invoice.css" />
      </Helmet>
      <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                  <td class="title">
                    <img alt="logo" src={require("../../Assets/dineout2.png")} />
                  </td>

                  <td>
                    Invoice #: 123
                    <br />
                    Created: January 1, 2015
                    <br />
                    Due: February 1, 2015
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="information">
            <td colspan="2">
              <table>
                <tr>
                  <td>
                    Dineout, Inc.
                    <br />
                    12345 Sunny Road
                    <br />
                    Sunnyville, NSW 12345
                  </td>

                  <td>
                    Dineout Corp.
                    <br />
                    Tejbir Chopra
                    <br />
                    manager@example.com
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="heading">
            <td>Payment Method</td>

            <td>Card Number</td>
          </tr>

          <tr class="details">
            <td>Credit Card</td>

            <td>123456789</td>
          </tr>

          <tr class="heading">
            <td>Menu Item</td>

            <td>Price</td>
          </tr>

          {items}

          <tr class="total">
            <td></td>

            <td>{`$${props.totalPrice.toFixed(2)}`}</td>
          </tr>
        </table>
      </div>
    </React.Fragment>
  );
}

export default Invoice;
