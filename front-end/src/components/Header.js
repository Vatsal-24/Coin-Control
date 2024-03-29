import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate("./")}
          >
            Money Control
          </Typography>
          {window.location.pathname === "/alerts" ? (
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate("/alerts")}>
              Alerts
            </Button>
          )}
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
