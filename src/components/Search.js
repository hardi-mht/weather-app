import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { GlobalContext } from "../Context/GlobalState";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "15px",
    marginLeft: "50px",
    marginRight: "50px",
    float: "center",
    opacity:'0.6'
  },
  rounded: {
    borderRadius: "26px",
  },
  input: {
    marginLeft: "20px",
    width:'90%'
  },
  iconButton: {
    padding: "4px",
    float: "right",
  },
}));


const Search = () => {
  const classes = useStyles();
  const [city, setCity] = useState();
  const {fetchForecastCityData} = useContext(GlobalContext)
  
  // method to handle search
  const handleSearch = ()=>{
    // method call to get the forecast based on city.
    fetchForecastCityData(city);
    setCity('')
  }
// method to handle change event on search input
  const handleChange = (e)=>{
    setCity(e.target.value);
  }

  return (
    <div className={classes.root}>
      <Paper variant="outlined" className={classes.rounded} >
        <InputBase
          value={city}
          className={classes.input}
          placeholder="Search City"
          inputProps={{ "aria-label": "search city" }}
          onChange={handleChange}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default Search;
