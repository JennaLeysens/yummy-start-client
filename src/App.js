import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/recipes/:id" component={RecipeDetails} />
        <Route path="/" component={Recipes} />
      </Switch>
    </div>
  );
}

export default App;
