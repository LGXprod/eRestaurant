import React from "react";
import { Helmet } from 'react-helmet';
import LoginForm from "./components/LoginForm";

function Home() {
  return (
    <div className="Home">
      <Helmet>
      <title>eRestaurant</title>
      </Helmet>
      <LoginForm />
    </div>
  );
}

export default Home;
