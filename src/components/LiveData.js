import {
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalState";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import "./Loader.css";

const useStyles = makeStyles({
  loader: {
    justifyContent: "center",
  },
  spinner: {
    width: "40px",
    height: "40px",
    position: "relative",
    margin: "20px auto 10px auto",
  },
  root: {
    paddingTop: "15px",
    marginLeft: "30px",
    marginRight: "30px",
    float: "center",
    fontFamily: "sans-serif",
  },
  rounded: {
    borderRadius: "18px",
  },
  image: {
    width: "150%",
    height: "110%",
  },
  cimage: {
    width: "10px",
    height: "86px",
  },
  fav: {
    cursor: "pointer",
    float: "right",
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  sliderlist: {
    boxSizing: " border-box",
    cursor: " pointer",
    display: " block",
    height: " 263px",
    margin: " 0px",
    padding: " 0px",
    position: " relative",
    touchAction: " pan-y pinch-zoom",
    transform: " translate3d(0px, 0px, 0px)",
    width: " auto",
    transition: " all 0s ease 0s",
    textAlign: " center",
  },
  heading3: {
    margin: "0px",
  },
});

const LiveData = () => {
  const classes = useStyles();
  const { weatherLocationData, setFavouriteList, favouriteCitys } =
    useContext(GlobalContext);

  // state to define which day is selected and change hourly data accordingly
  const [selectDay, setSelectDay] = useState(0);

  //   method to show which favourite symbol as per favourite list
  const isBookmarked = () => {
    if (favouriteCitys) {
      const matched = favouriteCitys.filter(
        (favorite) => favorite.name === weatherLocationData.location.name
      );
      return matched.length > 0;
    }
    return false;
  };

  var today = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  var date =
    months[today.getMonth()] +
    " " +
    today.getDate() +
    "," +
    today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes();
  var day = weeks[today.getDay()];

  const getTime = (date) => {
    var d = new Date(date);
    var hour = d.getHours();
    return hour + ":00";
  };

  //    get Day from the api to diplay wweekly data
  const getDay = (date) => {
    var d = new Date(date);
    return weeks[d.getDay()];
  };

  //   on click of favourite button to remove and add favourite
  const favouritehandler = (e) => {
    // console.log(e.target.id);
    if (e.target.id === "addfav") {
      if (favouriteCitys === null) {
        const fav = [
          {
            name: weatherLocationData.location.name,
          },
        ];
        setFavouriteList(fav);
      } else {
        favouriteCitys.push({
          name: weatherLocationData.location.name,
        });
        // console.log(favouriteCitys);
        setFavouriteList(favouriteCitys);
      }
    } else {
      favouriteCitys.pop({
        name: weatherLocationData.location.name,
      });
      //   console.log(favouriteCitys);
      setFavouriteList(favouriteCitys);
    }
  };

  //   console.log(weatherLocationData);

  return weatherLocationData ? (
    <div className={classes.root}>
      <Paper
        variant="outlined"
        style={{
          minHeight: "600px",
          padding: "10px",
          color: "ghostwhite",
          backgroundImage: "url(./assets/weather-backgrounds/dawn.jpg) ",
          backgroundSize: "cover",
        }}
      >
        {/* divison to print the location name and current date and time */}
        <div>
          <Typography variant="h4">
            {weatherLocationData.location.name},{" "}
            {weatherLocationData.location.country}
            <div
              className={classes.fav}
              title={
                isBookmarked()
                  ? "Remove this city from favorites"
                  : "Favorite this city"
              }
            >
              {isBookmarked() ? (
                <IconButton
                  id="removefav"
                  className={classes.iconButton}
                  aria-label="search"
                  onClick={favouritehandler}
                >
                  <FavoriteIcon id="removefav" />
                </IconButton>
              ) : (
                <IconButton
                  id="addfav"
                  className={classes.iconButton}
                  aria-label="search"
                  onClick={favouritehandler}
                >
                  <FavoriteBorderIcon id="addfav" />
                </IconButton>
              )}
            </div>
          </Typography>
          <Typography variant="h5">
            {day}, {date} | {time}
          </Typography>
        </div>
        {/* division to get current temparture of the location */}
        <div>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Grid container spacing={3}>
                <Grid item xs={2}>
                  <img
                    src="./assets/weather/weather.svg"
                    className={classes.image}
                    alt="icon"
                    title="Humid and Overcast"
                  />
                </Grid>
                <Grid item xs={4}>
                  <h1 style={{ padding: "35px" }}>
                    {weatherLocationData.current.temp_c}
                    <sup class="symbol">°C</sup>
                  </h1>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <h3>Humidity : {weatherLocationData.current.humidity} %</h3>
              <h3>
                Wind: {weatherLocationData.current.wind_kph} kmph{" "}
                <CallReceivedIcon />
              </h3>
              <h3>
                Feels Like: {weatherLocationData.current.feelslike_c}
                <sup class="symbol">°</sup>
              </h3>
            </Grid>
          </Grid>
        </div>
        {/* to display the hourly fourecast */}
        <div
          className="uk-position-relative uk-visible-toggle uk-light"
          tabindex="-1"
          uk-slider
          style={{
            width: "100%",
            overflowX: "scroll",
            overflowY: "hidden    ",
          }}
        >
          <ul
            className="uk-slider-items uk-child-width-1-2@s uk-child-width-1-3@m uk-grid"
            style={{ display: "inline-block", padding: "5px" }}
          >
            <li
              style={{ display: "flex", padding: "5px", textAlign: "center" }}
            >
              {
              weatherLocationData.forecast.forecastday.length > 0  ? 
              
              weatherLocationData.forecast.forecastday[selectDay].hour.map(
                (item, index) => {
                  if (selectDay === 0) {
                    // console.log(time, "item");
                    var todaytime = getTime(item.time);
                    // console.log(todaytime);
                    var t = parseInt(todaytime) >= parseInt(time);
                    var c = parseInt(todaytime) === parseInt(time);
                    // console.log(t);
                    if (!t) {
                      // console.log("in")
                      return <></>;
                    } else {
                      //   console.log(weatherLocationData.current.condition.icon);
                      var url = "https:" + item.condition.icon;
                      return (
                        <div
                          className="uk-panel"
                          style={
                            c
                              ? {
                                  padding: "0px",
                                  margin: "10px",
                                  border: "1px solid black",
                                  width: "150px",
                                  backgroundColor: "black",
                                  opacity: "0.7",
                                }
                              : {
                                  padding: "0px",
                                  margin: "10px",
                                  border: "1px solid black",
                                  width: "150px",
                                }
                          }
                        >
                          <img
                            src={url}
                            className={classes.cimage}
                            style={{
                              width: "50px",
                              height: "56px",
                              margin: "auto",
                            }}
                            alt="icon"
                            title="Humid and Overcast"
                          />
                          <h2 className={classes.heading3}>
                            {item.temp_c}
                            <sup class="symbol">°</sup>
                          </h2>
                          <h3 className={classes.heading3}>
                            {item.feelslike_c}
                            <sup class="symbol">°</sup>
                          </h3>
                          <h2> {getTime(item.time)}</h2>
                        </div>
                      );
                    }
                  } else {
                    // console.log(1);
                    // console.log(weatherLocationData.current.condition.icon);
                    var url = "https:" + item.condition.icon;
                    return (
                      <div
                        className="uk-panel"
                        style={{
                          padding: "0px",
                          margin: "10px",
                          border: "1px solid black",
                          width: "150px",
                        }}
                      >
                        <img
                          src={url}
                          className={classes.cimage}
                          style={{
                            width: "50px",
                            height: "56px",
                            margin: "auto",
                          }}
                          alt="icon"
                          title="Humid and Overcast"
                        />
                        <h2 className={classes.heading3}>
                          {item.temp_c}
                          <sup class="symbol">°</sup>
                        </h2>
                        <h3 className={classes.heading3}>
                          {item.feelslike_c}
                          <sup class="symbol">°</sup>
                        </h3>
                        <h2> {getTime(item.time)}</h2>
                      </div>
                    );
                  }
                }
              ) 
              : <h1> No data Available for forecast</h1>
              }
            </li>
          </ul>
        </div>
        {/* to diplay the weekly overview and its onclick change the hourly forecast */}
        <div
          className="uk-position-relative uk-visible-toggle uk-light"
          tabindex="-1"
          uk-slider
        >
          <ul
            className="uk-slider-items uk-child-width-1-2@s uk-child-width-1-3@m uk-grid"
            style={{ display: "inline-block", padding: "5px" }}
          >
            <li
              style={{ display: "flex", padding: "5px", textAlign: "center" }}
            >
              {weatherLocationData.forecast.forecastday.map((item, index) => {
                if (item !== undefined) {
                  var url = "https:" + item.day.condition.icon;
                  return (
                    <div
                      className="uk-panel"
                      style={
                        index === selectDay
                          ? {
                              padding: "0px",
                              margin: "10px",
                              border: "1px solid black",
                              width: "150px",
                              backgroundColor: "black",
                              opacity: "0.7",
                            }
                          : {
                              padding: "0px",
                              margin: "10px",
                              border: "1px solid black",
                              width: "150px",
                            }
                      }
                      onSelect={{ color: "blue" }}
                      onClick={() => setSelectDay(index)}
                    >
                      <h2>{getDay(item.date)}</h2>
                      <img
                        src={url}
                        className={classes.cimage}
                        style={{
                          width: "50px",
                          height: "56px",
                          margin: "auto",
                        }}
                        alt="icon"
                        title="Humid and Overcast"
                      />
                      <h2 className={classes.heading3}>
                        {item.day.mintemp_c}
                        <sup class="symbol">°</sup>
                      </h2>
                      <h3 className={classes.heading3}>
                        {item.day.maxtemp_c}
                        <sup class="symbol">°</sup>
                      </h3>

                      <p
                        style={{
                          display: "block ruby",
                          padding: "0px",
                          margin: "0px",
                        }}
                      >
                        <img
                          src=" ./assets/amcharts-weather-icons/animated/day.svg"
                          className={classes.cimage}
                          style={{
                            width: "35px",
                            height: "36px",
                            margin: "auto",
                          }}
                          alt="icon"
                          title="Humid and Overcast"
                        />
                        {item.astro.sunrise}
                      </p>
                      <p
                        style={{
                          display: "block ruby",
                          padding: "0px",
                          margin: "0px",
                        }}
                      >
                        <img
                          src=" ./assets/amcharts-weather-icons/animated/night.svg"
                          className={classes.cimage}
                          style={{
                            width: "30px",
                            height: "36px",
                            margin: "auto",
                          }}
                          alt="icon"
                          title="Humid and Overcast"
                        />
                        {item.astro.sunset}
                      </p>
                    </div>
                  );
                } else {
                  return <></>;
                }
              })}
            </li>
          </ul>
        </div>
      </Paper>
    </div>
  ) : (
    //   loader if the data is not being set
    <div className="flex flex-col w-full justify-center items-center">
      {/* bounce spinner */}
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      <div
        className={"mx-auto text-center justify-center text-sm font-light"}
        style={{ textAlign: "center" }}
      >
        <Typography variant="h3" className="text-2xl text-fade">
          Please Wait..Fetching your live location
        </Typography>
      </div>
    </div>
  );
};

export default LiveData;
