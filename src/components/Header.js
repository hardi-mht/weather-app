import React from "react";
import logo from "../images/weather.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  toolbar: {
    textAlign: "center",
    height: 100,
    backgroundColor: "#b2a8a8",
    opacity:'0.9'
  },
  heading: {
    margin: "auto",
    color: "#000000",
  },
});

const Header = () => {
  const classes = useStyles();
  
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <img src={logo} width="150" height="150" alt="logo" align="center" />
        <Typography className={classes.heading} variant="h4" align="center">
          Weather App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
