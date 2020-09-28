import React, { Fragment, useState, useEffect } from "react";

function Menu() {
  let [items, setItems] = useState([]);

  useEffect(() => {
    async function getMenu(category) {
      const res = await fetch(`/Menu?${category}`);
  
      res
        .json()
        .then((menus) => {
          // let menuItems = [];
          let i = 1;
          for (let menu of menus) {
            for (let item of menu.items) {
              let menuItems = items;
              menuItems.push(
                <div key={i}>
                  <img alt="Menu item" />
                  <h5>{item.name}</h5>
                </div>
              );
              setItems([...menuItems]);
              console.log(items);
              i++;
            }
          }
          // setItems(menuItems)
        })
        .catch((err) => console.log(err));
    }

    getMenu();
  }, []);

  return (
    <Fragment>
      <h1>Working</h1>
      <div>
        {items}
      </div>
    </Fragment>
  );
}

export default Menu;
