import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { wrapper } from "../redux/store";
import Navbar from "../components/Navbar/Navbar";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(MyApp);
