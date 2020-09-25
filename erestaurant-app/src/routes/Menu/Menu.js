import React, { Fragment, useState } from "react";
import { Button } from "@material-ui/core";
import queryString from "querystring";

function Menu() {
  const [itemImg, setItemImg] = useState(null);

  function uploadImg(e) {
    setItemImg(e.target.files[0]);
  }

  async function submitNewItem(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("itemImg", itemImg);

    const sendImg = await fetch("/Menu/Item", {
      method: "POST",
      // headers: {
      //   "content-type": "multipart/form-data",
      // },
      body: queryString.stringify(formData),
    });

    console.log(sendImg);
  }

  return (
    <Fragment>
      <h1>Work</h1>

      <Button variant="contained" component="label">
        Upload File
        <input
          type="file"
          style={{ display: "none" }}
          onChange={(e) => uploadImg(e)}
        />
      </Button>

      <Button onClick={(e) => submitNewItem(e)}>Submit</Button>
    </Fragment>
  );
}

export default Menu;
