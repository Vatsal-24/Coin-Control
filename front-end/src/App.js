import React, { Fragment } from "react";
import Grid from "@mui/material/Grid";
import Main from "./components/Main";
import Header from "./components/Header";
import Gainers from "./components/Gainers";
import Alert from "./components/Alerts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Axios from "axios";

//https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false
function App() {
  Axios({
    method: "GET",
    url: "http://localhost:5000/",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res.data);
  });
  return (
    <Grid container>
      <Router>
        <Fragment>
          <Header />
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/alerts" element={<Alert />} />
            <Route exact path="/gainers" element={<Gainers />} />
          </Routes>
        </Fragment>
      </Router>
    </Grid>
  );
}

export default App;

//crone jobs(schedule)
