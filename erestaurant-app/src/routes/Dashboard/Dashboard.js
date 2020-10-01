import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import HomePage from "./components/HomePage";
import BookingPage from "./components/BookingPage";
import UserAccount from "./components/UserAccount";
import DashboardContext from "./DashboardContext";
import Cookies from "universal-cookie";

function Dashboard() {
  const cookies = new Cookies();

  async function getUserInfo() {
    const res = await fetch(
      `/User?session_id=${encodeURIComponent(cookies.get("Session id"))}`,
      {
        method: "GET",
      }
    );

    res
      .json()
      .then((userInfo) => {
        console.log(userInfo);
      })
      .catch((err) => console.log(err));
  }

  return (
    <DashboardContext.Provider value={{ getUserInfo }}>
      <BrowserRouter>
        <div className="Dashboard">
          <Helmet>
            <title>Dineout | Order food and book a table</title>
          </Helmet>
          <Route exact path="/Dashboard" component={HomePage} />
          <Route path="/BookingPage" component={BookingPage} />
          <Route path="/UserAccount" component={UserAccount} />
        </div>
      </BrowserRouter>
    </DashboardContext.Provider>
  );
}

export default Dashboard;
