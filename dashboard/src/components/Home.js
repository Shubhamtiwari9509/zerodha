import React, { useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
 
  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;