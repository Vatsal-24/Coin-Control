import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { TableBody } from "@mui/material";

function Main() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // setInterval(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        setCoins(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // }, 10000);
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coins) =>
    coins.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Grid container justifyContent="center">
      <Grid item textAlign="center">
        <h1>Search a currency</h1>
        <TextField
          id="outlined-search"
          label="Search Coin"
          type="search"
          onChange={handleChange}
          value={search}
        />
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Logo</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Symbol</TableCell>
                <TableCell align="left">CMP</TableCell>
                <TableCell align="left">Volume</TableCell>
                <TableCell align="left">%change</TableCell>
                <TableCell align="left">MCAP</TableCell>
                <TableCell align="left">ATH</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCoins.map((coin) => (
                <TableRow key={coin.name}>
                  <TableCell align="center">
                    <img src={coin.image} alt="coin" width="30%" />
                  </TableCell>
                  <TableCell>
                    <p>{coin.name}</p>
                  </TableCell>
                  <TableCell>
                    <p>{coin.symbol}</p>
                  </TableCell>
                  <TableCell>
                    <p>${coin.current_price}</p>
                  </TableCell>
                  <TableCell>
                    <p>${coin.total_volume.toLocaleString()}</p>
                  </TableCell>
                  <TableCell>
                    {coin.price_change_24h < 0 ? (
                      <p>{coin.price_change_24h.toFixed(2)}%</p>
                    ) : (
                      <p>{coin.price_change_24h.toFixed(2)}%</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <p>${coin.market_cap.toLocaleString()}</p>
                  </TableCell>
                  <TableCell>
                    <p>${coin.ath}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default Main;
