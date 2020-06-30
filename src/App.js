import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Recipes from "./pages/Recipes";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={Recipes} />
      </Switch>
    </div>
  );
}

export default App;
