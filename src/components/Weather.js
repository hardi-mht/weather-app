import React, { Fragment, useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LiveData from "./LiveData";

import { GlobalContext } from "../Context/GlobalState";

import Search from "./Search";
import ToastDisplay from "./Toast/ToastDisplay";
import { Grid, Paper } from "@material-ui/core";
import FavouriteContainer from "./FavouriteContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    color: "#000000",
    padding: "2px 0px",
    display: "flex",
    width: "100%",
    height: "600px",
    // backgroundImage:`url(${Background})`
  },
  rounded: {
    borderRadius: "26px",
  },
  card: {
    margin: "auto",
    padding: "2px 4px",
    display: "flex",
    width: "300px",
    background: "transparent",
    boxShadow: "none",
    border: "1px solid black",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const Weather = (data) => {
  const classes = useStyles();
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const { fetchForecastData, setFavouriteList } = useContext(GlobalContext);

  useEffect(() => {
    const fetchData = async () => {
      // navigator geoloation to get the live lat and long
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      // set the fav list if exist
      const favoriteList = JSON.parse(localStorage.getItem('favourites'));
      if(favoriteList != null){
        setFavouriteList(favoriteList);
      }
      // api to get the current location weather  data
      fetchForecastData({ lat: lat, long: long });
    };
    // to get live location latitude and longitude
    fetchData();
  }, [lat, long]);

  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <Search />
          <LiveData />
          <ToastDisplay />
        </Grid>
        <Grid item xs={2}>
          <FavouriteContainer />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Weather;
