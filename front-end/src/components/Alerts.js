import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import { TableCell } from "@mui/material";

export default function ButtonAppBar() {
  const [alerts, setAlerts] = useState([]);
  const [alertToken, setAlertToken] = useState("");
  const [alertType, setAlertType] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleOpenModel = () => setOpen(true);
  const handleCloseModel = () => setOpen(false);

  const handleAlertToken = (event) => {
    setAlertToken(event.target.value);
  };

  const handleAlertType = (event) => {
    setAlertType(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = () => {
    // if (!alertToken) {
    //   alert("please enter token");
    //   return;
    // }
    if (!alertType) {
      alert("please enter type.");
      return;
    }

    axios
      .post("http://localhost:5000/api/v1/alerts", {
        price: price,
        asset: alertToken,
        type: alertType,
        email: "vatsaldoshi11@gmail.com",
      })
      .then((response) => {
        const newAlert = response.data["alerts"];
        setAlerts([...alerts, newAlert]);
      });

    handleCloseModel();
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/alerts")
      .then((response) => {
        console.log(response.data["data"]["alerts"], "vatsal");
        setAlerts(response.data["data"]["alerts"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const buttonStyle = {
    marginTop: "1px",
    marginRight: "2px",
    top: 0,
    right: 0,
    justifyContent: "flexEnd",
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} textAlign={"center"}>
          <Typography>My Alerts</Typography>
        </Grid>
        <Grid item xs={12} textAlign={"center"}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <b>Token</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Property</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Target Price</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableHead>
                {alerts.map((alert) => (
                  <>
                    <TableRow>
                      <TableCell align="center">{alert.asset}</TableCell>
                      <TableCell align="center">{alert.type}</TableCell>
                      <TableCell align="center">{alert.price}</TableCell>
                    </TableRow>
                  </>
                ))}
              </TableHead>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Fab color="primary" aria-label="add">
        <AddIcon onClick={handleOpenModel} style={buttonStyle} />
      </Fab>
      <Modal
        open={open}
        onClose={handleCloseModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Alert
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={alertToken}
                width={"fullWidth"}
                label="Age"
                onChange={handleAlertToken}
              >
                <MenuItem value={"BTC"}>BTC</MenuItem>
                <MenuItem value={"ETH"}>ETH</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={alertType}
                label="Age"
                onChange={handleAlertType}
              >
                <MenuItem value={"below"}>Below</MenuItem>
                <MenuItem value={"Above"}>Above</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="Price"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleSubmit}>Submit</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
