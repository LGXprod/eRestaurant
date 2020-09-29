import React, { Fragment, useState, useEffect } from "react";

function Menu() {
  let [items, setItems] = useState([]);

  useEffect(() => {
    async function getMenu(category) {
      const res = await fetch(`/Menu?${category}`);

      res
        .json()
        .then(async (menus) => {
          let i = 1;
          for (let menu of menus) {
            for (let item of menu.items) {
              let menuItems = items;
              menuItems.push(
                <div key={i}>
                  <img
                    alt="Menu item"
                    src={`data:image/png;base64, ${item.img}`}
                  />
                  <h5>{item.name}</h5>
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
      <h1>Working</h1>
      <div>{items}</div>
    </Fragment>
  );
}

export default Menu;
