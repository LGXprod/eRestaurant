import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import { Helmet } from "react-helmet";
import LoginForm from "./components/LoginForm";
import RegForm from "./components/RegForm";
import Styles from "../Styles";
import HomeContext from "./HomeContext";
import queryString from "querystring";
import Cookies from "universal-cookie";

function Home() {
  const cookies = new Cookies();
  const [displaySignIn, setDisplaySignIn] = useState(true);

  function switchMethod() {
    setDisplaySignIn((displaySignIn) =>
      displaySignIn ? !displaySignIn : displaySignIn
                    ? displaySignIn : !displaySignIn
    );
  }

  async function checkLogin(username, password) {
    const response = await fetch("/Login", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: queryString.stringify({
        username: username,
        password: password,
      }),
    });

    response
      .json()
      .then((res) => {
        if (res.auth) {
          const expiryDate = new Date();
          expiryDate.setMinutes(expiryDate.getMinutes() + 60);
          console.log(expiryDate);

          cookies.set("Session id", res.session_id, {
            expires: expiryDate,
          });
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <HomeContext.Provider value={{ displaySignIn, switchMethod, checkLogin }}>
      <div className="Home">
        <Helmet>
          <title>Login to your account at DineOut</title>
        </Helmet>

        {displaySignIn ? <LoginForm /> : <RegForm />}
      </div>
    </HomeContext.Provider>
  );
}

export default withStyles(Styles)(Home);
