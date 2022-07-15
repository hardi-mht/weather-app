import React, { Suspense, useEffect, useState } from "react";
import Header from "./components/Header";
import GlobalStateProvider from "./Context/GlobalState";
import Weather from "./components/Weather";

import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div
      style={{
        // backgroundImage: "url(./assets/weather-backgrounds/cloudy-night.jpg) ",
        // backgroundSize: "cover",
      }}
    >
      <GlobalStateProvider>
        <div>
          <Header />
        </div>
        <div>
          <Switch>
            <Route path="/" exact component={Weather}></Route>
          </Switch>
        </div>
      </GlobalStateProvider>
    </div>
  );
};
export default App;
