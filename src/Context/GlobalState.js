import { createContext, useReducer } from "react";
import Reducer from "./AppReducer";

// variable declaration
const initialState = {
  errorMsg: "",
  weatherLocationData: undefined,
  favouriteCitys:null,
};

// created context
export const GlobalContext = createContext(initialState);

const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const appid = "958249a610394816afa63438212408";
  // weather api

  const resetError = () => {
    dispatch({
      type: "RESET_ERROR",
    });
  };

  const setError = (data) => {
    // console.log(data, "======")
    dispatch({
      type: "SET_ERROR",
      payload: data,
    });
  };

  // method to fetch forecast data through lat and longitude
  const fetchForecastData = async (data) => {
    let statusCode;
    let apiResponse;
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=" +
        appid +
        "&q=" +
        data.lat +
        " ," +
        data.long +
        "&days=10&aqi=no&alerts=no",
      requestOptions
    )
      .then((response) => {
        statusCode = response.status;
        return response.text();
      })
      .then((result) => {
        apiResponse = JSON.parse(result);
        // console.log(apiResponse, "WeatherAPI");
      })
      .catch((error) => console.log("error", error));
    if (statusCode === 200) {
      console.log(apiResponse);
      dispatch({
        type: "SET_WEATHER_LOCATION_DATA",
        payload: apiResponse,
      });
    }
  };

  // method to fetch forecast data through city name
  const fetchForecastCityData = async (city) => {
    let statusCode;
    let apiResponse;
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=" +
        appid +
        "&q=" +
        city +
        "&days=7&aqi=no&alerts=no",
      requestOptions
    )
      .then((response) => {
        statusCode = response.status;
        return response.text();
      })
      .then((result) => {
        apiResponse = JSON.parse(result);
        // console.log(apiResponse, "WeatherAPI");
      })
      .catch((error) => console.log("error", error));
    if (statusCode === 200) {
      // console.log(apiResponse);
      dispatch({
        type: "SET_WEATHER_LOCATION_DATA",
        payload: apiResponse,
      });
    }else{
      // console.log(apiResponse.error.message)
      setError(apiResponse.error.message)
    }
  };
  
  // method to set favourite list so that it can be used
  const setFavouriteList = async(data) =>{
    await dispatch({
      type:'SET_FAV_LIST',
      payload: data
    })
    // store fav list in localstorage so that it doesn't go away on page refresh.
    localStorage.setItem("favourites", JSON.stringify(data));
  }
  
  return (
    <GlobalContext.Provider
      value={{
        errorMsg: state.errorMsg,
        weatherLocationData: state.weatherLocationData,
        favouriteCitys: state.favouriteCitys,

        fetchForecastData,
        fetchForecastCityData,
        setFavouriteList,
        setError,
        resetError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalStateProvider;
