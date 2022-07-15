import { makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalState";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "55px",
    marginLeft: "-5px",
    marginRight: "10px",
    float: "center",
    opacity:'0.8'
  },
  rounded: {
    borderRadius: "26px",
  },
  textTypography: {
    padding: "10px",
    textAlign: "center",
    postion: "static",
  },
  fav:{
      padding:'0px',
      margin:'15px',
      border:'1px solid black',
      textAlign:'center',
      borderRadius:'12px',
      opacity:'0.7'
  }
}));

const FavouriteContainer = () => {
  const classes = useStyles();
  const { favouriteCitys,fetchForecastCityData } = useContext(GlobalContext);

  return (
    <div className={classes.root}>
      <Paper
        variant="outlined"
        className={classes.rounded}
        style={{ overflow: "auto", minHeight: "700px", height: "100%" }}
      >
        <Typography variant="h5" className={classes.textTypography}>
          Your Favourites
        </Typography>
        <hr />
        {/* display favourite list and its onclick to get the city forecast */}
        {/* {console.log(favouriteCitys, "favvvvvvvvvvvvv")} */}
        {favouriteCitys === null || favouriteCitys.length <= 0 ? (
          <Typography variant="h5" style={{padding:'5px', textAlign:'center'}}>No Favourite City Added..</Typography>
        ) : (
          favouriteCitys.map((item) => {
            // console.log(item);
            return (
              <div className={classes.fav} onClick={(e)=>fetchForecastCityData(item.name)}>
                <Typography variant="h5">{item.name}</Typography>
              </div>
            );
          })
        )}
      </Paper>
    </div>
  );
};

export default FavouriteContainer;
