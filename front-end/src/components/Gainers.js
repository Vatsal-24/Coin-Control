import React, { Fragment } from "react";
import Grid from "@mui/material/Grid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Axios from "axios";

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false
function Gainers() {
  const [gainers, setGainers] = React.useState([]);
  Axios({
    method: "GET",
    url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res.data);
    setGainers(res.data);
  });
  return (
    <Grid container>
      Gainers
      {gainers.map((ele) => {
        return <p>{ele.name}</p>;
      })}
    </Grid>
  );
}

export default Gainers;
