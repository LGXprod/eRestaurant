import React from "react";
import { Helmet } from 'react-helmet';
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";


function Home() {
  return (
    <div className="Home">
      <Helmet>
      <title>Login to your account at DineOut</title>
      </Helmet>
      <Header/>
      <LoginForm />
    </div>
  );
}

export default Home;
